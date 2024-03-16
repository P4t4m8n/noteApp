import { Component, ElementRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { NoteModel } from '../../models/note.model';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class Buttons implements OnInit {

  @Input() note!: NoteModel | Partial<NoteModel>
  ngOnInit(): void {
  }

}
