import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app-root/app.component';
import { NoteIndex } from './pages/note-index/note-index.component';
import { NoteList } from './cmps/note-list/note-list.component';
import { NoteFilter } from './cmps/note-filter/note-filter.component';
import { NoteText } from './cmps/notePreview/note-text/note-text.component';
import { AppHeader } from './cmps/app-header/app-header.component';
import { AppNav } from './cmps/app-nav/app-nav.component';
import { NotePreviewManager } from './cmps/notePreview/note-preview-manager/note-preview-manager.component';
import { NoteEditManager } from './cmps/noteEdit/note-edit-manager/note-edit-manager.component';
import { NoteEditText } from './cmps/noteEdit/note-edit-text/note-edit-text.component';

@NgModule({
  declarations: [
    App,
    NoteIndex,
    NoteList,
    NoteFilter,
    NoteText,
    AppHeader,
    AppNav,
    NotePreviewManager,
    NoteEditManager,
    NoteEditText
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
