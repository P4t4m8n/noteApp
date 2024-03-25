import { Directive, ElementRef, HostListener, OnInit, inject } from '@angular/core'

@Directive({
  selector: '[appDragScroll]'
})
export class DragScrollDirective implements OnInit {
  private isDown = false
  private startX!: number
  private scrollLeft!: number
  private el = inject(ElementRef)

  constructor() {}

  ngOnInit() {
    this.el.nativeElement.style.overflow = 'auto'
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(ev: MouseEvent) {
    ev.stopPropagation()
    console.log("ev:", ev)
    this.isDown = true
    this.startX = ev.pageX - this.el.nativeElement.offsetLeft
    this.scrollLeft = this.el.nativeElement.scrollLeft
    this.el.nativeElement.classList.add('active-dragging')
  }

  @HostListener('mouseleave')
  @HostListener('mouseup')
  onMouseUpLeave() {
    console.log('leave')
    this.isDown = false
    this.el.nativeElement.classList.remove('active-dragging')
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(ev: MouseEvent) {
    if (!this.isDown) return
    ev.stopPropagation()
    ev.preventDefault() 
    const x = ev.pageX - this.el.nativeElement.offsetLeft
    const walk = (x - this.startX) * 3 
    console.log("walk:", walk)
    this.el.nativeElement.scrollLeft = this.scrollLeft - walk
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
  }
}
