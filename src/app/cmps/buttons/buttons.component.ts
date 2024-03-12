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
  elRef = inject(ElementRef)


  onChangeColor(ev: Event) {
    console.log("ev:", ev)
    ev.stopImmediatePropagation()
    ev.preventDefault()
    ev.stopPropagation()

    const target = ev.target as HTMLInputElement
    this.setColor.emit(target.value as string)

  }

  onClose() {
    this.close.emit()
  }



}
