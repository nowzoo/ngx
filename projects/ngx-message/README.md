# @nowzoo/ngx-message

A service and component for displaying app messages.


## Getting Started

```bash
npm i @nowzoo/ngx-message --save
```

Import the module, calling `forRoot()`. This should probably be in your main `app` module.
```typescript
import { NgxMessageModule } from '@nowzoo/ngx-message';
@NgModule({
  imports: [
    NgxMessageModule.forRoot()
  ],
})
export class AppModule { }
```

Insert an instance of `NgxMessageComponent` at a high level in your app. This is intended to be a singleton.

```html
<!-- app.component.html -->
<router-outlet></router-outlet>
<ngx-message></ngx-message>
```

Use the service in components to display messages...
```typescript
import { NgxMessageService } from '@nowzoo/ngx-message';

export class MyComponent {

  constructor(
    private msgService: NgxMessageService
  ) { }

  showSuccess() {
    this.msgService.success('Hey, you are great!')
  }

  showWarning() {
    this.msgService.warn('Woops!')
  }

  showWait() {
    this.service.wait('Waiting for a while....');
    setTimeout(() => {
      this.service.success('All done!');
    }, 3000);
  }

}

```

### Component Styles

The message component styles are based on Bootstrap alerts and Font Awesome. The styles are packaged with the component. So...
 - You do not have to add Bootstrap or Font Awesome styles.
 - If you want different styling, animations, layout or icons, just extend `NgxMessageComponent` with a different template and stylesheet.

### Hiding the message

The `success` and `warn` methods automatically hide the message after `NGX_MESSAGE_HIDE_DELAY` milliseconds (by default, 3000ms). The `wait` method does not hide the message: You must hide it yourself using the `success`, `warn` or `hide` methods. You can change the hide delay by providing a different value for `NGX_MESSAGE_HIDE_DELAY`:

## API 

### Enum `NgxMessageContext`  
- `warn = 'warn'`
- `success = 'success'`
- `wait = 'wait'`

### Interface INgxMessage {
- `message: string`;
- `context: NgxMessageContext`

### Const `NGX_MESSAGE_HIDE_DELAY: InjectionToken<number>`
Optionally, use this token to set the delay in ms before hiding warning and success messsages.

```ts
import { NGX_MESSAGE_HIDE_DELAY, NgxMessageModule } from './shared';
@NgModule({
  imports: [
    NgxMessageModule.forRoot()
  ],
  providers: [
    {provide: NGX_MESSAGE_HIDE_DELAY, useValue: 1000}
  ]
})
export class AppModule { }
```

### Service `NgxMessageService`

- Properties
  - `message$: Observable<INgxMessage>`
- Methods
  - `show(message: string, context: NgxMessageContext, hide: boolean)`
  - `hide()`
  - `wait(message: string)`
  - `success(message: string)`
  - `warn(message: string)`



## Development

See the [README](https://github.com/nowzoo/ngx) at the root of the repo for info on installation and testing.
