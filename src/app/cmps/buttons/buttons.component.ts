import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss', '../notePreview/note-preview-manager/note-preview-manager.component.scss']
})
export class Buttons {

  isHovered = false
  cdr = inject(ChangeDetectorRef)

  // setHoverState(isHovered: boolean) {
  //   this.isHovered = isHovered;
  //   this.cdr.detectChanges()
  // }
}
