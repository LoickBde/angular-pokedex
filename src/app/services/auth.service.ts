import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../model/login-response.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly pokemonApiUrl: string = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/auth';
  private readonly ACCESS_TOKEN: string =  'access-token';
  private readonly REFRESH_TOKEN: string =  'refresh-token';

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.pokemonApiUrl}/login`, {"email": email, "password": password})
    .pipe(
      tap(result => {
        localStorage.setItem(this.ACCESS_TOKEN, result.access_token);
        localStorage.setItem(this.REFRESH_TOKEN, result.access_token);
      }),
      catchError(this.handleError<LoginResponse>('login', undefined))
    );
  }

  public logout(): void {
      localStorage.removeItem(this.ACCESS_TOKEN);
      localStorage.removeItem(this.REFRESH_TOKEN);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(this.ACCESS_TOKEN) == null ? false : true;
  }

  public getAcessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  // public refreshToken(): void {
  //     this.http.post<LoginResponse>(`${this.pokemonApiUrl}/refresh`, {"refresh_token" : localStorage.getItem(this.REFRESH_TOKEN)})
  //   .pipe(
  //     tap(result => {
  //       localStorage.setItem(this.ACCESS_TOKEN, result.access_token);
  //       localStorage.setItem(this.REFRESH_TOKEN, result.access_token);
  //     }),
  //     catchError(this.handleError<LoginResponse>('refresh', undefined))
  //   );
  // }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
