import { Component, ElementRef, EventEmitter, Output, inject } from '@angular/core';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss', '../notePreview/note-preview-manager/note-preview-manager.component.scss']
})
export class Buttons {

  isHovered = false
  @Output() setColor = new EventEmitter<string>()
  @Output() close = new EventEmitter()
  @Output() remove = new EventEmitter()
  elRef = inject(ElementRef)


  onChangeColor(color: string) {
    console.log("color:", color)
    this.setColor.emit(color)
  }

  onClose() {
    this.close.emit()
  }



}
