import { Component, Input } from '@angular/core';
import { Note } from '../../../models/note.model';

@Component({
  selector: 'note-text',
  templateUrl: './note-text.component.html',
  styleUrl: './note-text.component.scss'
})
export class NoteText {
  @Input() note!: Note

}
