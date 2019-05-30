# @nowzoo/ngx-sign-in-redirect

A service for handling sign in redirects in Angular.



## Getting Started

```bash
npm i @nowzoo/ngx-sign-in-redirect --save
```

Import the module...
```typescript
import { NgxSignInRedirectModule } from '@nowzoo/ngx-sign-in-redirect';
@NgModule({
  imports: [
    NgxSignInRedirectModule.forRoot()
  ],
})
export class AppModule { }
```



Use the service in your components...
```typescript
import { NgxSignInRedirectService } from '@nowzoo/ngx-sign-in-redirect';

export class MyGatedComponent implements OnInit {

  constructor(
    private svc: NgxSignInRedirectService,
    private auth: SomeAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (! this.auth.signedIn) {
      this.svc.redirect = '/my/gated/path';
      this.router.navigate(['/sign-in']);
    }
  }

}

export class MySignInComponent implements OnInit {

  constructor(
    private svc: NgxSignInRedirectService,
    private auth: SomeAuthService,
  ) { }

  signIn(creds: any) {
    this.auth.signIn(creds)
      .then(() => {
        this.svc.redirectOnSignIn();
      })
  }

}

```

## API


### Interface INgxSignInRedirectConfig

 - `defaultRedirect?: string` The default redirect, used when another redirect has not been set. Default `'/'`
 - `storageKey?: string` The session storage key. Default: `'ngx-sign-in-redirect'`

### const `NGX_SIGN_IN_REDIRECT_CONFIG: InjectionToken<INgxSignInRedirectConfig>`

Use this token to (optionally) provide your own config:

```ts 
import { NgxSignInRedirectModule, NGX_SIGN_IN_REDIRECT_CONFIG } from '@nowzoo/ngx-sign-in-redirect';
@NgModule({
  imports: [
    NgxSignInRedirectModule.forRoot()
  ],
  providers: [{provide: NGX_SIGN_IN_REDIRECT_CONFIG, useValue: {defaultRedirect: '/foo'}}]
})
export class AppModule { }
```

### Service `NgxSignInRedirectService`

- `setRedirect(route: ActivatedRoute|ActivatedRouteSnapshot, signInUrl?: string)`
Sets the redirect based on the passed route. If `signInUrl` is passed, the user will be redirected to that url.
- `redirectOnSignIn()` Redirects to the saved url, opr the default url if no redirect has been saved.
- `clearRedirect()` Clears the redirect. Note that this is done automatically by ``redirectOnSignIn()` (you don't have to call it yourself.)




## Development

See the [README](https://github.com/nowzoo/ngx) at the root of the repo for info on installation and testing.