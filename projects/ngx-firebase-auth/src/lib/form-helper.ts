import { FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
export class FormHelper {

  static setTransientError(fc: FormControl, key: string, errorValue: any = true) {
    const errors = Object.assign({}, fc.errors);
    errors[key] = errorValue;
    fc.setErrors(errors);
    fc.valueChanges.pipe(take(1)).subscribe(() => {
      FormHelper.clearError(fc, key);
    });
  }

  static clearError(fc: FormControl, key: string) {
    const errors = Object.assign({}, fc.errors);
    delete errors[key];
    if (Object.keys(errors).length === 0) {
      fc.setErrors(null);
    } else {
      fc.setErrors(errors);
    }
  }

  static nonEmptyValidator(fc: FormControl) {
    const value = typeof fc.value === 'string' ? fc.value.trim() : '';
    return value.length === 0 ? {required: true} : null;
  }

  static email(fc: FormControl) {
    const value = typeof fc.value === 'string' ? fc.value.trim() : '';
    if (value.length === 0)  {
      return  {required: true};
    }
    return Validators.email(fc);
  }
}
