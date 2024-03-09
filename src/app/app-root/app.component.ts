import { Component, inject } from '@angular/core';
import { NoteService } from '../services/note.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {

  noteService = inject(NoteService)

  ngOnInit(): void {
    this.noteService.query()
      .pipe(take(1))
      .subscribe({
        error: (error) => console.log('error:', error)
      })
  }
}
