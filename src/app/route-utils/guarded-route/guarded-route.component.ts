import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxSignInRedirectService } from '@nowzoo/ngx-route-utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-guarded-route',
  templateUrl: './guarded-route.component.html',
  styleUrls: ['./guarded-route.component.css']
})
export class GuardedRouteComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private router: Router,
    private redirectService: NgxSignInRedirectService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.signedIn
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(val => {
        if (! val) {
          this.redirectService.redirect = this.router.url;
          this.router.navigate(['/route-utils/sign-in']);
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
