import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgxSignInRedirectService } from '@nowzoo/ngx-route-utils';

@Component({
  selector: 'app-sign-in-route',
  templateUrl: './sign-in-route.component.html',
  styleUrls: ['./sign-in-route.component.scss']
})
export class SignInRouteComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private redirectService: NgxSignInRedirectService
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signIn();
    this.redirectService.redirectOnSignIn('/ngx-route-utils/ngx-sign-in-redirect-service');
  }

}
