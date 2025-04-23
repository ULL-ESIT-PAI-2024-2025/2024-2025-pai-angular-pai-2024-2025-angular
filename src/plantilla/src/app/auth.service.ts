import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
