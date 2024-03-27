import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { Subject, debounceTime, take, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NoteModel } from '../../../models/note.model';

@Component({
  selector: 'note-edit',
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.scss',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class NoteEdit implements AfterViewInit, OnDestroy {

  note!: NoteModel
  mode: 'edit' | 'new' = 'new'
  @Output() saveEvent = new EventEmitter()
  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;

  private destroy$ = new Subject<void>()
  private textChange$ = new Subject<string>()

  elRef = inject(ElementRef)

  ngAfterViewInit() {
    this.textChange$.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(text => {
      this.note.txt = text
      if (this.mode === 'edit') this.save()
    })
    setTimeout(() => this.adjustHeight(this.textareaRef.nativeElement))
  }

  save() {
    this.saveEvent.emit(this.note)
  }

  onBlurNewNote() {
    // if (this.mode === 'edit') return
    this.save()
  }

  onTextChange(newText: string) {
    this.textChange$.next(newText)
  }

  adjustHeight(eventTarget: EventTarget | null) {
    if (eventTarget instanceof HTMLTextAreaElement) {
      const textarea = eventTarget
      if (this.note.txt === '') textarea.style.height = '1.1rem'
      else {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }
  }

  ngOnDestroy() {
    this.save();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
