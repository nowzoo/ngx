# @nowzoo/ngx-form

Control validity directives and components for Angular forms.


## Getting Started

```bash
npm i @nowzoo/ngx-form --save
```

Import the module...

```typescript
import { NgxFormModule } from '@nowzoo/ngx-form';

@NgModule({
  //...
  imports: [
    //...
    ReactiveFormsModule, // or FormsModule
    NgxFormModule
  ],
  //...
})
export class MyModule { }
```

Use the directives and components...
```html
<!--
The ngxControlValidity directive is the wrapper.
It's required for the other components and directives to work.
Also, it expects to find an NgControl (ngModel or a reactive control) inside.
It will fail silently if no NgControl is found.
-->
<div class="form-group" ngxControlValidity #emailValidity="ngxControlValidity">
  <label for="reactive-demo-email">Email</label>
  <!--
  ngxControlInvalidClass and ngxControlValidClass add
  the Bootstrap 'is-invalid' and 'is-valid' classes
  to the control element.
  Both are optional.
  -->
  <input
    id="reactive-demo-email"
    type="text"
    [formControl]="fcEmail"
    ngxControlInvalidClass
    ngxControlValidClass
    class="form-control form-control-lg">
  <!--
  show the error for a key...
  -->
  <ngx-control-error key="required">Required.</ngx-control-error>
  <ngx-control-error key="email">Invalid email.</ngx-control-error>
  <!--
  show that the control is valid...
  -->
  <ngx-control-success>That's a valid email!</ngx-control-success>
  <!--
  ngxControlValidity exposes a
  validity$ observable that you can use
  elsewhere. This is one of:
  - "hidden" (don't show the validity)
  - "invalid"
  - "valid"
  -->
  <small class="form-text text-muted">
    Validity: {{emailValidity.validity$ | async | json}}
  </small>
</div>

<!--
You can control when validity is shown
with the showValidityOn input for ngxControlValidity.
Valid values are:
- "touched" (when the input has been blurred, the default)
- "dirty" (when the input has been changed)
- "always"
This controls the behavior of all the components
and directives wrapped by the ngxControlValidity
directive.
-->
<div class="form-group"
ngxControlValidity
showValidityOn="dirty" #tosValidity="ngxControlValidity">
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      value="true"
      id="reactive-demo-check"
      [formControl]="fcTos"
      ngxControlInvalidClass
      ngxControlValidClass>
    <label class="form-check-label" for="reactive-demo-check">
      I agree to your onerous terms of service.
    </label>
  </div>
  <ngx-control-error key="required">You really must agree to send us Junior.</ngx-control-error>
  <ngx-control-success>That's just great! We're sure Junior will enjoy work in the salt mine.</ngx-control-success>
  <small class="form-text text-muted">
    Validity: {{tosValidity.validity$ | async | json}}
  </small>
</div>

```




## Public API

### Enum `NgxValidityOn`

When to show validity.

- `touched = 'touched'`
- `dirty = 'dirty'`
- `always = 'always'`

### Enum `NgxValidity`

The validity state, calculated from the control's validity and the value of `NgxValidityOn`.

- `hidden = 'hidden'`
- `pending = 'pending'`
- `valid = 'valid'`
- `invalid = 'invalid'`

### Interface `INgxFormOptions`

Signature of an object to set global options.

- `showValidityOn?: NgxValidityOn | {valid: NgxValidityOn, invalid: NgxValidityOn}`    
When to show the validity of a control. Default: `NgxValidityOn.touched`.
- `controlInvalidClass?: string`   
The class to apply to invalid inputs. Default: `'is-invalid'`.
- `controlValidClass?: string`   
The class to apply to valid inputs. Default: `'is-valid'`.
- `errorContainerClass?: string`   
The class used by `NgxControlErrorComponent`. Default: `'invalid-feedback d-block'`.
- `successContainerClass?: string`  
The class used by `NgxControlSuccessComponent`. Default: `'valid-feedback d-block'`.
- `pendingContainerClass?: string`  
The class used by `NgxControlPendingComponent`. Default: `'pending-feedback text-muted small'`. 

### Const `NGX_FORM_OPTIONS: InjectionToken<INgxFormOptions>`

Use this token to inject your own default options: 

```typescript
import { NgxFormModule, NGX_FORM_OPTIONS, INgxFormOptions } from '@nowzoo/ngx-form';

const myOpts: INgxFormOptions = {
  controlInvalidClass: 'my-invalid-control'
};

@NgModule({
  //...
  imports: [
    //...
    ReactiveFormsModule, 
    NgxFormModule
  ],
  providers: [{provide: NGX_FORM_OPTIONS, useValue: myOpts}]
})
export class MyModule { }
```


### Directive `NgxControlValidityDirective`

The directive to apply to the element that wraps your control.

- Selector: `[ngxControlValidity]`
- Export As: `ngxControlValidity`
- Inputs:
  - `showValidityOn: NgxValidityOn | {valid: NgxValidityOn, invalid: NgxValidityOn}`   
  Optional. Default: `NgxValidityOn.touched`.
- Properties:
  - `validity$: Observable<NgxValidity> `

### Directive `NgxControlInvalidClassDirective`

A directive to add/remove a css class indicating that the control is invalid.

- Selector: `[ngxControlInvalidClass]`
- Inputs:
  - `ngxControlInvalidClass: string`   
  Optional. The css class. Default: `'is-invalid'`.


### Directive `NgxControlValidClassDirective`

A directive to add/remove a css class indicating that the control is valid.

- Selector: `[ngxControlValidClass]`
- Inputs:
  - `ngxControlValidClass: string`   
  Optional. The css class. Default: `'is-valid'`.

### Component `NgxControlErrorComponent`

A component that shows an error message when appropriate.

- Selector: `ngx-control-error`
- Inputs:
  - `key: string | string[]`  
  Required. The error key (or keys).
  - `containerClass: string`   
  Optional. The css class.  Default: `'invalid-feedback d-block'`.

### Component `NgxControlSuccessComponent`

A component that shows a success message when appropriate.

- Selector: `ngx-control-success`
- Inputs:
  - `containerClass: string`   
  Optional. The css class.  Default: `'valid-feedback d-block'`.

### Component `NgxControlPendingComponent`

A component that shows a pending message when appropriate.

- Selector: `ngx-control-pending`
- Inputs:
  - `containerClass: string`   
  Optional. The css class.  Default: `'pending-feedback text-muted small'`. 



## Development

See the [README](https://github.com/nowzoo/ngx) at the root of the repo for info on installation and testing.