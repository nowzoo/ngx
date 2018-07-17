import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxSignInRedirectService } from '@nowzoo/ngx-route-utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-guarded-route',
  templateUrl: './guarded-route.component.html',
  styleUrls: ['./guarded-route.component.scss']
})
export class GuardedRouteComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private redirectService: NgxSignInRedirectService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.signedIn
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(val => {
        if (! val) {
          this.redirectService.redirect = this.router.url;
          this.router.navigate(['../sign-in'], {relativeTo: this.route});
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
