# @nowzoo/ngx-bootstrap-calendar

Bootstrap 4 calendar inputs for Angular.

## Quick Start

Install the library and its dependencies...

```bash
npm i -S @nowzoo/ngx-bootstrap-calendar @nowzoo/ngx-date-time-inputs @nowzoo/ngx-bootstrap-modal lodash jquery bootstrap moment ngx-moment @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
```

Include the Bootstrap dependencies in some way in your build, for example via `angular.json`...

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
  "node_modules/jquery/dist/jquery.slim.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
],
```

**Note:** In the above example we use `bootstrap.bundle.min.js`, which includes `popper.js`. If you don't use the bundle version you have to install and add `popper.js`.

Import the module...
```ts
//...
import { 
  NgxBootstrapCalendarModule 
} from '@nowzoo/ngx-bootstrap-calendar';

@NgModule({
  //...
  imports: [
    NgxBootstrapCalendarModule
  ]
})
export class MyModule { }
```

Use the components.

```html
<!-- control with input and modal... -->
<label [attr.for]="id + 'date'">Date</label>
  <ngx-bootstrap-calendar-control 
  [inputId]="id + 'date'" 
  [formControl]="fc"><ngx-bootstrap-calendar-control>

<!-- inline calendar -->
<ngx-bootstrap-calendar [(selected)]="inlineValue"></ngx-bootstrap-calendar>
<pre>Current Value: {{inlineValue}}</pre>

<!-- modal calendar -->
<ngx-bootstrap-calendar-modal 
  #cal="ngxBootstrapCalendarModal" 
  [(selected)]="modalValue"></ngx-bootstrap-calendar-modal>

Current Value: {{modalValue}} 
<button (click)="cal.show()" class="btn btn-primary btn-sm" >Edit...</button>

```

## Public API

### CalendarComponent

A component that displays a calendar inline.

- selector: `ngx-bootstrap-calendar`
- exportAs: `ngxBootstrapCalendar`

#### Inputs
- `selected: string`  
Optional. The currently selected date in `YYYY-MM-DD` format.
- `min: string`  
Optional. The min date (inclusive) in `YYYY-MM-DD` format.
- `max: string`  
Optional. The max date (inclusive) in `YYYY-MM-DD` format.

#### Outputs 
- `selectedChange: EventEmitter<string>` Emits the current value in `YYYY-MM-DD` format. Note that you can use "banana in a box" syntax instead: `[(selected)]="myValue"`.
- `monthChange: EventEmitter<moment.Moment>` Emitted when the displayed month (therefore possibly the height of the component) changes. Used by the modal component (see below) to ensure the modal is correctly positioned.

### CalendarModalComponent

A component that wraps a calendar in a Bootstrap modal.

- selector: `ngx-bootstrap-calendar-modal`
- exportAs: `ngxBootstrapCalendarModal`


#### Inputs
- `selected: string`   
Optional. The date value in `YYYY-MM-DD` format.
- `min: string`   
Optional. The min date (inclusive) in `YYYY-MM-DD` format.
- `max: string`   
Optional. The max date (inclusive) in `YYYY-MM-DD` format.

#### Outputs 
- `selectedChange: EventEmitter<string>`   
Emits the current value in `YYYY-MM-DD` format. Note that you can use "banana in a box" syntax instead: `[(selected)]="myValue"`.

#### Methods
- `show(): void`   
Shows the modal.

### CalendarControlComponent

A control component that implements `ControlValueAccessor` -- i.e. for use wih reactive form controls or template forms. It includes a text input for the date and a button to open a modal calendar.  The text input displays the date in a locale-aware format and is forgiving of various date formats that a user may enter. 

**Note:** The model value is expected to be a string in the format `YYYY-MM-DD`

**Note:** The min and max inputs only constrain the date in the calendar modal. The user may enter any date in the text box. Therefore, you must also provide min/max validation on your form control.

- selector: `ngx-bootstrap-calendar-control`

#### Inputs
- `min: string`   
Optional. The min date (inclusive) in `YYYY-MM-DD` format.
- `max: string`   
Optional. The max date (inclusive) in `YYYY-MM-DD` format. 
- `displayFormat: string`   
Optional. The date format displayed in the text input. Default: `'LL'`.
- `inputPlaceholder: string`   
Optional. The placeholder for the text input.  Also used as the modal calendar title. Default: `'Enter a date'`.
- `boostrapSize: 'sm' | 'lg'`   
Optional. used to set the input group class. Default: `null`.
- `invalid: boolean`   
Optional. Pass this input if you want the Bootstrap `.is-invalid` class added to the text input based on your validation. 


## Development

Contributions are welcome. 

```bash
git clone https://github.com/nowzoo/ngx.git
npm i
```

The library code is located in `projects/ngx-bootstrap-calendar`.

To run tests:
  - `ng test ngx-bootstrap-calendar`
  - or use the `wallaby.js` file at `projects/ngx-bootstrap-calendar/wallaby.js`

Build the library with `ng build ngx-bootstrap-calendar`.


## License

MIT



