import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NoteModel, TextNoteModel } from '../../../models/note.model';
import { NoteService, TXT } from '../../../services/note.service';
import { NoteText } from '../../notePreview/note-text/note-text.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { NoteEditText } from '../note-edit-text/note-edit-text.component';

@Component({
  // standalone:true,
  selector: 'note-edit-manager',
  templateUrl: './note-edit-manager.component.html',
  styleUrl: './note-edit-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NoteEditManager implements OnInit {

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  elRef = inject(ElementRef)
  noteService = inject(NoteService)
  isInitialized = false
  isModal = false

  destroySubject$ = new Subject()
  note: Partial<TextNoteModel> = this.noteService.getEmptyNote()

  @ViewChild('noteEditContainer', { read: ViewContainerRef }) noteEditContainerRef!: ViewContainerRef
  cdr = inject(ChangeDetectorRef)

  type: string = TXT

  constructor() {

    console.log('aaa')
  }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => {
        return data['note']
      }))
      .subscribe(note => {
        console.log("note:", note)
        if (note) {
          this.note = note
          this.isModal = true
        }
      })

    setTimeout(() => {
      this.isInitialized = true;
    }, 0)
  }


  ngAfterViewInit(): void {
    this.loadComponent()
    this.cdr.detectChanges()
  }



  loadComponent() {
    this.noteEditContainerRef.clear()
    const componentRef = this.noteEditContainerRef.createComponent(NoteEditText)
    componentRef.instance.note = this.note as TextNoteModel
    componentRef.instance.saveEvent.subscribe((note: TextNoteModel) => {
      this.saveNote(note)
    })

  }

  saveNote(note: NoteModel) {
    console.log("note:", note)
    this.noteService.save(note)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({ next: this.onBack, error: err => console.log('err', err) })
  }

  onBack = () => {
    this.router.navigateByUrl('/note')
  }


  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    if (!this.isInitialized || !this.isModal) return
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.onBack()
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }


}
