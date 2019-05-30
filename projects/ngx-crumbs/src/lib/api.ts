import { TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export enum WindowTitleContext {
  app = 'app',
  route = 'route'
}
export interface IRecord {
  templateRef: TemplateRef<any>;
  route: ActivatedRoute;
  url: string[];
}
export interface ICrumb extends IRecord {
  title: string;
}

export interface IWindowTitle extends IRecord {
  context: WindowTitleContext;
}


