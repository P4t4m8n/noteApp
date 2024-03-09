import { Injectable } from '@angular/core';
import { Note, TextNote } from '../models/note.model';
import { storageService } from './async-storage.service';
import { BehaviorSubject, catchError, from, retry, tap, throwError } from 'rxjs';

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

  #_notes$ = new BehaviorSubject<Note[]>([])
  public notes$ = this.#_notes$.asObservable()

  query() {
    return from(storageService.query<Note>(NOTE_DB))
      .pipe(
        tap(notes => this.#_notes$.next(notes)),
        retry(1),
        catchError(this.#handleError)
      )
  }

  get(noteID: string): Promise<Note> {
    return storageService.get<Note>(NOTE_DB, noteID)
  }

  save(note: Partial<Note> | Note): Promise<Note> {

    return note._id ? this.#edit(note as Note) : this.#add(note)
  }

  getEmptyNote(): Partial<Note> {
    return {
      type: ''
    }
  }

  #add(note: Partial<Note>): Promise<Note> {
    return storageService.post(NOTE_DB, note as Note)
  }

  #edit(note: Note): Promise<Note> {
    return storageService.put(NOTE_DB, note)
  }

  #handleError(err: any) {
    console.log('err:', err)
    return throwError(() => err)
  }

  #createNots(): Note[] {
    let demoNotes: Note[] = Array.from({ length: 10 }, () =>
      ({ _id: this.#makeId(), txt: this.#makeLorem(), createdAt: Date.now(),type:TXT }))
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
