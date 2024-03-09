import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NoteModel, TextNoteModel } from '../../../models/note.model';
import { TXT } from '../../../services/note.service';
import { NoteText } from '../../notePreview/note-text/note-text.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, map } from 'rxjs';

@Component({
  selector: 'note-edit-manager',
  templateUrl: './note-edit-manager.component.html',
  styleUrl: './note-edit-manager.component.scss'
})
export class NoteEditManager implements OnInit {

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  elRef = inject(ElementRef)
  isInitialized = false

  destroySubject$ = new Subject()
  form!: FormGroup
  note: Partial<TextNoteModel> | null = null

  // @ViewChild('noteContainer', { read: ViewContainerRef }) notesContainerRef!: ViewContainerRef
  // cdr = inject(ChangeDetectorRef)
  type: string = TXT

  constructor() {
    this.form = this.fb.group({
      txt: ['', [], []],

    })
  }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => {
        return data['note']
      }))
      .subscribe(note => {
        this.note = note
      })

    this.form = this.fb.group({
      txt: [this.note?.txt]
    })

    setTimeout(() => {
      this.isInitialized = true;
    }, 0)
  }


  // ngAfterViewInit(): void {
  //   this.loadComponent()
  //   this.cdr.detectChanges()
  // }

  // loadComponent() {
  //   this.notesContainerRef.clear()
  //   const componentRef = this.notesContainerRef.createComponent(NoteText)
  //   componentRef.instance.note = this.note as TextNoteModel
  // }

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
