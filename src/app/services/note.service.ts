import { Injectable } from '@angular/core';
import { NoteModel } from '../models/note.model';
import { storageService } from './async-storage.service';
import { BehaviorSubject, Observable, catchError, from, retry, tap, throwError } from 'rxjs';
import { UtilService } from './util.service';
import { NoteFilterModal } from '../models/noteFIlter.modal';

const NOTE_DB = 'note'
export const TODO = 'todo'
export const TXT = 'txt'
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() {
    let notes = JSON.parse(localStorage.getItem(NOTE_DB) || 'null')
    if (!notes || notes.length <= 0) {
      notes = this.#createNots()
      localStorage.setItem(NOTE_DB, JSON.stringify(notes))
    }
  }

  #_notes$ = new BehaviorSubject<NoteModel[]>([])
  public notes$ = this.#_notes$.asObservable()

  #_filterBy$ = new BehaviorSubject<NoteFilterModal>({ mode: 'note' });
  public filterBy$ = this.#_filterBy$.asObservable()

  query() {
    return from(storageService.query<NoteModel>(NOTE_DB))
      .pipe(
        tap(notes => {
          const _notes = this.#filterItems(notes)
          this.#_notes$.next(_notes)
        }),
        retry(1),
        catchError(this.#handleError)
      )
  }

  get(noteID: string): Promise<NoteModel> {
    return storageService.get<NoteModel>(NOTE_DB, noteID)
  }

  save(note: Partial<NoteModel> | NoteModel): Observable<NoteModel> {
    return note._id ? this.#edit(note as NoteModel) : this.#add(note)
  }

  remove(noteId: string) {
    return from(storageService.remove(NOTE_DB, noteId))
      .pipe(
        tap(() => {
          const notes = this.#_notes$.value
          const idx = notes.findIndex(note => note._id === noteId)
          notes.splice(idx, 1)
          this.#_notes$.next([...notes])
          return noteId
        }),
        retry(1),
        catchError(this.#handleError))
  }

  setFilter(filterBy: NoteFilterModal) {
    this.#_filterBy$.next(filterBy)
    this.query().subscribe()
  }

  getEmptyNote(): Partial<NoteModel> {
    return {
      createdAt: Date.now(),
      bgc: '#ffffff',
      txt: '',
      imgs: [],
      labels: [],
      isPinned: false,
      mode: "note"

    }
  }

  #add(note: Partial<NoteModel>): Observable<NoteModel> {
    return from(storageService.post(NOTE_DB, note as NoteModel))
      .pipe(
        tap((newNote: NoteModel) => {
          let _notes = [...this.#_notes$.value, newNote]
          const _fIlterNotes = this.#filterItems(_notes)
          this.#_notes$.next(_fIlterNotes)
        }),
        retry(1),
        catchError(this.#handleError))
  }

  #edit(note: NoteModel): Observable<NoteModel> {
    return from(storageService.put(NOTE_DB, note))
      .pipe(
        tap(updateNote => {
          let _notes = this.#_notes$.value
          const idx = _notes.findIndex(_note => _note._id === updateNote._id)
          _notes.splice(idx, 1, updateNote)
          const _fIlterNotes = this.#filterItems(_notes)
          this.#_notes$.next(_fIlterNotes)
          return updateNote
        }),
        retry(1),
        catchError(this.#handleError)
      )
  }

  #handleError(err: any) {
    console.log('err:', err)
    return throwError(() => err)
  }

  #createNots(): NoteModel[] {
    let demoNotes: NoteModel[] = Array.from({ length: 9 }, () =>
    ({
      _id: UtilService.makeId(), txt: UtilService.makeLorem(),
      createdAt: Date.now(), type: TXT, bgc: UtilService.getAllowedColor(),
      imgs: [], labels: [], isPinned: false, mode: 'note'
    }))
    return demoNotes
  }

  #sortNotes(notes: NoteModel[]): NoteModel[] {
    notes.sort((a, b) => {
      return (b.isPinned === a.isPinned) ? 0 : b.isPinned ? 1 : -1;
    })
    return notes
  }

  #filterItems(items: NoteModel[]): NoteModel[] {
    const filterBy = this.#_filterBy$.value
    return items.filter((note) => note.mode === filterBy.mode)
  }
}
