import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxBootstrapPopupModule } from 'projects/ngx-bootstrap-popup/src/public-api';
import { PopupsComponent } from './popups.component';
import { PopoverTemplatesComponent } from './popover-templates/popover-templates.component';
import { PopoverBasicComponent } from './popover-basic/popover-basic.component';


const routes: Routes = [
  { path: '', component: PopupsComponent }
];

@NgModule({
  declarations: [PopupsComponent, PopoverTemplatesComponent, PopoverBasicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxBootstrapPopupModule
  ]
})
export class PopupsModule { }
