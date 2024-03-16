import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NoteModel } from '../../../models/note.model';
import { NoteService } from '../../../services/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, take, takeUntil, tap } from 'rxjs';
import { NoteEditText } from '../note-edit-text/note-edit-text.component';
import { Buttons } from '../../buttons/buttons.component';
import { ImageUploadService } from '../../../services/image-upload.service';

@Component({
  selector: 'note-edit-manager',
  templateUrl: './note-edit-manager.component.html',
  styleUrl: './note-edit-manager.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class NoteEditManager implements OnInit, OnChanges {

  private router = inject(Router)
  private route = inject(ActivatedRoute)

  elRef = inject(ElementRef)
  noteService = inject(NoteService)
  imgUploadService = inject(ImageUploadService)
  cdr = inject(ChangeDetectorRef)

  // @Input() propsNote: NoteModel | null = null
  @Input() note!: Partial<NoteModel> | NoteModel
  @ViewChild('noteEditContainer', { read: ViewContainerRef }) noteEditContainerRef!: ViewContainerRef
  @ViewChild('btns') noteBtns!: Buttons

  isModal = false
  destroySubject$ = new Subject()
  // note!: Partial<NoteModel>
  mode: 'edit' | 'new' | 'preview' = 'preview'

  ngOnInit(): void {
    console.log(this.note)
    this.route.data
      .pipe(map(data =>
        data['note']))
      .subscribe(note => {
        console.log("note:", note)
        if (note) {
          this.note = this.noteService.getEmptyNote()
          this.mode = 'new'
          if (note._id) {
            this.note = note
            this.isModal = true
            this.mode = 'edit'
          }
        }
      })


  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.mode)
    // this.note = { ...changes['propsNote'].currentValue }
    console.log(" this.note:", this.note)

  }

  // ngDoCheck(): void {

  // }

  ngAfterViewInit(): void {
    console.log('a')
    this.loadComponent()
    this.cdr.detectChanges()
  }

  loadComponent() {
    this.noteEditContainerRef.clear()
    const componentRef = this.noteEditContainerRef.createComponent(NoteEditText)
    componentRef.instance.saveEvent.subscribe((note: NoteModel) => {
      this.saveNote(note)
    })
    componentRef.instance.note = this.note as NoteModel
  }

  setPinned(ev: Event) {
    ev.stopPropagation()
    if (!this.note) return
    this.note.isPinned = !this.note.isPinned
    this.saveNote(this.note)
    this.cdr.detectChanges()
  }

  setColor(color: string) {
    if (!this.note) return

    this.note.bgc = color
    this.saveNote(this.note)
    this.cdr.markForCheck()
  }

  saveNote(note: NoteModel | Partial<NoteModel>) {
    this.noteService.save(note)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: (() => this.cdr.markForCheck()),
        error: err => console.log('err', err)
      })
  }

  uploadImg(ev: Event) {
    if (!this.note) return
    const target = ev.target as HTMLInputElement
    if (target.files && target.files[0]) {
      const file = target.files[0]
      this.imgUploadService.uploadImg(file)
        .subscribe(link => {
          console.log("link:", link)
          this.note?.imgs?.push(link)
          this.saveNote(this.note as Partial<NoteModel>)
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


  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }


}
