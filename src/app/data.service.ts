import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http: HttpClient = inject(HttpClient)
  KEY = '7067f6a6'
  BASE_URL = 'https://www.omdbapi.com/'

  constructor() {}

  getMovies(title: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}?s=${title}&apikey=${this.KEY}`).pipe(
      catchError(this.handleError)
    )
  }

  getMovieById(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}?i=${id}&apikey=${this.KEY}`).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: any): Observable<never> {
    console.error("An error occurred", error)
    return throwError(() => new Error('Server error; please try again later.'))
  }
}
