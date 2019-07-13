# @nowzoo/ngx-bootstrap-modal

A minimal library for implementing Bootstrap 4 modals in Angular. The library depends on the native Bootstrap and jQuery code.



## Quick Start

Install the library and its dependencies...

```bash
npm i -S @nowzoo/ngx-bootstrap-modal jquery popper.js bootstrap
```

Include the Boostrap dependencies in some way in your build, for example via `angular.json`...

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
  "node_modules/jquery/dist/jquery.slim.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
],
```

**Note:** In the above example we use `bootstrap.bundle.min.js`, which includes `popper.js`. If you don't use the bundle version you have to install and add `popper.js`.

Import the module...
```ts
//...
import { NgxBootstrapModalModule } from '@nowzoo/ngx-bootstrap-modal';

@NgModule({
  imports: [
    NgxBootstrapModalModule
    //...
  ]
  //...
})
export class MyModule { }
```

The modals are built from native Bootstrap markup contained in an `<ng-template></ng-template>`. All the modal options and behaviors are controlled solely via this markup. Example component html...

```html
<ng-template #myModal>
  <!-- remove .fade to get rid of animation-->
  <div class="modal fade" tabindex="-1" role="dialog" [attr.aria-labelledby]="id + 'modal-title'">
    <!-- control the size and centering by adding classes to .modal-dialog -->
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form [formGroup]="fg" (ngSubmit)="submit()">
          <div class="modal-header">
            <!-- don't forget to add ids and aria-attributes for accessibility -->
            <h5 class="modal-title" [attr.id]="id + 'modal-title'">
              Enter Your Name
            </h5>
            <!-- the native bootstrap  data-dismiss="modal" works as intended -->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label [attr.for]="id + 'name'">Your Name</label>
              <input
                [attr.id]="id + 'name'"
                type="text"
                class="form-control"
                placeholder="Your Name"
                formControlName="name">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="submit"
              class="btn"
              [class.btn-success]="fg.valid"
              [class.btn-secondary]="fg.invalid"
              [disabled]="fg.invalid || submitting">
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</ng-template>
```
To show the modal, first inject the `NgxBootstrapModalService` into your component and grab a reference to the `<ng-template>` containing the modal markup with `ViewChild`. Then show the modal with the service's `show(templateRef)` method...

```ts
import { ViewChild, TemplateRef } from '@angular/core';
import { NgxBootstrapModalService, INgxBootstrapModalInstance } from '@nowzoo/ngx-bootstrap-modal';

export class MyComponent {
  // grabs the <ng-template #myModal> from the component template
  @ViewChild('myModal') modalTemplate: TemplateRef<any>;
  modalInstance: INgxBootstrapModalInstance = null;
  // accessibility...
  id = 'some-unique-id';
  constructor(
    private modalService: NgxBootstrapModalService
  ) { }

  show() {
    this.modalInstance = this.modalService.show(this.modalTemplate);
    this.modalInstance.shown.then(() => {
      // maybe focus something...
    });
    this.modalInstance.hidden.then(() => {
      // do stuff based on what's just happened in the modal...
      this.modalInstance = null;
    })
  }
}
```

## API

```ts
class NgxBootstrapModalService {
  show(templateRef: TemplateRef<any>): INgxBootstrapModalInstance
}

interface INgxBootstrapModalInstance {
  // The modal element, useful for focusing fields within it.
  modalEl: HTMLElement;
  // Resolves when the modal has been completely shown.
  shown: Promise<void>;
  // Resolves when the modal has been completely hidden.
  hidden: Promise<void>;
  // An observable of the modal's native Bootstrap events.
  events: Observable<Event>;
  // Hide the modal.
  hide: () => Promise<void>;
  // Use this to update the modal's positioning when it's likely that the content has changed its height.
  handleUpdate: () => void;
}
```

## Development

Contributions are welcome. 

```bash
git clone https://github.com/nowzoo/ngx.git
npm i
```

The library code is located in `projects/ngx-bootstrap-modal`.

To run tests:
  - `ng test ngx-date-time`
  - or use the `wallaby.js` file at `projects/ngx-bootstrap-modal/wallaby.js`

Build the library with `ng build ngx-bootstrap-modal`.




## License

MIT
