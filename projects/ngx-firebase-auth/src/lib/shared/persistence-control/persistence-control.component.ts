import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl } from '@angular/forms';
import { auth } from 'firebase/app';
import { StorageHelper } from '../../storage-helper';


@Component({
  selector: 'ngx-firebase-auth-persistence-control',
  templateUrl: './persistence-control.component.html',
  styleUrls: ['./persistence-control.component.scss']
})
export class PersistenceControlComponent implements OnInit {

  id = 'ngx-firebase-auth-persistence-control';
  fc: FormControl;
  constructor(
    private _afAuth: AngularFireAuth
  ) { }




  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  ngOnInit() {
    this.fc = new FormControl(StorageHelper.getSavedPersistence());
    this.fc.valueChanges.subscribe(() => {
      this.update();
    });
  }

  async update() {
    const persistence = this.fc.value ? auth.Auth.Persistence.LOCAL : auth.Auth.Persistence.SESSION;
    await this.auth.setPersistence(persistence);
    StorageHelper.savePersistence(this.fc.value);
  }



}
