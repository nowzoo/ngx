import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-firebase-auth-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
  @Input() header: string;
}
