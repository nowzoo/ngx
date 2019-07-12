import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NgxBootstrapPopupModule, NGX_BOOTSTRAP_POPUP_OPTIONS } from '@nowzoo/ngx-bootstrap-popup';
import { PopupsComponent } from './popups.component';
import { PopoverTemplatesComponent } from './popover-templates/popover-templates.component';
import { PopoverBasicComponent } from './popover-basic/popover-basic.component';
import { TooltipBasicComponent } from './tooltip-basic/tooltip-basic.component';
import { TooltipTemplateComponent } from './tooltip-template/tooltip-template.component';


const routes: Routes = [
  { path: '', component: PopupsComponent }
];

@NgModule({
  declarations: [PopupsComponent, PopoverTemplatesComponent, PopoverBasicComponent, TooltipBasicComponent, TooltipTemplateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxBootstrapPopupModule
  ],
  providers: [
    { provide: NGX_BOOTSTRAP_POPUP_OPTIONS, useValue: {container: 'body'} }
  ]
})
export class PopupsModule { }
