import { Injectable } from '@angular/core';
import { NoteModel } from '../models/note.model';
import { storageService } from './async-storage.service';
import { BehaviorSubject, Observable, catchError, from, map, retry, tap, throwError } from 'rxjs';
import { UtilService } from './util.service';

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

  query() {
    return from(storageService.query<NoteModel>(NOTE_DB))
      .pipe(
        tap(sortedNotes => this.#_notes$.next(sortedNotes)),
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

  getEmptyNote(): Partial<NoteModel> {
    return {
      createdAt: Date.now(),
      bgc: 'ffffff',
      txt: '',
      imgs: [],
      labels: [],
      isPinned: false

    }
  }

  #add(note: Partial<NoteModel>): Observable<NoteModel> {
    return from(storageService.post(NOTE_DB, note as NoteModel))
      .pipe(
        tap((newNote: NoteModel) => {
          let notes = [...this.#_notes$.value, newNote]
          this.#_notes$.next(notes)
        }),
        retry(1),
        catchError(this.#handleError))
  }

  #edit(note: NoteModel): Observable<NoteModel> {
    return from(storageService.put(NOTE_DB, note))
      .pipe(
        tap(updateNote => {
          let notes = this.#_notes$.value
          const idx = notes.findIndex(_note => _note._id === updateNote._id)
          notes.splice(idx, 1, updateNote)

          this.#_notes$.next(notes)
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
      imgs: [], labels: [], isPinned: false
    }))
    return demoNotes
  }
  #sortNotes(notes: NoteModel[]): NoteModel[] {
    notes.sort((a, b) => {
      return (b.isPinned === a.isPinned) ? 0 : b.isPinned ? 1 : -1;
    })
    return notes}
    


}
