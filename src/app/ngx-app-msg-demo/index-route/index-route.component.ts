import { Component, OnInit } from '@angular/core';
import { NgxAppMsgService } from '@nowzoo/ngx-app-msg';
@Component({
  selector: 'app-index-route',
  templateUrl: './index-route.component.html',
  styleUrls: ['./index-route.component.scss']
})
export class IndexRouteComponent implements OnInit {

  constructor( public service: NgxAppMsgService) { }

  ngOnInit() {
  }

}
