import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteIndex } from './pages/note-index/note-index.component';
import { NoteEditManager } from './cmps/noteEdit/note-edit-manager/note-edit-manager.component';

const routes: Routes = [
  { path: 'note', component: NoteIndex ,children:[
    {path:'edit/:noteId',component:NoteEditManager}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
