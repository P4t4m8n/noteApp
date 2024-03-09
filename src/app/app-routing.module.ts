import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteIndex } from './pages/note-index/note-index.component';
import { NoteEditManager } from './cmps/noteEdit/note-edit-manager/note-edit-manager.component';
import { noteResolver } from './resolvers/note.resolver';

const routes: Routes = [
  {
    path: 'note', component: NoteIndex, children: [
      { path: 'edit/:noteId', component: NoteEditManager, resolve: { note: noteResolver } },
      { path: 'edit/', component: NoteEditManager, resolve: { note: noteResolver } }
    ]
  },
  { path: '', redirectTo: 'note', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
