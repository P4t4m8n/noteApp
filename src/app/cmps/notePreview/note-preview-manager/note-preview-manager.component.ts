import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NoteModel, TextNoteModel } from '../../../models/note.model';
import { TXT } from '../../../services/note.service';
import { NoteText } from '../../notePreview/note-text/note-text.component';

@Component({
  selector: 'note-preview-manager',
  templateUrl: './note-preview-manager.component.html',
  styleUrl: './note-preview-manager.component.scss'
})
export class NotePreviewManager {

  @Input() note!: NoteModel
  @ViewChild('noteContainer', { read: ViewContainerRef }) notesContainerRef!: ViewContainerRef
  cdr = inject(ChangeDetectorRef)
  type: string = TXT


  ngAfterViewInit(): void {
    this.loadComponent()
    this.cdr.detectChanges()
  }

  loadComponent() {
    this.notesContainerRef.clear()
    const componentRef = this.notesContainerRef.createComponent(NoteText)
    componentRef.instance.note = this.note as TextNoteModel
  }

  setType() {
    this.type = this.note.type
  }
}
