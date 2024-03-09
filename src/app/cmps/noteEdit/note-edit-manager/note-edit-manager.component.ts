import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NoteModel, TextNoteModel } from '../../../models/note.model';
import { NoteService, TXT } from '../../../services/note.service';
import { NoteText } from '../../notePreview/note-text/note-text.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { NoteEditText } from '../note-edit-text/note-edit-text.component';

@Component({
  selector: 'note-edit-manager',
  templateUrl: './note-edit-manager.component.html',
  styleUrl: './note-edit-manager.component.scss'
})
export class NoteEditManager implements OnInit {

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  elRef = inject(ElementRef)
  noteService = inject(NoteService)
  isInitialized = false

  destroySubject$ = new Subject()
  note: Partial<TextNoteModel> | null = null

  @ViewChild('noteEditContainer', { read: ViewContainerRef }) noteEditContainerRef!: ViewContainerRef
  cdr = inject(ChangeDetectorRef)

  type: string = TXT

  constructor() {

  }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => {
        return data['note']
      }))
      .subscribe(note => {
        this.note = note
      })

    setTimeout(() => {
      this.isInitialized = true;
    }, 0)
  }


  ngAfterViewInit(): void {
    this.loadComponent()
    this.cdr.detectChanges()
  }

  saveNote(note: NoteModel) {
    console.log("note:", note)
    this.noteService.save(note)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({ next: this.onBack, error: err => console.log('err', err) })
  }

  loadComponent() {
    this.noteEditContainerRef.clear()
    const componentRef = this.noteEditContainerRef.createComponent(NoteEditText)
    componentRef.instance.note = this.note as TextNoteModel
    componentRef.instance.saveEvent.subscribe((note: TextNoteModel) => {
      this.saveNote(note)
    })

  }

  onBack = () => {
    this.router.navigateByUrl('/note')
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    if (!this.isInitialized) return
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.onBack()
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }


}
