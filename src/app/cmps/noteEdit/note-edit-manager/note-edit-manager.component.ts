import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NoteModel } from '../../../models/note.model';
import { NoteService, TXT } from '../../../services/note.service';
import { NoteText } from '../../notePreview/note-text/note-text.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, map, take, takeUntil, tap } from 'rxjs';
import { NoteEditText } from '../note-edit-text/note-edit-text.component';
import { Buttons } from '../../buttons/buttons.component';

@Component({
  selector: 'note-edit-manager',
  templateUrl: './note-edit-manager.component.html',
  styleUrl: './note-edit-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NoteEditManager implements OnInit {

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  elRef = inject(ElementRef)
  noteService = inject(NoteService)
  cdr = inject(ChangeDetectorRef)
  @Input() propsNote!: NoteModel

  @ViewChild('noteEditContainer', { read: ViewContainerRef }) noteEditContainerRef!: ViewContainerRef
  @ViewChild('btns') noteBtns!: Buttons

  isInitialized = false
  isModal = false
  destroySubject$ = new Subject()
  note: Partial<NoteModel> = this.noteService.getEmptyNote()
  mode: 'edit' | 'new' | 'preview' = 'preview'

  ngOnInit(): void {
    this.route.data
      .pipe(map(data =>
        data['note']))
      .subscribe(note => {
        if (note) {
          this.note = note
          this.mode = 'new'
          if (note._id) {
            this.isModal = true
            this.mode = 'edit'
          }
        }
        else this.note = this.propsNote
      })

    setTimeout(() => {
      this.isInitialized = true;
    }, 0)
  }

  ngAfterViewInit(): void {
    this.loadComponent()
    this.cdr.detectChanges()
    this.noteBtns.isHovered = true
  }

  loadComponent() {
    this.noteEditContainerRef.clear()
    let componentRef
    if (this.mode == 'preview') componentRef = this.noteEditContainerRef.createComponent(NoteText)
    else {
      componentRef = this.noteEditContainerRef.createComponent(NoteEditText)
      componentRef.instance.saveEvent.subscribe((note: NoteModel) => {
        this.saveNote(note)
      })

    }
    componentRef.instance.note = this.note as NoteModel

  }

  toggleBtns(isHovered: boolean) {
    this.noteBtns.isHovered = isHovered
  }

  setPinned() {
    this.note.isPinned = !this.note.isPinned
    this.saveNote(this.note)
  }

  setColor(color: string) {
    this.note.bgc = color
    this.saveNote(this.note)
    this.cdr.detectChanges()
  }

  saveNote(note: NoteModel | Partial<NoteModel>) {
    this.noteService.save(note)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({ error: err => console.log('err', err) })
  }

  onRemoveNote(noteId: string | undefined) {
    if (!noteId) return
    this.noteService.remove(noteId)
      .pipe(
        tap(() => {
          this.onBack()
        }),
        take(1)
      )
      .subscribe({
        next: noteId => console.log('removed', noteId),

        error: err => console.log('err:', err)
      })
  }

  onBack = () => {
    this.router.navigateByUrl('/note')
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement

    const viewContainerRef = this.noteEditContainerRef
    const clickedInsideEdit = this.elRef.nativeElement.contains(target)
    const clickedInsideButtons = this.noteBtns['elRef'].nativeElement.contains(target)

    if (!this.isInitialized || !this.isModal || clickedInsideButtons || clickedInsideEdit) return

    // for (let i = 0; i < viewContainerRef.length; i++) {
    //   const viewRef = viewContainerRef.get(i)
    //   console.log("viewContainerRef:", viewContainerRef)
    //   console.log("viewRef:", viewRef)
    //   if (viewRef) {
    //     // const componentRef = viewRef['_view'].component
    //     // if (componentRef && componentRef.location.nativeElement.contains(target)) {
    //     //   return
    //     // }
    //     // if (!this.isInitialized || !this.isModal || clickedInsideButtons || viewContainerRef) return
    //   }

    // }
    this.onBack()
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }


}
