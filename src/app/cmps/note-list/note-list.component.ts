import { Component, Input, OnInit } from '@angular/core';
import { NoteModel } from '../../models/note.model';

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteList implements OnInit {


  @Input() notes: NoteModel[] | null = null
  ngOnInit(): void {

  }

}
