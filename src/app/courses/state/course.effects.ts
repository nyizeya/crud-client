import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseService } from "../services/course.service";
import * as courseActions from "./course.actions";
import { catchError, map, mergeMap, of, timeout } from "rxjs";
import { Response } from "src/app/models/dto/response.model";
import { Course } from "src/app/models/dto/course.model";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CourseEffects {

    constructor(private _actions: Actions, private _courseService: CourseService) {}

    getCourses$ = createEffect(() => {
        return this._actions.pipe(
            ofType(courseActions.getAllCourseStart),
            mergeMap((action: courseActions.CourseRequest) => {
                return this._courseService.getAllCourse(action).pipe(
                    timeout(3000),
                    map((data: Response<Course>) => {
                        console.log('success: ', data);
                        
                        return courseActions.getAllCourseSuccess(data);
                    }),
                    catchError((response: Response<Course> | HttpErrorResponse) => {
                        console.log('inside catchError() for getAllCoursesFail()');
                        console.log(response);
                        
                        if (response instanceof HttpErrorResponse) {
                            return of(courseActions.getAllCourseFail({message: 'Error While Getting Course List Loaded'}));
                        }
                        
                        return of(courseActions.getAllCourseFail({message: response.error ?? 'An Unknown Error Occurred'}));

                    })
                )
            })
        )
    });

    getCoursesByInstructors$ = createEffect(() => {
        return this._actions.pipe(
            ofType(courseActions.getCoursesByInstructorStart),
            mergeMap((action: {id: number}) => {
                return this._courseService.getCoursesByInstructor(action.id).pipe(
                    timeout(3000),
                    map((data: Response<Course>) => {
                        console.log('success courses by instructor ', data.data);
                        
                        return courseActions.getCoursesByInstructorSuccess(data);
                    }),
                    catchError((res: Response<Course> | HttpErrorResponse) => {
                        console.log('error getting courses by instructor id ', res);

                        if (res instanceof HttpErrorResponse) {
                            return of(courseActions.getCoursesByInstructorFail({message: 'Error Getting Courses By Instructor Loaded.'})) 
                        }

                        return of(courseActions.getCoursesByInstructorFail({message: res.error ?? 'An Unknown Error Occurrred'}))
                    })
                )
            })
        )
    })

}