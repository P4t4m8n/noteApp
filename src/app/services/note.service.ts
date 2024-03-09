import { Injectable } from '@angular/core';
import { NoteModel, TextNoteModel } from '../models/note.model';
import { storageService } from './async-storage.service';
import { BehaviorSubject, Observable, catchError, from, retry, tap, throwError } from 'rxjs';

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
        tap(notes => this.#_notes$.next(notes)),
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

  getEmptyNote(): Partial<NoteModel> {
    return {
      type: ''
    }
  }

  #add(note: Partial<NoteModel>): Observable<NoteModel> {
    return from(storageService.post(NOTE_DB, note as NoteModel))
      .pipe(
        tap((newNote: NoteModel) => {
          const notes = this.#_notes$.value
          this.#_notes$.next([...notes, newNote])
        }),
        retry(1),
        catchError(this.#handleError))
  }

  #edit(note: NoteModel): Observable<NoteModel> {
    return from(storageService.put(NOTE_DB, note))
      .pipe(
        tap(updateNote => {
          const notes = this.#_notes$.value
          const idx = notes.findIndex(_note => _note._id === updateNote._id)
          notes.splice(idx, 1, updateNote)
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
    let demoNotes: NoteModel[] = Array.from({ length: 10 }, () =>
      ({ _id: this.#makeId(), txt: this.#makeLorem(), createdAt: Date.now(), type: TXT }))
    return demoNotes
  }

  #makeId(length = 5) {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  #makeLorem(size = 5) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
      size--
      txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
  }
}
