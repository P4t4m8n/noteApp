import { Component, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { ColorSvg } from '../../svgs/color-svg/color-svg.component';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'color-modal',
  templateUrl: './color-modal.component.html',
  styleUrl: './color-modal.component.scss',
  imports: [MatButtonModule, MatMenuModule,ColorSvg,CommonModule],
})
export class ColorModal {
  @Output() setColor = new EventEmitter<string>()
  colors: string[] = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
    '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

  elRef = inject(ElementRef)
  isOpen: boolean = true

  selectColor(color: string): void {
    console.log("color:", color)
    this.setColor.emit(color)
    this.handleModal()

  }

  // @HostListener('document:click', ['$event'])
  // handleColorClick(ev: MouseEvent) {
  //   ev.preventDefault()
  //   ev.stopPropagation()

  //   if (!this.elRef.nativeElement.contains(ev.target)) {
  //     console.log('aaaaaaaaaa')
  //     this.handleModal(false)
  //   }
  // }

  handleModal(): void {
    this.isOpen = !this.isOpen 
  }

}
