import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  @Input() appAutoFocus;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    if (this.appAutoFocus) {
      setTimeout(() => {
        this.elRef.nativeElement?.focus();
      });
    }
  }
}
