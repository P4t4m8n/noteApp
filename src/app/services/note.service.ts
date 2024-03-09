import { Injectable } from '@angular/core';
import { Note, TextNote } from '../models/note.model';
import { storageService } from './async-storage.service';
const NOTE_DB = 'note'

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[] = []

  constructor() {
    this.notes = JSON.parse(localStorage.getItem(NOTE_DB) || 'null')
    if (!this.notes || this.notes.length <= 0) {
      this.notes = this.#createNots()
      localStorage.setItem(NOTE_DB, JSON.stringify(this.notes))
    }
  }

  query(): Promise<Note[]> {
    return storageService.query<Note>(NOTE_DB)
  }

  get(noteID: string): Promise<Note> {
    return storageService.get<Note>(NOTE_DB, noteID)
  }

  save(note: Partial<Note> | Note): Promise<Note> {

    return note._id ? this.#edit(note as Note) : this.#add(note)
  }

  getEmptyTextNote(): Partial<TextNote> {
    return {
      txt: ''
    }
  }

  #add(note: Partial<Note>): Promise<Note> {
    return storageService.post(NOTE_DB, note as Note)
  }

  #edit(note: Note): Promise<Note> {
    return storageService.put(NOTE_DB, note)
  }

  #createNots(): Note[] {
    let demoNotes: Note[] = []
    Array.from({ length: 10 }, () => ({ id: this.#makeId(), txt: this.#makeLorem(), createdAt: Date.now() }))
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
