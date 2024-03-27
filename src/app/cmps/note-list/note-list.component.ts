import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NoteModel } from '../../models/note.model';
@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NoteList  {

  @Input() notes: NoteModel[] | null = null
  
  trackByFn(index: number, note: any) {
    return note._id
  
  }
}
