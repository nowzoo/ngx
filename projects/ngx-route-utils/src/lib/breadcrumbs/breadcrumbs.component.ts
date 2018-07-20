import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxRouteBreadcrumbsService, INgxRouteBreadcrumb } from './breadcrumbs.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'ngx-route-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class NgxRouteBreadcrumbsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  breadcrumbs: INgxRouteBreadcrumb[] = [];
  constructor(private service: NgxRouteBreadcrumbsService) { }
  ngOnInit() {
    this.service.breadcrumbs.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(b => this.breadcrumbs = b);
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
