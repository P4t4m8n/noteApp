import { ChangeDetectionStrategy, Component, Input, OnInit, } from '@angular/core';
import { NoteModel } from '../../models/note.model';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Buttons implements OnInit {

  @Input() note!: NoteModel | Partial<NoteModel>

  isColorOpen = false
  colors: string[] = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
    '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']
    
  ngOnInit(): void {
  }

  setColorOpen(isOpen: boolean) {
    this.isColorOpen = isOpen
  }

}
