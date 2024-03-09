import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app-root/app.component';
import { NoteIndex } from './pages/note-index/note-index.component';
import { NoteListComponent } from './cmps/note-list/note-list.component';
import { NoteFilterComponent } from './cmps/note-filter/note-filter.component';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { EditNoteTxtComponent } from './cmps/noteEdit/edit-note-txt/edit-note-txt.component';
import { NoteManagerEditComponent } from './cmps/noteEdit/note-manager-edit/note-manager-edit.component';
import { NoteManagerDetails } from './cmps/noteDetails/note-manager-details/note-manager-details.component';
import { NoteText } from './cmps/noteDetails/note-text/note-text.component';

@NgModule({
  declarations: [
    App,
    NoteIndex,
    NoteListComponent,
    NoteFilterComponent,
    NoteEditComponent,
    NoteDetailsComponent,
    EditNoteTxtComponent,
    NoteManagerEditComponent,
    NoteManagerDetails,
    NoteText
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
