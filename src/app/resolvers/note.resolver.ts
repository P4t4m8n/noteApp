import { ResolveFn } from '@angular/router';
import { NoteModel } from '../models/note.model';
import { of } from 'rxjs';
import { inject } from '@angular/core';
import { NoteService } from '../services/note.service';

export const noteResolver: ResolveFn<NoteModel | Partial<NoteModel>> = (route, state) => {
  const noteId = route.params['noteId']
  console.log("noteId:", noteId)

  const noteService = inject(NoteService)
  // if (!noteId) return noteService.getEmptyNote()
  return noteService.get(noteId)
};
