import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Output, inject } from '@angular/core';

@Directive({
    selector: '[modal]'
})
export class ModalDirective implements OnInit {

    @Output() clickOutside = new EventEmitter()
    private el = inject(ElementRef)

    ngOnInit(): void {
        setTimeout(() => {
            this.onClick = (ev: MouseEvent) => {
                const isClickedInside = this.el.nativeElement.contains(ev.target)
                console.log("ev.target:", ev.target)
                if (!isClickedInside) this.clickOutside.emit()
            }

        }, 0);
    }

    @HostListener('document:click', ['$event'])
    onClick: (ev: MouseEvent) => void = () => { }

    // @HostBinding('style')
    // style = {
    //     position: 'fixed',
    //     inset: '0',
    //     top: '-10%',
    //     margin: 'auto',
    //     'box-shadow': '0 0 0 100vmax rgba(0, 0, 0, 0.5),-3px 1px 28px #00000043',
    // }

}
