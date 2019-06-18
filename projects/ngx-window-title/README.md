# @nowzoo/ngx-window-title

Declarative, directive-based window titles for Angular.

## Getting Started

Install the library and its dependencies...
```bash 
npm i -S @nowzoo/ngx-window-title @angular/cdk  @nowzoo/ngx-route-utils
```

Import the module into the module where you want to begin creating window titles. In most cases this should probably be the top level `AppModule` module, but suit yourself.
```ts
import { NgxWindowTitleModule } from '@nowzoo/ngx-window-title';
@NgModule({
  imports: [
    NgxWindowTitleModule.forRoot(),
    //...
  ],
  //...
})
export class AppModule { }
```


First, add a `WindowTitleComponent` in your root component's HTML. This component is hidden. It handles updating the window title based on the templates that show up later in your routes.

```html
<!-- app.component.html -->
<ngx-window-title></ngx-window-title>
```
Then, place window title directives in your route components' html. There are two "contexts" --
`app` and `route`; corresponding to the position in the title. By default, the `route` title comes first. You **must** pass one of these to the directive in order for the directive to have effect. 

```html
<ng-template ngxWindowTitle="app">My Great App</ng-template>
```

```html
<!-- some subordinate route -->
<ng-template ngxWindowTitle="route">Profile</ng-template>
```

With the above, the route title would be `Profile | My Great App`.

You can add dynamic titles.
```html
<ng-template ngxWindowTitle="route">{{foo.title}}</ng-template>
```



## API

### Enum `WindowContext`

- `app = 'app'`
- `route = 'route'`

### Interface `IWindowTitle`

 - `templateRef: TemplateRef<any>` The template reference to which the directive belongs. Use this to output the HTML for the breadcrumb.
 - `route: ActivatedRoute` The route in which the `CrumbDirective` appeared.
 - `url: string[]` The full Angular "routerLink" of the breadcrumb as an array, starting at the root with `'/'`.
 - `context: WindowContext`


### Service `NgxWindowTitleService`
Use this to implement your own method of updating the window title if you don't want to use `WindowTitleComponent`.
- `windowTitles$: Observable<IWindowTitle[]>` 

### Directive `WindowTitleDirective`

Place these in your routes' HTML. Note that you have to use the directive with an `ng-template`, like this: `<ng-template ngxWindowTitle context="app>Foo</ng-template>`.

- Selector: `[ngxWindowTitle]` 
- Inputs
    - `ngxWindowTitle: WindowContext` Required.

### Component `WindowTitleComponent`

The hidden component that takes care of updating the title.

- Selector: `ngx-window-title`
- Inputs
    - `separator: string` Optional. Default: `' | '`
    - `appFirst: boolean` Optional. Default: `false`. If `true` the `app` route title will appear first.


## Development

See the [README](https://github.com/nowzoo/ngx) at the root of the repo for info on installation and testing.