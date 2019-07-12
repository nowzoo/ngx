import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'bootstrap-calendar',
    loadChildren: () => import('./bootstrap-calendar/bootstrap-calendar.module')
      .then(mod => mod.BootstrapCalendarModule)
  },
  {
    path: 'popups',
    loadChildren: () => import('./popups/popups.module').then(mod => mod.PopupsModule)
  },
  {
    path: 'date-time',
    loadChildren: () => import('./date-time/date-time.module').then(mod => mod.DateTimeModule)
  },
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(mod => mod.IndexModule)
  }
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
