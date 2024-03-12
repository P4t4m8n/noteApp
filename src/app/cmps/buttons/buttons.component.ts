import { Component, ElementRef, EventEmitter, OnInit, Output, inject } from '@angular/core';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss', '../notePreview/note-preview-manager/note-preview-manager.component.scss']
})
export class Buttons implements OnInit {

  isHovered = false
  @Output() setColor = new EventEmitter<string>()
  @Output() close = new EventEmitter()
  @Output() remove = new EventEmitter()
  elRef = inject(ElementRef)

  ngOnInit(): void {
      console.log(this.isHovered)
  }


  onChangeColor(color: string) {
    this.setColor.emit(color)
  }

  onClose() {
    this.close.emit()
  }



}
