import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Reference } from '@firebase/database';
@Component({
  selector: 'app-index-route',
  templateUrl: './index-route.component.html',
  styleUrls: ['./index-route.component.css']
})
export class IndexRouteComponent implements OnInit {

  ref: Reference;
  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase
  ) {}
  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.ref = user ? this.afDb.database.ref(`ngx-fire-demo/${user.uid}`) as Reference : null;
    });
    this.afAuth.auth.signInAnonymously();
  }

}
