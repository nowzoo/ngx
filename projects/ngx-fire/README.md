# @nowzoo/ngx-fire

Directive for binding an Angular Reactive form control to a Firebase reference.



## Getting Started

```bash 
npm i -S @nowzoo/ngx-fire
```

Import the module.
```ts
import { NgxFireModule } from '@nowzoo/ngx-fire';
@NgModule({
  imports: [
    NgxFireModule
    //...
  ],
  //...
})
export class MyModule { }
```

Bind a control with `[ngxFireControl]="ref"`...
```html
<input
  type="text"
  class="form-control"
  placeholder="How's it going?"
  [formControl]="control"
  [ngxFireControl]="ref"
  #fc="ngxFireControl"
  debounce="1000">
```




## Public API

### Directive `NgxFireControlDirective`

Binds a FormControl to a reference. Must be used in conjunction with `FormControlDirective` (`[formControl]="ctl"`) or `FormControlName` (`formControlName="myName"`.)

- selector: `[ngxFireControl]` 
- exportAs: `ngxFireControl`
- Inputs
  - `ngxFireControl: Reference` Required.
  - `debounce: number` Optional. Default: 0. The amount of time in milliseconds to debounce form control changes before saving. Useful for text controls. You can also set the the form control's `updateOn` property to `'blur'`
  - `trim: boolean` Optional. Default: true. If true, and if the control value is a string, the value will be trimmed before saving.
- Methods
  - `save(): void` Saves the current control value to the database. Rejects if the control is not valid or if there is a Firebase error.
- Properties
  - `error: Observable<Error>` Populated if the Firebase ref throws an error either reading or writing.
  - `saving: Observable<boolean>` True if the control value is being saved to the database.
  - `value: Observable<any>` The current database value.
  - `ref: Reference` The reference you passed in via `ngxFireControl`



## Development

See the [README](https://github.com/nowzoo/ngx) at the root of the repo for info on installation and testing.