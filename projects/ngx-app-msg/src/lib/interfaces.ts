export type NgxAppMsgContext = 'wait' | 'warn' | 'success';
export interface INgxAppMsg {
  context: NgxAppMsgContext;
  message: string;
  autohide: boolean;
}
