import { Component, Input } from '@angular/core';
import { NoteModel } from '../../../models/note.model';

@Component({
  selector: 'note-preview',
  templateUrl: './note-preview.component.html',
  styleUrl: './note-preview.component.scss'
})
export class NotePreviewComponent {

  @Input() note!: NoteModel
}
