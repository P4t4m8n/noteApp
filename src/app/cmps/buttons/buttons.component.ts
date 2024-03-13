import { Component, ElementRef, EventEmitter, OnInit, Output, inject } from '@angular/core';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class Buttons implements OnInit {

  isHovered = false
  @Output() setColor = new EventEmitter<string>()
  @Output() close = new EventEmitter()
  @Output() remove = new EventEmitter()
  elRef = inject(ElementRef)

  colors: string[] = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
    '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

  isOpen: boolean = false

  selectColor(color: string): void {
    console.log("color:", color)
    this.setColor.emit(color)
    this.handleModal()

  }

  handleModal(): void {
    this.isOpen = !this.isOpen 
  }
  ngOnInit(): void {
      console.log(this.isHovered)
  }


  onChangeColor(color: string) {
    this.setColor.emit(color)
  }

  // onClose() {
  //   this.close.emit()
  // }



}
