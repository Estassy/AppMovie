import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient)
  URL = 'http://localhost:9000/api/login'
  loggedIn: boolean = false
  username!: string

  constructor() {
    const storedUsername = localStorage.getItem('username');
  }

  login(username: string, password: string): Observable<any> {
    const body = {
      login: username,
      password: password
    }
    return this.http.post<any>(this.URL, body).pipe(
      tap((res: any) => {
        console.log('JE PASSE', res)
        if (res !== null) {
          //localStorage.setItem('username', res.username)
          this.setLoggedIn(res.username)
        } else {
          console.log('JE PASSE encore', res)
          throw new Error('incorrect')
        }
      })
    );
  }

  getUsername(): string {
    return this.username
  }

  logout() {
    this.loggedIn = false
    this.username = ''
    localStorage.removeItem('username')
  }

  isLoggedIn(): boolean {
    console.log(this.loggedIn)
    return this.loggedIn
  }
  setLoggedIn(username: string): void {
    this.loggedIn = true
    this.username = username
    localStorage.setItem('username', username)
  }

}
