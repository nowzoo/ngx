import { Component } from '@angular/core';
import { NgxCrumbsService } from '../ngx-crumbs.service';
import { Observable } from 'rxjs';
import { ICrumb } from '../api';

@Component({
  selector: 'ngx-bootstrap-crumbs',
  templateUrl: './crumbs.component.html',
  styleUrls: ['./crumbs.component.scss']
})
export class CrumbsComponent {
  constructor(
    private _service: NgxCrumbsService
  ) { }

  get crumbs$(): Observable<ICrumb[]> {
    return this._service.crumbs$;
  }


}
