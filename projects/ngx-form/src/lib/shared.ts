import { InjectionToken } from '@angular/core';

export enum NgxValidityOn {
  touched = 'touched',
  dirty = 'dirty',
  always = 'always'
}

export enum NgxValidity {
  hidden = 'hidden',
  pending = 'pending',
  valid = 'valid',
  invalid = 'invalid'
}



export interface INgxFormOptions {
  showValidityOn?: NgxValidityOn | {valid: NgxValidityOn, invalid: NgxValidityOn};
  controlInvalidClass?: string;
  controlValidClass?: string;
  errorContainerClass?: string;
  successContainerClass?: string;
  pendingContainerClass?: string;
}

export const NGX_FORM_DEFAULT_OPTIONS: INgxFormOptions = {
  controlInvalidClass: 'is-invalid',
  controlValidClass: 'is-valid',
  errorContainerClass: 'invalid-feedback d-block',
  successContainerClass: 'valid-feedback d-block',
  pendingContainerClass: 'pending-feedback text-muted small',
  showValidityOn: NgxValidityOn.touched
};

export const NGX_FORM_OPTIONS: InjectionToken<INgxFormOptions> = new InjectionToken(`The default options for ngx-form`);
