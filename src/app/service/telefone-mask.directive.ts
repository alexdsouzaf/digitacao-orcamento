import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTelefoneMask]'
})
export class TelefoneMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    let input = this.el.nativeElement.value.replace(/\D/g, '');

    if (input.length > 11) {
      input = input.substring(0, 11);
    }

    const ddd = input.substring(0, 2);
    const firstPart = input.substring(2, 7);
    const secondPart = input.substring(7, 11);

    if (input.length > 6) {
      this.el.nativeElement.value = `(${ddd}) ${firstPart}-${secondPart}`;
    } else if (input.length > 2) {
      this.el.nativeElement.value = `(${ddd}) ${firstPart}`;
    } else if (input.length > 0) {
      this.el.nativeElement.value = `(${ddd}`;
    }
  }
}
