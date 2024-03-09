import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { NoteIndexComponent } from './pages/note-index/note-index.component';
import { NoteListComponent } from './cmps/note-list/note-list.component';
import { NotePreviewComponent } from './cmps/note-preview/note-preview.component';
import { NoteFilterComponent } from './cmps/note-filter/note-filter.component';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { EditManagerComponent } from './cmps/noteEdit/edit-manager/edit-manager.component';
import { EditNoteTxtComponent } from './cmps/noteEdit/edit-note-txt/edit-note-txt.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteIndexComponent,
    NoteListComponent,
    NotePreviewComponent,
    NoteFilterComponent,
    NoteEditComponent,
    NoteDetailsComponent,
    EditManagerComponent,
    EditNoteTxtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
