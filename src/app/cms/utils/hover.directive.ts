import { Directive, Output, EventEmitter, HostListener } from '@angular/core'

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  @Output() hovered = new EventEmitter<boolean>()

  constructor() {}

  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event) {
    $event.preventDefault()
    this.hovered.emit(true)
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event) {
    $event.preventDefault()
    this.hovered.emit(false)
  }

}
