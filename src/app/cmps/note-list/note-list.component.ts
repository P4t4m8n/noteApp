import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NoteModel } from '../../models/note.model';

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NoteList implements OnInit {

  @Input() notes: NoteModel[] | null = null
  ngOnInit(): void {
    console.log("notes:", this.notes)

  }
  trackByFn(index: number, note: any) {
    return note._id
  
  }
}
