import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NoteModel } from '../../../models/note.model';

@Component({
  selector: 'note-text',
  templateUrl: './note-text.component.html',
  styleUrl: './note-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NoteText implements OnInit {
  @Input() note!: NoteModel
  
  ngOnInit(): void {
    console.log("note:", this.note)
  }

  
}
