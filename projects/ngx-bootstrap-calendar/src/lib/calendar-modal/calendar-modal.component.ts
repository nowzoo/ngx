import { Component, ViewChild, TemplateRef, Input, Output, EventEmitter} from '@angular/core';
import { NgxBootstrapModalService, INgxBootstrapModalInstance } from '@nowzoo/ngx-bootstrap-modal';

@Component({
  selector: 'ngx-bootstrap-calendar-modal',
  exportAs: 'ngxBootstrapCalendarModal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent  {
  /**
   * @ignore
   * A counter to produce unique ids.
   */
  static ct = 0;

  /**
   * @ignore
   * The unique id to be used in the template.
   */
  id = `ngx-calendar-modal-${++CalendarModalComponent.ct}`;

  /**
   * @ignore
   * Used internally to hide the modal.
   */
  modalInstance: INgxBootstrapModalInstance = null;

  @Input()
  selected: string;

  @Input()
  min: string = null;

  @Input()
  max: string = null;


  /**
   * @ignore
   * The ng-template.
   */
  @ViewChild('modal', {static: true}) modalTemplate: TemplateRef<any>;

  /**
   * The title of the modal.
   */
  @Input() title = 'Choose Date';

  /**
   * Emitted when the user selects a day. A string in `YYYY-MM-DD` format.
   */
  @Output() selectedChange: EventEmitter<string> = new EventEmitter();

  constructor(
    private _modalService: NgxBootstrapModalService
  ) { }

  /**
   * @ignore
   * Used internally.
   */
  get modalService(): NgxBootstrapModalService {
    return this._modalService;
  }


  show() {
    this.modalInstance = this.modalService.show(this.modalTemplate);
  }

  /**
   * @ignore
   * The template uses this to select a date. Closes the modal.
   */
  setSelected(s: string) {
    this.selected = s;
    this.modalInstance.hide();
    this.selectedChange.emit(this.selected);
  }

  /**
   * @ignore
   * Update the modal height / scrolling when the month (therefore possibly the number of weeks) changes.
   */
  onMonthChanged() {
    if (this.modalInstance) {
      this.modalInstance.handleUpdate();
    }
  }
}
