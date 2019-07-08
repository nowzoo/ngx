import { Component, ViewChild, TemplateRef, Input} from '@angular/core';
import { NgxBootstrapModalService, INgxBootstrapModalInstance } from '@nowzoo/ngx-bootstrap-modal';

@Component({
  selector: 'ngx-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent  {
  static ct = 0;
  @ViewChild('modal', {static: true}) modalTemplate: TemplateRef<any>;
  @Input() title = 'Choose Date';
  modalInstance: INgxBootstrapModalInstance = null;
  selected: string;
  min: string = null;
  max: string = null;
  id = `ngx-calendar-modal-${++ CalendarModalComponent.ct}`;
  constructor(
    private _modalService: NgxBootstrapModalService
  ) { }

  get modalService(): NgxBootstrapModalService {
    return this._modalService;
  }

  async show(selected: string, min: string = null, max: string = null): Promise<string> {
    this.selected = selected;
    this.min = min;
    this.max = max;
    this.modalInstance = this.modalService.show(this.modalTemplate);
    await this.modalInstance.hidden;
    this.modalInstance = null;
    return this.selected;
  }

  setSelected(s: string) {
    this.selected = s;
    this.modalInstance.hide();
  }

  onMonthChanged() {
    if (this.modalInstance) {
      this.modalInstance.handleUpdate();
    }
  }
}
