import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-container-route',
  templateUrl: './container-route.component.html',
  styleUrls: ['./container-route.component.scss']
})
export class ContainerRouteComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
