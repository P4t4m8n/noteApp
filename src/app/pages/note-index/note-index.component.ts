import { Component, OnInit, inject } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { NoteModel } from '../../models/note.model';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'note-index',
  templateUrl: './note-index.component.html',
  styleUrl: './note-index.component.scss'
})
export class NoteIndex implements OnInit {

  noteService = inject(NoteService)
  notes$: Observable<NoteModel[]> = this.noteService.notes$
  notes: NoteModel[] = []

  ngOnInit(): void {
    this.notes$.subscribe(notes => {
      this.notes = notes
      console.log("notes:", this.notes)
      
    })
  }


}
