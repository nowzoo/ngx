import { OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { takeUntil } from 'rxjs/operators';

export abstract class BaseComponent implements OnInit, OnDestroy {
  protected _unsub: Subject<void> = new Subject();
  user: User;

  constructor(
    private _afAuth: AngularFireAuth
  ) {}

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  get authState(): Observable<User> {
    return this._afAuth.authState;
  }

  ngOnInit() {
    this.authState.pipe(takeUntil(this._unsub)).subscribe(v => this.user = v);
  }

  ngOnDestroy() {
    this._unsub.next();
    this._unsub.complete();
  }


}
