# @nowzoo/ngx-route-utils

Angular router utilities. A work in progress.

## Install
```bash
npm i @nowzoo/ngx-route-utils --save
```

## Quick Start


Import the module and call `forRoot()`...
```ts
import { NgxRouteUtilsModule } from '@nowzoo/ngx-route-utils';

@NgModule({
  imports: [
    NgxRouteUtilsModule.forRoot()
  ]
})
export class AppModule { }
```

## Route Utilities

### NgxRouteUtils
A class with static helper methods for dealing with activated routes and router state.

#### API
- `urlFromRoute(route: ActivatedRoute | ActivatedRouteSnapshot): string` Given a route or snapshot, returns the full URL starting with `/`
- `static currentRouteSnapshots(router: Router): ActivatedRouteSnapshot[]` Returns an array of the first child route snapshots, from the root down.

## Sign In Redirect
### NgxSignInRedirectService
Stores a redirect url as a string in session storage for use once the user is signed in.

#### API
- `redirect: string|null`
- `setRedirect(val: string|ActivatedRoute|ActivatedRouteSnapshot)`
- `redirectOnSignIn(defaultRedirect = '/'): Promise<boolean>` Navigates to the stored redirect, and sets the stored redirect to null. If no stored redirect exists, navigates to `defaultRedirect`

#### Usage
```ts
export class SomeGuardedRouteComponent implements OnInit {

  constructor(
    private redirectService: NgxSignInRedirectService,
    private router: Router,
    private auth: SomeAuthService
  )
  ngOnInit() {
    if (! this.auth.signedIn) {
      this.redirectService.setRedirect(this.router.url);
      this.router.navigate(['/sign-in']);
    }
  }

}
export class SignInRouteComponent implements OnInit {

  constructor(
    private redirectService: NgxSignInRedirectService,
    private auth: SomeAuthService
  )
  submit(email, password) {
    this.auth.signIn(email, password)
      .then(() => [
        this.redirectService.redirectOnSignIn();
      ])
  }

}
```
## Window Title
### NgxWindowTitleService
Stores an application title and a route title, and sets the window title when one or both are changed.

#### API

- `appTitle: string|null` Getter/setter. On set, updates the window title.
- `routeTitle: string|null` Getter/setter. On set, updates the window title.
- `fullTitle: string` Getter. The full title, i.e.: the route title if set, the separator, the app title if set.

By default the separator string is `' | '`. You can change this in your app module by providing another string for `NGX_WINDOW_TITLE_SEPARATOR`, for example:

```ts
import { NgxWindowTitleModule, NGX_WINDOW_TITLE_SEPARATOR } from '@nowzoo/ngx-route-utils';
// etc...
@NgModule({

  imports: [
    NgxRouteUtilsModule.forRoot(),
  ],
  providers: [
    {provide: NGX_WINDOW_TITLE_SEPARATOR, useValue: ' - '}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
//
```

#### Usage

```ts
export class AppComponent implements OnInit {
  constructor(
    private windowTitleService: NgxWindowTitleService
  ) {}

  ngOnInit() {
    this.windowTitleService.appTitle = 'My App';
  }
}

export class SignInRouteComponent implements OnInit {
  constructor(
    private windowTitleService: NgxWindowTitleService
  ) {}

  ngOnInit() {
    this.windowTitleService.routeTitle = 'Sign In';
    // window title is now "Sign In | My App"
  }
}
```
## Breadcrumbs
### NgxRouteBreadcrumbsService
Stores an observable of an array of route breadcrumbs. You can use the service directly, or use the provided `NgxRouteBreadcrumbsComponent` (see below.)

#### API

- `breadcrumbs: Observable<INgxRouteBreadcrumb[]>`
- `registerBreadcrumb(route: ActivatedRoute|ActivatedRouteSnapshot, title: string)` Registers a breadcrumb.

#### Interface: `INgxRouteBreadcrumb`

- `url: string`
- `title: string`

### NgxRouteBreadcrumbsComponent

A "dumb" component that displays the current breadcrumbs in the Bootstrap breadcrumb format.

Selector: `ngx-route-breadcrumbs`

## Contributing
Contributions and suggestions are welcome.

Get started...
```bash
git clone git@github.com:nowzoo/ngx.git
cd ngx
npm i
ng build ngx-route-utils --prod
```

The library code is found in `projects/ngx-route-utils`.

The demo site code is in `src/app/ngx-route-utils`.

This library was built with the Angular CLI, so...

```bash
# test the library...
ng test ngx-route-utils

# build the library...
ng build ngx-route-utils --prod

# serve the demo site locally...
ng serve
```

Note that changes to the library code **are not** automatically reflected in the locally-served demo site. You must run `ng build ngx-route-utils` whenever you make changes to the library. But the local server does watch for changes to the built library -- so you don't need to restart the server.

If you use [Wallaby](https://wallabyjs.com/) to run unit tests, select the `projects/ngx-route-utils/wallaby.js` as your config file.

## License
[MIT](https://github.com/nowzoo/ngx/projects/ngx-route-utils/blob/master/LICENSE)
