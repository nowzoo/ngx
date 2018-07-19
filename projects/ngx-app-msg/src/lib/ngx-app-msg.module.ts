import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxAppMsgComponent } from './ngx-app-msg.component';
import { NgxAppMsgService } from './ngx-app-msg.service';

@NgModule({
  imports: [
  ],
  declarations: [NgxAppMsgComponent],
  exports: [NgxAppMsgComponent]
})
export class NgxAppMsgModule {
  static forRoot(): ModuleWithProviders {
    return {ngModule: NgxAppMsgModule, providers: [NgxAppMsgService]};
  }
}
