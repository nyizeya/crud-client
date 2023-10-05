import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseService } from "../services/course.service";
import * as courseActions from "./course.actions";
import { catchError, map, mergeMap, of, timeout } from "rxjs";
import { Response } from "src/app/models/dto/response.model";
import { Course } from "src/app/models/dto/course.model";
import { HttpErrorResponse } from "@angular/common/http";
import { CourseUpdateRequest } from "src/app/models/reqeust_dto/course/course.update.model";

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

                        let message = '';
                        
                        if (response instanceof HttpErrorResponse) {
                            message = response.error.error ?? 'Error While Getting Course List Loaded';
                        } else {
                            message = response.error ?? 'An Unknown Error Occurred';
                        }
                        
                        return of(courseActions.getAllCourseFail({message}));
                        // return of(courseActions.getAllCourseFail({message: response.error ?? 'An Unknown Error Occurred'}));

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
                            return of(courseActions.getCoursesByInstructorFail({message: res.error.error ?? 'Error Getting Courses By Instructor Loaded.'})) 
                        }

                        return of(courseActions.getCoursesByInstructorFail({message: res.error ?? 'An Unknown Error Occurrred'}))
                    })
                )
            })
        )
    });

    getSingleCourse$ = createEffect(() => {
        return this._actions.pipe(
            ofType(courseActions.getSingleCourseStart),
            mergeMap((action: {id: number}) => {
                return this._courseService.getCourseById(action.id).pipe(
                    map((res: Response<Course>) => {
                        return courseActions.getSingleCourseSuccess(res);
                    }),
                    catchError((res: Response<Course> | HttpErrorResponse) => {
                        if (res instanceof HttpErrorResponse) {
                            return of(courseActions.getSingleCourseFail({message: res.error.error ?? 'Unknown Error Occurred'}))
                        }

                        return of(courseActions.getSingleCourseFail({message: res.error ?? 'Unknown Error Occurred'}));
                    })
                )
            })
        )
    });

    updateCourse$ = createEffect(() => {
        return this._actions.pipe(
            ofType(courseActions.courseUpdateStart),
            mergeMap((action: CourseUpdateRequest) => {
                return this._courseService.updateCourse(action).pipe(
                    map((res: Response<Course>) => {
                        console.log('course update success ', res);
                        return courseActions.courseUpdateSuccess(res);
                    }),
                    catchError((res: Response<Course> | HttpErrorResponse) => {
                        console.log('course update fail ', res);
                        
                        let message = '';

                        if (res instanceof HttpErrorResponse) {
                            message = res.error.error ?? 'Unknown Error Occurred'
                        }

                        message = res.error ?? 'Unknown Error Occurred';

                        return of(courseActions.courseUpdateFail({message}));
                    })
                )
            })
        )
    })

}