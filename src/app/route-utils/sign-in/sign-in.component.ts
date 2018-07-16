import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgxSignInRedirectService } from '@nowzoo/ngx-route-utils';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private redirectService: NgxSignInRedirectService
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signIn();
    this.redirectService.redirectOnSignIn('/route-utils');
  }

}
