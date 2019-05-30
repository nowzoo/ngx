import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrumbsComponent } from './crumbs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CrumbsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CrumbsComponent]
})
export class NgxBootstrapCrumbsModule { }
