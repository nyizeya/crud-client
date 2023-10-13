import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, timeout } from "rxjs";
import { InstructorService } from "../service/instructor.service";
import { Response } from "src/app/models/dto/response.model";
import { Instructor } from "src/app/models/dto/instructor.model";
import { editInstructorActionFail, editInstructorActionStart, editInstructorActionSuccess, getAllInstructorFail, getAllInstructorStart, getAllInstructorSuccess, getInstructorByIdFail, getInstructorByIdStart, getInstructorByIdSuccess } from "./instructors.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { InstructorUpdateRequest } from "src/app/models/reqeust_dto/instructor/instructor.update.model";

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
                            return of(getAllInstructorFail({message: res.error.error ?? 'Error Getting Instructors Loaded'}))
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
                            return of(getInstructorByIdFail({message: res.error.error ?? 'Error Getting Single Instructor Loaded'}))
                        }
                        return of(getInstructorByIdFail({message: res.error ?? 'An Unknown Error'}))
                    })
                )
            })
        )
    });

    updateInstructor$ = createEffect(() => {
        return this._actions.pipe(
            ofType(editInstructorActionStart),
            mergeMap((action: InstructorUpdateRequest) => {
                return this._instructorService.updateInstructor(action).pipe(
                    map((res: Response<Instructor>) => {
                        console.log('instructor update success');
                        return editInstructorActionSuccess(res);
                    }),
                    catchError((res: Response<Instructor> | HttpErrorResponse) => {
                        console.log('instructor update fail ', res);
                        let message = '';

                        if (res instanceof HttpErrorResponse) {
                            message = res.error.error;
                        } else {
                            message = res.error!
                        }

                        return of(editInstructorActionFail({message}));
                        
                    })
                )
            })
        )
    })

}