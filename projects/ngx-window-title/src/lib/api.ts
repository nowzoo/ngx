import { TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


export enum WindowTitleContext {
  app = 'app',
  route = 'route'
}

export interface IWindowTitle  {
  templateRef: TemplateRef<any>;
  route: ActivatedRoute;
  url: string[];
  context: WindowTitleContext;
}

