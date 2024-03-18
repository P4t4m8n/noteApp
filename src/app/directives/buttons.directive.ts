import { ChangeDetectorRef, Directive, HostListener, Input, OnDestroy, OnInit, inject } from '@angular/core'
import { NoteModel } from '../models/note.model'
import { NoteService } from '../services/note.service'
import { Subject, take, takeUntil, tap } from 'rxjs'
import { ImageUploadService } from '../services/image-upload.service'
import { Router } from '@angular/router'

@Directive({
  selector: '[note-buttons]'
})
export class NoteButtonsDirective implements OnInit, OnDestroy {

  @Input() noteBtnActions: '' | 'remove' | 'test' = ''

  destroySubject$ = new Subject()

  noteService = inject(NoteService)
  imageUploadService = inject(ImageUploadService)
  router = inject(Router)
  cdr = inject(ChangeDetectorRef)


  colors: string[] = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
    '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

  @Input() note!: NoteModel | Partial<NoteModel>

  ngOnInit(): void {
    console.log(this.note)
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    let target = event.target as HTMLElement

    // Going up the DOM to find the dataset stop at host lvl
    while (target && target !== event.currentTarget && !target.dataset['action']) {
      target = target.parentElement as HTMLElement
    }

    if (target && target.dataset['action']) {
      console.log("Action:", target.dataset['action'])//remove in prod

      switch (target.dataset['action']) {
        case 'remove':
          this.#remove()
          break
        case 'close':
          this.#onBack()
          break
        case 'test':
          this.#test()
          break
        default:
          console.log('Action not recognized.')//remove in prod
      }
    } else {
      console.log('Clicked element does not have a data-action attribute.')//remove in prod
    }
  }

  #test(): void {
    console.log(this.note)
  }

  #remove() {
    if (!this.note || !this.note._id) return
    this.noteService.remove(this.note._id)
      .pipe(
        tap(() => {
          this.#onBack()
        }),
        take(1)
      )
      .subscribe({
        next: noteId => console.log('removed', noteId),

        error: err => console.log('err:', err)
      })
  }

  #selectColor(color: string): void {
    this.note.bgc = color
    this.#saveNote(this.note)
  }

  #saveNote(note: NoteModel | Partial<NoteModel>) {
    this.noteService.save(note)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: (() => this.#onBack),
        error: err => console.log('err', err)
      })
  }

  @HostListener('change', ['$event.target.files'])
  uploadImg(files: FileList) {
    if (!this.note || files.length === 0) return
    const file = files[0]
    this.imageUploadService.uploadImg(file)
      .subscribe(link => {
        this.note?.imgs?.push(link)
        this.#saveNote(this.note as Partial<NoteModel>)
      })
  }

  #onBack = () => {
    this.router.navigateByUrl('/note')
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }
}
