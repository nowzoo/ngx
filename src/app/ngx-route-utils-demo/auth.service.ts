import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  get signedIn(): Observable<boolean> {
    return this.signedIn$.asObservable();
  }
  signOut() {
    this.signedIn$.next(false);
  }
  signIn() {
    this.signedIn$.next(true);
  }
}
