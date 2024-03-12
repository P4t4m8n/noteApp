import { Component, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';

@Component({
  selector: 'color-modal',
  templateUrl: './color-modal.component.html',
  styleUrl: './color-modal.component.scss'
})
export class ColorModalComponent {
  @Output() setColor = new EventEmitter<string>()
  colors: string[] = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
    '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

  elRef = inject(ElementRef)
  isOpen: boolean = false


  selectColor(color: string): void {
    console.log("color:", color)
    this.setColor.emit(color)
    this.handleModal(false)

  }

  @HostListener('document:click', ['$event'])
  handleColorClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    if (!this.elRef.nativeElement.contains(event.target)) {
      this.handleModal(false)
    }
  }

  handleModal(isOpen: boolean): void {
    this.isOpen = isOpen
  }

}
