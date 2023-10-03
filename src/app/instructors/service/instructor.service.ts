import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { baseUrl, instructorsUrl } from '../../enviroment/enviroment';
import { Response } from '../../models/dto/response.model';
import { Instructor } from '../../models/dto/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private _baseUrl = `${baseUrl}/${instructorsUrl}`;

  constructor(private _http: HttpClient) { }

  getAllInstructors(): Observable<Response<Instructor>> {
    console.log('inside get all instructor service');
    
    this._http.get<Response<Instructor>>(this._baseUrl).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        
      }
    })

    return this._http.get<Response<Instructor>>(this._baseUrl);
  }
  
}
