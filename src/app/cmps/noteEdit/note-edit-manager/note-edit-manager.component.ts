import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NoteModel, TextNoteModel } from '../../../models/note.model';
import { NoteService, TXT } from '../../../services/note.service';
import { NoteText } from '../../notePreview/note-text/note-text.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { NoteEditText } from '../note-edit-text/note-edit-text.component';
import { Buttons } from '../../buttons/buttons.component';

@Component({
  // standalone:true,
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

  @ViewChild('noteEditContainer', { read: ViewContainerRef }) noteEditContainerRef!: ViewContainerRef
  @ViewChild('btns') noteBtns!: Buttons

  isInitialized = false
  isModal = false
  destroySubject$ = new Subject()
  note: Partial<TextNoteModel> = this.noteService.getEmptyNote()
  type: string = TXT

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => {
        return data['note']
      }))
      .subscribe(note => {
        console.log("note:", note)
        if (note) {
          this.note = note
          this.isModal = true
        }
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
    const componentRef = this.noteEditContainerRef.createComponent(NoteEditText)
    componentRef.instance.note = this.note as TextNoteModel
    componentRef.instance.note = this.note as TextNoteModel
    componentRef.instance.saveEvent.subscribe((note: TextNoteModel) => {
      this.saveNote(note)

    })

  }

  setColor(color: string) {
    console.log("color:", color)
    this.note.bgc = color
    this.saveNote(this.note)
    this.cdr.detectChanges()
  }

  saveNote(note: NoteModel | Partial<NoteModel>) {
    this.noteService.save(note)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({ error: err => console.log('err', err) })
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
