import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NoteModel } from '../../../models/note.model';
import { NoteService } from '../../../services/note.service';
import { NoteText } from '../note-text/note-text.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, take, takeUntil, tap } from 'rxjs';
import { NoteEditText } from '../note-edit-text/note-edit-text.component';
import { Buttons } from '../../buttons/buttons.component';
import { ImageUploadService } from '../../../services/image-upload.service';

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
  imgUploadService = inject(ImageUploadService)
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
    this.noteBtns.isHovered = true
    this.cdr.detectChanges()
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

  setPinned(ev: Event) {
    ev.stopPropagation()
    this.note.isPinned = !this.note.isPinned
    this.saveNote(this.note)
    this.cdr.detectChanges()
  }

  setColor(color: string) {
    this.note.bgc = color
    this.saveNote(this.note)
    this.cdr.markForCheck()
  }

  saveNote(note: NoteModel | Partial<NoteModel>) {
    this.noteService.save(note)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({ error: err => console.log('err', err) })
  }

  uploadImg(ev: Event) {
    const target = ev.target as HTMLInputElement
    if (target.files && target.files[0]) {
      const file = target.files[0]
      this.imgUploadService.uploadImg(file)
        .subscribe(link => {
          console.log("link:", link)
          this.note.imgs?.push(link)
          this.saveNote(this.note)
          this.cdr.markForCheck()

        })
    }

  }

  remove(noteId: string | undefined) {
    if (!noteId) return
    this.noteService.remove(noteId)
      .pipe(
        tap(() => {
          // this.onBack()
        }),
        take(1)
      )
      .subscribe({
        next: noteId => console.log('removed', noteId),

        error: err => console.log('err:', err)
      })
  }

  onBack = () => {
    console.log('back')
    this.cdr.markForCheck()
    this.router.navigateByUrl('/note')
  }

  // @HostListener('document:click', ['$event'])
  // handleDocumentClick(event: MouseEvent) {
  //   const target = event.target as HTMLElement

  //   const viewContainerRef = this.noteEditContainerRef
  //   const clickedInsideEdit = this.elRef.nativeElement.contains(target)
  //   const clickedInsideButtons = this.noteBtns['elRef'].nativeElement.contains(target)

  //   if (!this.isInitialized || !this.isModal || clickedInsideButtons || clickedInsideEdit) return

  //   // for (let i = 0; i < viewContainerRef.length; i++) {
  //   //   const viewRef = viewContainerRef.get(i)
  //   //   console.log("viewContainerRef:", viewContainerRef)
  //   //   console.log("viewRef:", viewRef)
  //   //   if (viewRef) {
  //   //     // const componentRef = viewRef['_view'].component
  //   //     // if (componentRef && componentRef.location.nativeElement.contains(target)) {
  //   //     //   return
  //   //     // }
  //   //     // if (!this.isInitialized || !this.isModal || clickedInsideButtons || viewContainerRef) return
  //   //   }

  //   // }
  //   this.onBack()
  // }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }


}
