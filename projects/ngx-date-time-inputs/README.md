# @nowzoo/ngx-date-time-inputs

Simple, extensible date and time controls and utilities. Forgiving and (more or less) locale-aware.


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


## Public API 

### Constants

- `const MODEL_DATE_FORMAT = 'YYYY-MM-DD'`  
The format for dates. 
- `const MODEL_TIME_FORMAT = 'HH:mm'`  
The format for times.

### Interfaces

**`interface IDateParseResult`**
- `year: number`
- `month: number`
- `date: number`

**`interface ITimeParseResult`**
- `hour: number`
- `minute: number`


### Classes

**`class NgxDateTimeParser`**

Static methods to "guess" dates and times from a variety of strings the user may input.

- `static parseDate(dateStr: string): IDateParseResult`
- `static parseTime(timeStr: string): ITimeParseResult`


**`class NgxDateValidators`**

Date control validation designed to work with `MODEL_DATE_FORMAT`; that is, both the control value and the min/max constraint are expected to be strings in the format `YYYY-MM-DD`.

- `static minDate(min: string): ValidatorFn`  
If the control value is a day before `min`, the function will return `{minDate: true}`

- `static maxDate(min: string): ValidatorFn`  
If the control value is a day after `max`, the function will return `{maxDate: true}`

**`abstract class NgxAbstractDateControl implements ControlValueAccessor`**

An abstract base class for a date control that 
- accepts a variety of user inputs, 
- "guesses" the date, 
- normalizes the model value to `MODEL_DATE_FORMAT`, and 
- sets the displayed input value to a format of your choosing.

Note that the actual value of your control will always be in the format `MODEL_DATE_FORMAT` -- not the format displayed to the user. If the value you pass in cannot be parsed -- if it's not formatted to `MODEL_DATE_FORMAT` -- then the control value will be the current day.

- `abstract displayFormat: string`  
A Moment format, like `'LL'`. This is the format that will be displayed in the text box. Your implementation must set this.

**`abstract class NgxAbstractTimeControl implements ControlValueAccessor`**

An abstract base class for a time control that 
- accepts a variety of user inputs, 
- "guesses" the time, 
- normalizes the model value to `MODEL_TIME_FORMAT`, and 
- sets the displayed input value to a format of your choosing.

Note that the actual value of your control will always be in the format `MODEL_TIME_FORMAT` -- not the format displayed to the user. If the value you pass in cannot be parsed -- if it's not formatted to `MODEL_TIME_FORMAT` -- then the control value will be set to the current time.

- `abstract displayFormat: string`  
A moment format, like `'LT'`. This is the format that will be displayed in the text box. Your implementation must set this.

### Components

**`DateControlComponent extends NgxAbstractDateControl`**

An implementation of `NgxAbstractDateControl`.

Selector: `ngx-date-control`

Inputs:

- `displayFormat: string`  
The format that will be displayed to the user. See Moment's [formatting docs](https://momentjs.com/docs/#/displaying/format/). Default: `LL`
- `inputClass: string`  
The class to be applied to the text input. Pass any error classes here. Default: `form-control`.
- `inputPlaceholder: string`  
The placeholder to be applied to the text input. Default: `Enter date...`.
- `inputId: string`  
The id to be applied to the text input.

**`TimeControlComponent extends NgxAbstractTimeControl`**

An implementation of `NgxAbstractTimeControl`.

Selector: `ngx-time-control`

Inputs:

- `displayFormat: string`  
The format that will be displayed to the user. See Moment's [formatting docs](https://momentjs.com/docs/#/displaying/format/). Default: `LT`
- `inputClass: string`  
The class to be applied to the text input. Pass any error classes here. Default: `form-control`.
- `inputPlaceholder: string`  
The placeholder to be applied to the text input. Default: `Enter time...`.
- `inputId: string`  
The id to be applied to the text input.


## Development

Contributions are welcome. 

```bash
git clone https://github.com/nowzoo/ngx.git
npm i
```

The library code is located in `projects/ngx-date-time`.

To run tests:
  - `ng test ngx-date-time`
  - or use the `wallaby.js` file at `projects/ngx-date-time/wallaby.js`

Build the library with `ng build ngx-date-time`.




## License

MIT
