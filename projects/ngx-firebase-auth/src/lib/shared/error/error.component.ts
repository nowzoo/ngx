import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-firebase-auth-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() error: any;
}
