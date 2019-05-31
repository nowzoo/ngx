import { Component,  AfterContentInit, ContentChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'ngx-firebase-auth-password-wrapper',
  templateUrl: './password-wrapper.component.html',
  styleUrls: ['./password-wrapper.component.scss']
})
export class PasswordWrapperComponent implements AfterContentInit {
  shown = false;
  @ContentChild('wrappedPasswordInput', {static: false}) inputElementRef: any;
  constructor(
    private _renderer: Renderer2
  ) { }

  get renderer(): Renderer2 {
    return this._renderer;
  }

  get input(): HTMLInputElement {
    return this.inputElementRef.nativeElement;
  }


  ngAfterContentInit() {
    this.shown = this.input.type === 'text';
    this.update();
  }
  toggle() {
    this.shown = ! this.shown;
    this.update();
  }

  update() {
    this.renderer.setAttribute(
      this.input,
      'type',
      this.shown ? 'text' : 'password'
    );
  }

}
