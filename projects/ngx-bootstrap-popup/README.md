# @nowzoo/ngx-bootstrap-popup

A minimal library for implementing Bootstrap 4 popovers and tooltips 
in Angular. The library depends on native Bootstrap and jQuery code.



## Quick Start

Install the library and its dependencies...

```bash
npm i -S @nowzoo/ngx-bootstrap-popup jquery bootstrap
```

Include the dependencies in some way in your build, for example via `angular.json`...

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
  NgxBootstrapPopupModule 
} from '@nowzoo/ngx-bootstrap-popup';

@NgModule({
  //...
  imports: [
    NgxBootstrapPopupModule
  ]
})
export class MyModule { }
```

The module provides two directives, `NgxBootstrapTooltipDirective`
and `NgxBootstrapPopoverDirective`.  Both work with either plain strings or `ng-template`s.

```html
<!-- basic tooltip -->
<button class="btn btn-primary" 
  ngxBootstrapTooltip tooltipTitle="Tooltip Title as String">
  Basic Tooltip
</button>

<!-- tooltip with template-->
<button class="btn btn-primary" 
  ngxBootstrapTooltip [tooltipTitle]="tooltipTitle" 
  (tooltipEvents)="onTooltipEvent($event)">
  Tooltip from Template
</button>
<ng-template #tooltipTitle>
  <div class="d-flex justify-content-between align-items-center">
    Opened {{counter}} times.
    <span class="badge badge-primary ml-2">
      open for
      {{timer}}s
    </span>
  </div>
</ng-template>

<!-- basic popover -->
<button class="btn btn-primary" 
    ngxBootstrapPopover 
    popoverTitle="Popover Title as String" 
    popoverContent="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius repellat officiis, harum hic ea voluptate voluptatum.">
  Basic Popover
</button>

<!-- more complex popover example, with templates -->
<button class="btn btn-primary" 
    ngxBootstrapPopover [popoverTitle]="popoverTitle" 
    [popoverContent]="popoverContent"
    (popoverEvents)="onPopoverEvent($event)">
  Popover from Template
</button>
<ng-template #popoverTitle>
  <div class="d-flex justify-content-between align-items-center">
    <h5 class="m-0">
      Popover from Template
    </h5>
    
    <span class="badge badge-primary">
      {{timer}}s
    </span>
  </div>
  
  
</ng-template>
<ng-template #popoverContent>
  <p>
    Opened {{counter}} time(s).
  </p>
  <p>
    Open for {{timer}} second(s).
  </p>
  
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
    Eius repellat officiis, harum hic ea voluptate voluptatum 
    amet inventore placeat explicabo magni, ducimus provident 
    iste. Sed possimus provident ullam nostrum ea!
  </p>
  
  <p>
    <a href="#" (click)="$event.preventDefault()">Click Me</a>
  </p>
</ng-template>

```

## API

### interface IPopupOptions 
An optional object that you can pass to an individual directive or set globally by providing a value for `NGX_BOOTSTRAP_POPUP_OPTIONS`. All fields are optional, and hew to the native Bootstrap options. Also note that for most of the options you can use `data-` attributes instead.

- `animation?: boolean`
- `html?: boolean`  
Note this will always be set to true if you use templates.
- `delay?: number | {show: number, hide: number}`
- `container?: string | HTMLElement | false`
- `placement?: string | ((popupEl: HTMLElement, triggerEl: HTMLElement) => string)`
- `template?: string`
- `offset?: number | string`
- `fallbackPlacement?: string | string[]`
- `boundary?: string | HTMLElement`
- `trigger?: string`
- `sanitize?: boolean`
- `sanitizeFn?: (content: string) => string`  
Note that if you do not provide a function, the directives will use `DomSanitizer.sanitize` by default.

## const NGX_BOOTSTRAP_POPUP_OPTIONS: InjectionToken<IPopupOptions>
The injection token for providing a set of default options for all popups in a module or component. Example...

```ts
import { 
  NgxBootstrapPopupModule, 
  NGX_BOOTSTRAP_POPUP_OPTIONS 
} from '@nowzoo/ngx-bootstrap-popup';

@NgModule({
  //...
  imports: [
    NgxBootstrapPopupModule
  ],
  providers: [
    { provide: NGX_BOOTSTRAP_POPUP_OPTIONS, useValue: {container: 'body'} }
  ]
})
export class MyModule { }

```

### NgxBootstrapPopoverDirective

The directive for popovers.

- selector: `'[ngxBootstrapPopover]'`,
- exportAs: `'ngxBootstrapPopover'`
- Inputs:
  - `popoverTitle: string | TemplateRef<any>`
  - `popoverContent: string | TemplateRef<any>`
  - `popoverEnabled: boolean`  
  Optional. Default `true`.
  - `popoverDismissOnClickOutside`  
  Optional. Default `true`.
  - `popoverOptions: IPopupOptions`   
  Optional. Note that most options can also be set with `data-` attributes.
- Outputs:
  - `popoverEvents: EventEmitter<Event>`  
  The native Bootstrap events.
- Properties:
  - `bsInstance: any`  
  The native popover data provided by Bootstrap.
  - `tip: HTMLElement`  
  The HTML Element of the popover.
- Methods:
  - `show(): void`
  - `hide(): void`
  - `toggle(): void`
  - `enable(): void`
  - `disable(): void`
  - `toggleEnabled(): void`
  - `update(): void`

### NgxBootstrapTooltipDirective

The directive for tooltips.

- selector: `'[ngxBootstrapTooltip]'`,
- exportAs: `'ngxBootstrapTooltip'`
- Inputs:
  - `tooltipTitle: string | TemplateRef<any>`
  - `tooltipEnabled: boolean`  
  Optional. Default `true`.
  - `tooltipDismissOnClickOutside`  
  Optional. Default `true`.
  - `tooltipOptions: IPopupOptions`   
  Optional. Note that most options can also be set with `data-` attributes.
- Outputs:
  - `tooltipEvents: EventEmitter<Event>`  
  The native Bootstrap tooltip events.
- Properties:
  - `bsInstance: any`  
  The native tooltip data provided by Bootstrap.
  - `tip: HTMLElement`  
  The HTML Element of the tooltip.
- Methods:
  - `show(): void`
  - `hide(): void`
  - `toggle(): void`
  - `enable(): void`
  - `disable(): void`
  - `toggleEnabled(): void`
  - `update(): void`


## Development

Contributions are welcome. 

```bash
git clone https://github.com/nowzoo/ngx.git
npm i
```

The library code is located in `projects/ngx-bootstrap-popup`.

To run tests:
  - `ng test ngx-bootstrap-popup`
  - or use the `wallaby.js` file at `projects/ngx-bootstrap-popup/wallaby.js`

Build the library with `ng build ngx-bootstrap-popup`.




## License

MIT
