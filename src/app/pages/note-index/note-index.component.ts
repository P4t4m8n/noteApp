import { Component, OnInit, inject } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { NoteModel } from '../../models/note.model';
import { Observable, map } from 'rxjs';
import { NoteFilterModal } from '../../models/noteFIlter.modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'note-index',
  templateUrl: './note-index.component.html',
  styleUrl: './note-index.component.scss'
})
export class NoteIndex implements OnInit {

  noteService = inject(NoteService)
  private route = inject(ActivatedRoute)

  notes$: Observable<NoteModel[]> = this.noteService.notes$
  filterBy$: Observable<NoteFilterModal> = this.noteService.filterBy$
  notes: NoteModel[] = []

  ngOnInit(): void {
    this.notes$.subscribe(notes => {
      console.log("notes:", notes)
      this.notes = [...notes]
    })

    this.route.url.subscribe(urlSegments => {
     
        let sourceSection = urlSegments[0].path as "archive" | "trash" | "note"|""
        if (sourceSection === '') sourceSection = "note"
        this.noteService.setFilter({ mode: sourceSection })
      })
    
  }


}

