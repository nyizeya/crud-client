import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { baseUrl, authUrl } from 'src/app/enviroment/enviroment';
import { Instructor } from 'src/app/models/dto/instructor.model';
import { Response } from 'src/app/models/dto/response.model';
import { Token } from 'src/app/models/dto/token.model';
import { LoginRequest } from 'src/app/models/reqeust_dto/auth/login.request';
import { InstructorRegistrationRequest } from 'src/app/models/reqeust_dto/instructor/instructor.registration.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  authBaseUrl = `${baseUrl}/${authUrl}`;
  currentUser$: BehaviorSubject<Instructor | null | undefined> = new BehaviorSubject<Instructor | null | undefined>(undefined);

  constructor(
    private _http: HttpClient) { }

  ngOnInit(): void {
    
  }

  login(request: LoginRequest): Observable<Response<Token>> {
    return this._http.post<Response<Token>>(`${this.authBaseUrl}/authenticate`, request)
  }

  register(request: InstructorRegistrationRequest): Observable<Response<Instructor>> {
    return this._http.post<Response<Instructor>>(`${this.authBaseUrl}/register`, request);
  }

  logout(): Observable<void> {
    console.log('inside logout() service');
    
    localStorage.removeItem('token');
    return of<void>(undefined);
  }

  isTokenValid(): Observable<boolean> {
    return this._http.post<boolean>(`${this.authBaseUrl}/check-token`, {});
  }

  getCurrentUser(token: string): Observable<Instructor | null> {
    return this._http.get<Instructor>(`${this.authBaseUrl}/current-user`, {
      params: new HttpParams().set('token', token)
    });
  }

  setCurrentUser(instructor: Instructor | null): void {
    this.currentUser$.next(instructor);
  }

}
