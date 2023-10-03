import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, timeout } from "rxjs";
import { InstructorService } from "../service/instructor.service";
import { Response } from "src/app/models/dto/response.model";
import { Instructor } from "src/app/models/dto/instructor.model";
import { getAllInstructorFail, getAllInstructorStart, getAllInstructorSuccess, getInstructorByIdFail, getInstructorByIdStart, getInstructorByIdSuccess } from "./instructors.actions";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class InstructorEffects {

    constructor(private _actions: Actions, private _instructorService: InstructorService) {}

    instructors$ = createEffect(() => {
        console.log('inside instructors effect()');
        
        return this._actions.pipe(
            ofType(getAllInstructorStart),
            mergeMap(action => {
                return this._instructorService.getAllInstructors().pipe(
                    timeout(3000),
                    map((data: Response<Instructor>) => {
                        console.log('success ', data);
                        return getAllInstructorSuccess(data);
                    }),
                    catchError((res: Response<Instructor> | HttpErrorResponse) => {
                        console.log('error ', res);

                        if (res instanceof HttpErrorResponse) {
                            return of(getAllInstructorFail({message: 'Error Getting Instructors Loaded'}))
                        }

                        return of(getAllInstructorFail({message: res.error ?? 'Unknown Error Occurred'}))
                    })
                )
            })
        )
    });

    getInstructorById$ = createEffect(() => {
        return this._actions.pipe(
            ofType(getInstructorByIdStart),
            mergeMap((action: {id: number}) => {
                return this._instructorService.getInstrutorById(action.id).pipe(
                    timeout(3000),
                    map((data: Response<Instructor>) => {
                        console.log('single instructor: ', data.data);
                        
                        return getInstructorByIdSuccess(data);
                    }),
                    catchError((res: Response<Instructor> | HttpErrorResponse) => {
                        console.log('error getting instructor by id ', res);
                        if (res instanceof HttpErrorResponse) {
                            return of(getInstructorByIdFail({message: 'Error Getting Single Instructor Loaded'}))
                        }
                        return of(getInstructorByIdFail({message: res.error ?? 'An Unknown Error'}))
                    })
                )
            })
        )
    })

}