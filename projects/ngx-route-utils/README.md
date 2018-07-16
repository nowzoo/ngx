# ngx-route-utils

Angular router utilities. A work in progress.

## Quick Start
```bash
npm i --save @nowzoo/ngx-route-utils
```

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

      ])
  }

}
```

## License
[MIT](https://github.com/nowzoo/ngx/blob/master/projects/ngx-route-utils/README.md)
