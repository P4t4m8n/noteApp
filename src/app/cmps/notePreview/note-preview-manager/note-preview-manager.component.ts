import { ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NoteModel, TextNoteModel } from '../../../models/note.model';
import { NoteService, TXT } from '../../../services/note.service';
import { NoteText } from '../../notePreview/note-text/note-text.component';
import { Buttons } from '../../buttons/buttons.component';

@Component({
  selector: 'note-preview-manager',
  templateUrl: './note-preview-manager.component.html',
  styleUrl: './note-preview-manager.component.scss'
})
export class NotePreviewManager {

  @Input() note!: NoteModel
  @ViewChild('noteContainer', { read: ViewContainerRef }) notesContainerRef!: ViewContainerRef
  @ViewChild('btns') noteBtns!: Buttons

  cdr = inject(ChangeDetectorRef)
  noteService = inject(NoteService)
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

  onRemoveNote(noteId: string) {
    this.noteService.remove(noteId)
      .subscribe({
        next: noteId => console.log('removed', noteId),
        error: err => console.log('err:', err)
      })
  }

  setColor(color: string) {
    this.note.bgc = color
    this.saveNote(this.note)
  }

  saveNote(note: NoteModel | Partial<NoteModel>) {
    this.noteService.save(note)

  }

  toggleBtns(isHovered: boolean) {
    this.noteBtns.isHovered = isHovered
  }

  setType() {
    this.type = this.note.type
  }
}
