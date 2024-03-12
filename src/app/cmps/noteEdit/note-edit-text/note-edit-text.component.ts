import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, inject } from '@angular/core';
import { Subject, debounceTime, take, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NoteModel } from '../../../models/note.model';

@Component({
  selector: 'note-edit-text',
  templateUrl: './note-edit-text.component.html',
  styleUrl: './note-edit-text.component.scss',
  standalone: true,
  imports: [FormsModule]
})
export class NoteEditText implements AfterViewInit, OnDestroy {

  @Input() note!: NoteModel
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
      this.save()
    })
    setTimeout(() => this.adjustHeight(this.textareaRef.nativeElement))
  }
  save() {
    this.saveEvent.emit(this.note)
  }

  onTextChange(newText: string) {
    this.textChange$.next(newText)
  }

  adjustHeight(eventTarget: EventTarget | null) {
    if (eventTarget instanceof HTMLTextAreaElement) {
      const textarea = eventTarget
      textarea.style.height = 'fit-content'
   
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  ngOnDestroy() {
    this.save();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
