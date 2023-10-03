import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseService } from "../services/course.service";
import { CourseRequest, getAllCourseFail, getAllCourseStart, getAllCourseSuccess, getSingleCourseFail, getSingleCourseStart, getSingleCourseSuccess } from "./course.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Response } from "src/app/models/dto/response.model";
import { Course } from "src/app/models/dto/course.model";

@Injectable()
export class CourseEffects {

    constructor(private _actions: Actions, private _courseService: CourseService) {}

    getCourses$ = createEffect(() => {
        return this._actions.pipe(
            ofType(getAllCourseStart),
            mergeMap((action: CourseRequest) => {
                return this._courseService.getAllCourse(action).pipe(
                    map((data: Response<Course>) => {
                        console.log('success: ', data);
                        
                        return getAllCourseSuccess(data);
                    }),
                    catchError((response: Response<Course>) => {
                        console.log('inside catchError() for getAllCoursesFail()');
                        console.log(response);
                        
                        return of(getAllCourseFail({message: response.error ?? 'An Unknown Error Occurred'}));
                    })
                )
            })
        )
    });

}