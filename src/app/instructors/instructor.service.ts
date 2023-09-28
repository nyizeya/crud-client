import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from "rxjs";
import { baseUrl, instructorsUrl } from '../enviroment/enviroment';
import { Response } from '../models/dto/response.model';
import { Instructor } from '../models/dto/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private _baseUrl = `${baseUrl}/${instructorsUrl}`;

  constructor(private _http: HttpClient) { }

  getAllInstructors(name: string = ''): Observable<Response<Instructor>> {
    return this._http.get<Response<Instructor>>(this._baseUrl, {
      params: new HttpParams()
      .set('name', name)
    }).pipe(
      catchError(this._handleError)
    )
  }

  private _handleError(errorResponse: Response<any>) {
    let errorMessage = 'An Error Occurred!';

    if (!errorResponse.error) {
      return throwError(errorMessage);
    }
    
    return throwError(errorResponse.error);
  }
  
}
