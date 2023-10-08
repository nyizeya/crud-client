import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, coursesUrl } from 'src/app/enviroment/enviroment';
import { Response } from 'src/app/models/dto/response.model';
import { CourseRequest } from '../state/course.actions';
import { Course } from 'src/app/models/dto/course.model';
import { CourseUpdateRequest } from 'src/app/models/reqeust_dto/course/course.update.model';
import { CourseRegistrationRequest } from 'src/app/models/reqeust_dto/course/course.registration.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _baseUrl = `${baseUrl}/${coursesUrl}`;

  constructor(private _http: HttpClient) { }

  getAllCourse(courseRequest: CourseRequest): Observable<Response<Course>> {
    console.log('inside getAllCourseService()');

    let params = new HttpParams();
    params.append('name', courseRequest.name ?? '');
    params.append('level', courseRequest.level ?? '');
    params.append('pageNumber', courseRequest.pageNumber ?? 1);
    params.append('size', courseRequest.size ?? 5);

    return this._http.get<Response<Course>>(this._baseUrl, {params: params})
  }

  getCoursesByInstructor(id: number): Observable<Response<Course>> {
    console.log('getting courses by instructor ', id);

    console.log(`${this._baseUrl}/instructor/${id}`);

    return this._http.get<Response<Course>>(`${this._baseUrl}/instructor/${id}`);
  }

  getCourseById(id: number): Observable<Response<Course>> {
    return this._http.get<Response<Course>>(`${this._baseUrl}/${id}`);
  }

  updateCourse(request: CourseUpdateRequest): Observable<Response<Course>> {
    console.log('updateCourse service ', request);

    return this._http.put<Response<Course>>(`${this._baseUrl}/update`, {
      id: request.id,
      name: request.name,
      description: request.description,
      level: request.level,
      instructorId: request.instructorId
    });
  }

  createCourse(request: CourseRegistrationRequest): Observable<Response<Course>> {
    return this._http.post<Response<Course>>(`${this._baseUrl}`, request);
  }

  deleteCourse(id: number): Observable<never> {
    return this._http.delete<never>(`${this._baseUrl}/delete/${id}`);
  }

}
