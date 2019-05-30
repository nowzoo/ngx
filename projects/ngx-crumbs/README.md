# @nowzoo/ngx-crumbs

Declarative, directive-based breadcrumbs for Angular.

## Getting Started

```bash 
npm i -S @nowzoo/ngx-crumbs
```

Import the module into the module where you want to begin tracking breadcrumbs. In most cases this should probably be the top level `AppModule` module, but suit yourself.
```ts
import { NgxCrumbsModule } from '@nowzoo/ngx-crumbs';
@NgModule({
  imports: [
    NgxCrumbsModule.forRoot(),
    //...
  ],
  //...
})
export class AppModule { }
```

Place breadcrumbs in your route components' html...

```html
<ng-template ngxCrumb title="Options">Options</ng-template>
```

These can be dynamic...
```html
<ng-template ngxCrumb [title]="foo.title + ' Home'">{{foo.title}}</ng-template>
```

They can also contain HTML...

```html
<ng-template ngxCrumb title="Home"><i class="fas fa-home"></i></ng-template>
```

The currently active breadcrumbs are available as an `Observable<ICrumb>` from the `NgxCrumbsService.breadcrumbs$` property. How you actually display the breadcrumbs is up to you. You can roll your own componenet, or use the Bootstrap 4 breadcrumbs component provided in a separate module, `NgxBootstrapCrumbsModule`:

```ts
import { NgxCrumbsModule } from '@nowzoo/ngx-crumbs';
import { NgxBootstrapCrumbsModule } from '@nowzoo/ngx-crumbs';
@NgModule({
  imports: [
    NgxCrumbsModule.forRoot(),
    NgxBootstrapCrumbsModule
  ]
})
```

```html
<!-- component template -->
<ngx-bootstrap-crumbs></ngx-bootstrap-crumbs>
```

## Public API

### Interface `ICrumb`

 - `templateRef: TemplateRef<any>` The template reference to which the directive belongs. Use this to output the HTML for the breadcrumb.
 - `route: ActivatedRoute` The route in which the `CrumbDirective` appeared.
 - `url: string[]` The full Angular "routerLink" of the breadcrumb as an array, starting at the root with `'/'`.
 - `title: string` The string to use as the `title` attribute.


### Service `NgxCrumbsService`

Use this to implement your breadcrumbs component, if needed.

- `crumbs$: Observable<ICrumb[]>` 

### Directive `CrumbDirective`

Place these in your routes' HTML. Note that you have to use it with an `ng-template`, like this: `<ng-template ngxCrumb title="Foo">Foo</ng-template>`.

- Selector: `[ngxCrumb]` 
- Inputs
    - `title: string` This is meant to be used for the `title` and `aria-` attributes of the links.


### Component `CrumbsComponent`

The Bootstrap 4 component. Remember that this is provided in the separate `NgxBootstrapCrumbsModule`.

- Selector: `ngx-bootstrap-crumbs`


## Development

See the [README](https://github.com/nowzoo/ngx) at the root of the repo for info on installation and testing.