import { AbstractControl } from '@angular/forms';
import { NgxFormInvalidOn } from './invalid-on';
export class NgxFormUtils {

  static removeErrorKeys(control: AbstractControl, keys: string|string[]) {
    if (! Array.isArray(keys)) {
      keys = [keys];
    }
    if (! control.errors) {
      return;
    }
    const current: any = Object.assign({}, control.errors);
    const without: any = {};
    Object.keys(current).forEach((key) => {
      if (keys.indexOf(key) === -1) {
        without[key] = current[key];
      }
    });

    if (Object.keys(without).length === 0) {
      control.setErrors(null);
    } else {
      control.setErrors(without);
    }
  }

  static showInvalid(control: AbstractControl, invalidOn?: NgxFormInvalidOn): boolean {
    if (control.valid) {
      return false;
    }
    switch (invalidOn) {
      case NgxFormInvalidOn.always: return true;
      case NgxFormInvalidOn.dirty: return control.dirty;
      default: return control.touched;
    }
  }
  static showInvalidKey(control: AbstractControl, key: string, invalidOn?: NgxFormInvalidOn): boolean {
    return NgxFormUtils.showInvalid(control, invalidOn) && control.hasError(key);
  }
}
