import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteIndex } from './pages/note-index/note-index.component';
import { NoteManager } from './cmps/noteEdit/note-manager/note-manager.component';
import { noteResolver } from './resolvers/note.resolver';

const routes: Routes = [
  {
    path: 'note', component: NoteIndex, children: [
      { path: 'edit/:noteId', component: NoteManager, resolve: { note: noteResolver } },
      { path: 'edit/', component: NoteManager, resolve: { note: noteResolver } }
    ]
  },
  {
    path: 'archive', component: NoteIndex, children: [
      { path: 'edit/:noteId', component: NoteManager, resolve: { note: noteResolver } },
      { path: 'edit/', component: NoteManager, resolve: { note: noteResolver } }
    ]
  },
  {
    path: 'trash', component: NoteIndex, children: [
      { path: 'edit/:noteId', component: NoteManager, resolve: { note: noteResolver } },
      { path: 'edit/', component: NoteManager, resolve: { note: noteResolver } }
    ]
  },
  { path: '', redirectTo: 'note', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
