import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-route-utils-route',
  templateUrl: './route-utils-route.component.html',
  styleUrls: ['./route-utils-route.component.css']
})
export class RouteUtilsRouteComponent implements OnInit {

  constructor( public auth: AuthService) { }

  ngOnInit() {
  }

}
