# @nowzoo/ngx-app-msg

Message service and component for Angular 6 apps

[Demo Site](https://nowzoo.github.io/ngx/ngx-app-msg) | [Demo Code](https://github.com/nowzoo/ngx/tree/master/src/app/ngx-app-msg)

## Install
```bash
npm i @nowzoo/ngx-app-msg --save
```



## Quick Start

### Import the module
Import the module into your app, calling `NgxAppMsgModule.forRoot()`.

```ts
// app.module.ts...
import { NgxAppMsgModule } from '@nowzoo/ngx-app-msg';
// ...
@NgModule({
  imports: [
    //...
    NgxAppMsgModule.forRoot()
  ]
})
export class AppModule { }
```

### Place the `NgxAppMsgComponent` in your app component
Put `<ngx-app-msg></ngx-app-msg>` somewhere.
```html
<!-- app.component.html -->
<router-outlet></router-outlet>
<ngx-app-msg></ngx-app-msg>
```

### Use `NgxAppMsgService` to show messages
```ts
import { NgxAppMsgService } from '@nowzoo/ngx-app-msg';
//...
export class SomeComponent {
  constructor(
    private msg: NgxAppMsgService
  ) { }

  show() {
    this.msg.wait('Doing something time consuming...');
    setTimeout(() => {
      this.msg.success('Done!');
    }, 2000);
  }

}
```

## API

### Type: `NgxAppMsgContext`

````ts
'wait' | 'warn' | 'success'
````

### Interface: `INgxAppMsg`

```ts
  - `context: NgxAppMsgContext`
  - `message: string`
  - `autohide: boolean`
```

### Component: `NgxAppMsgComponent`
selector: `ngx-app-msg`

#### Inputs
  - `autohideAfter: number` How long to wait, in ms, to hide success and warning messages. 

### Service: `NgxAppMsgService`

#### Properties
  - `messages$: Observable<INgxAppMsg>`

#### Methods
 - `wait(message: string)`
 - `warn(message: string)`
 - `success(message: string)`

## Contributing
Contributions and suggestions are welcome.

Get started...
```bash
git clone git@github.com:nowzoo/ngx.git
cd ngx
npm i
ng build ngx-app-msg --prod
```

The library code is found in `projects/ngx-app-msg`.

The demo site code is in `src/app/ngx-app-msg`.

This library was built with the Angular CLI, so...

```bash
# test the library...
ng test ngx-app-msg

# build the library...
ng build ngx-app-msg --prod

# serve the demo site locally...
ng serve
```

Note that changes to the library code **are not** automatically reflected in the locally-served demo site. You must run `ng build ngx-app-msg` whenever you make changes to the library. But the local server does watch for changes to the built library -- so you don't need to restart the server.

If you use [Wallaby](https://wallabyjs.com/) to run unit tests, select the `projects/ngx-app-msg/wallaby.js` as your config file.

## License
[MIT](https://github.com/nowzoo/ngx/projects/ngx-app-msg/blob/master/LICENSE)
