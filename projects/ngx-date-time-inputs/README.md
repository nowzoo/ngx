# @nowzoo/ngx-date-time-inputs

Simple date and time inputs. No calendars or fancy controls or polyfills. They just guess the date or time the user means. Forgiving and (more or less) locale-aware.


## Installation

Install the library and its dependencies (moment and lodash).

```bash
npm i --save @nowzoo/ngx-date-time-inputs moment lodash
```

## Usage

Import the library module...

```typescript
import { NgxDateTimeInputsModule } from '@nowzoo/ngx-date-time-inputs';
@NgModule({
  imports: [
    NgxDateTimeInputsModule
  ]
})
export class MyModule { }
```

The `ngx-date-input` and `ngx-time-input` components are
now available for you to use:

```html
<ngx-date-input
  [inputId]="formId + 'date'"
  inputClass="form-control"
  [(ngModel)]="date"></ngx-date-input>
<ngx-time-input
  [inputId]="formId + 'time'"
  inputClass="form-control"
  [(ngModel)]="time"></ngx-time-input>
```

## Date Input API
The component implements `ControlValueAccessor`. The model is a string in the format `YYYY-MM-DD`.

Selector: `ngx-date-input`

Inputs
- `displayFormat: string` The format for displaying the date in the input. See Moment's [formatting docs](https://momentjs.com/docs/#/displaying/format/).
  Default: `'LL'` (e.g., September 4, 1986).
- `inputPlaceholder: string` A string to be used as the input's placeholder attribute. Default: `'Enter a date'`
- `inputId: string` A string to be used as the input's id.
- `inputClass: string` A string to be used as the input's class. Pass any error classes here.

## Time Input API
The component implements `ControlValueAccessor`. The model is a string in the format `HH:mm` (24-hour time).

Selector: `ngx-time-input`

Inputs

- `displayFormat: string` The format for displaying the date in the input. See Moment's [formatting docs](https://momentjs.com/docs/#/displaying/format/). Default: `'LT'` (time in the locale).
- `inputPlaceholder: string` A string to be used as the input's placeholder attribute. Default: `'Enter a time'`
- `inputId: string` A string to be used as the input's id.
- `inputClass: string` A string to be used as the input's class. Pass any error classes here.



## Development

See the [README](https://github.com/nowzoo/ngx) at the root of the repo for info on installation and testing.
