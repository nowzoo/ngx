import { ValidatorFn, AbstractControl } from '@angular/forms';
import moment from 'moment';
import { MODEL_DATE_FORMAT } from './shared';

export class NgxDateValidators {

  static minDate(min: string): ValidatorFn {
    const fn = (fc: AbstractControl) => {
      const valMoment = moment(fc.value, MODEL_DATE_FORMAT);
      if (!valMoment.isValid()) {
        return null;
      }
      const minMoment = moment(min, MODEL_DATE_FORMAT);
      if (!minMoment.isValid()) {
        return null;
      }
      return minMoment.isAfter(valMoment, 'day') ? { minDate: true } : null;
    };
    return fn;
  }

  static maxDate(max: string): ValidatorFn {
    const fn = (fc: AbstractControl) => {
      const valMoment = moment(fc.value, MODEL_DATE_FORMAT);
      if (!valMoment.isValid()) {
        return null;
      }
      const maxMoment = moment(max, MODEL_DATE_FORMAT);
      if (!maxMoment.isValid()) {
        return null;
      }
      return maxMoment.isBefore(valMoment, 'day') ? { maxDate: true } : null;
    };
    return fn;

  }
}
