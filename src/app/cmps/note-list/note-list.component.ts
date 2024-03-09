import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit {


  @Input() notes: Note[] | null = null
  ngOnInit(): void {
    console.log("notes:", this.notes)

  }

}
