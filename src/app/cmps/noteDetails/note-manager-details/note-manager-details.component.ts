import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Note } from '../../../models/note.model';
import { TXT } from '../../../services/note.service';
import { NoteText } from '../note-text/note-text.component';

@Component({
  selector: 'note-manager-details',
  templateUrl: './note-manager-details.component.html',
  styleUrl: './note-manager-details.component.scss'
})
export class NoteManagerDetails implements OnInit {

  @Input() note!: Note
  @ViewChild('noteContainer', { read: ViewContainerRef }) notesContainerRef!: ViewContainerRef
  type: string = TXT

  ngOnInit(): void {
    this.loadComponent()

  }

  loadComponent() {
    this.notesContainerRef.clear()
    // const componentRef = this.type === TXT ?
    const componentRef = this.notesContainerRef.createComponent(NoteText)
    // this.notesContainerRef.createComponent(BarChartComponent)

    componentRef.instance.note = this.note
  }

  setType() {
    this.type = this.note.type
  }

}
