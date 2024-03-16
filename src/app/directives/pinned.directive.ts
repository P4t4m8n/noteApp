import { Directive, HostListener, Input, OnDestroy, inject, input } from '@angular/core';
import { NoteModel } from '../models/note.model';
import { NoteService } from '../services/note.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[pinned]'
})
export class PinnedDirective implements OnDestroy {

  @Input() note!: NoteModel
  noteService = inject(NoteService)
  destroySubject$ = new Subject()

  constructor() { }

  @HostListener('click', ['$event'])
  toggle() {
    if (!this.note) return
    this.note.isPinned = !this.note.isPinned
    this.#saveNote()
  }


  #saveNote() {
    this.noteService.save(this.note)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({

        error: err => console.log('err', err)
      })
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }

}
