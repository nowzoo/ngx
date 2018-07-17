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


## NgxSignInRedirectService
Stores a redirect url as a string in session storage for use once the user is signed in.

### API
- `redirect: string|null`
- `redirectOnSignIn(defaultRedirect = '/'): Promise<boolean>` Navigates to the stored redirect, and sets the strored redirect to null. If no stored redirect exists, navigates to `defaultRedirect`

### Usage
```ts
export class SomeGuardedRouteComponent implements OnInit {

  constructor(
    private redirectService: NgxSignInRedirectService,
    private router: Router,
    private auth: SomeAuthService
  )
  ngOnInit() {
    if (! this.auth.signedIn) {
      this.redirectService.redirect = this.router.url;
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
