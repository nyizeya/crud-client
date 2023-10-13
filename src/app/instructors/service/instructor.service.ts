import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { baseUrl, instructorsUrl } from '../../enviroment/enviroment';
import { Response } from '../../models/dto/response.model';
import { Instructor } from '../../models/dto/instructor.model';
import { InstructorUpdateRequest } from 'src/app/models/reqeust_dto/instructor/instructor.update.model';

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

  getInstrutorById(id: number): Observable<Response<Instructor>> {
    console.log('inside service instructor id ', id);
    console.log(`${this._baseUrl}/${id}`);
    
    return this._http.get<Response<Instructor>>(`${this._baseUrl}/${id}`);
  }

  updateInstructor(request: InstructorUpdateRequest): Observable<Response<Instructor>> {
    return this._http.put<Response<Instructor>>(`${this._baseUrl}/edit`, request)
  }
  
}
