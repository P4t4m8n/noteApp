import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
import { ReminderSvg } from './svgs/reminder/reminder.component';
import { EditLabelsSvg } from './svgs/edit-labels/edit-labels.component';
import { ArchiveSvg } from './svgs/archive/archive.component';
import { TrashSvg } from './svgs/trash/trash.component';
import { LightBulbSvg } from './svgs/light-bulb/light-bulb.component';
import { ColorSvg } from './svgs/color-svg/color-svg.component';
import { UploadImageSvg } from './svgs/upload-image-svg/upload-image-svg.component';
import { DotsSvg } from './svgs/dots-svg/dots-svg.component';
import { Buttons } from './cmps/buttons/buttons.component';
import { ColorModal } from './cmps/color-modal/color-modal.component';
import { UndoSvg } from './svgs/undo-svg/undo-svg.component';
import { PinnedSvg } from './svgs/pinned-svg/pinned-svg.component';
import { PinnedFullSvgComponent } from './svgs/pinned-full-svg/pinned-full-svg.component';

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
    LightBulbSvg,
    ReminderSvg,
    EditLabelsSvg,
    ArchiveSvg,
    TrashSvg,
    ColorSvg,
    UploadImageSvg,
    DotsSvg,
    Buttons,
    ColorModal,
    UndoSvg,
    PinnedSvg,
    PinnedFullSvgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [App]
})
export class AppModule { }
