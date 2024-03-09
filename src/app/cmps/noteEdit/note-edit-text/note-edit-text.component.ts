import { Component, EventEmitter, Input, NgZone, Output, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { TextNoteModel } from '../../../models/note.model';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'note-edit-text',
  templateUrl: './note-edit-text.component.html',
  styleUrl: './note-edit-text.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, TextFieldModule, MatButtonModule,FormsModule]
})
export class NoteEditText {

  @Input() note!: TextNoteModel
  @Output() saveEvent = new EventEmitter()
  txtAutoFilled!: boolean

  save(ev:Event) {
    ev.preventDefault()
    this.saveEvent.emit(this.note)
  }
  // private _ngZone = inject(NgZone)
  // @ViewChild('autosize') autosize!: CdkTextareaAutosize

  // triggerResize(){
  //   this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true))
  // }
}
