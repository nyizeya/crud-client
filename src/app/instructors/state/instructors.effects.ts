import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, timeout } from "rxjs";
import { InstructorService } from "../service/instructor.service";
import { Response } from "src/app/models/dto/response.model";
import { Instructor } from "src/app/models/dto/instructor.model";
import {
  editInstructorFail,
  editInstructorStart, editInstructorSuccess,
  getAllInstructorFail,
  getAllInstructorStart,
  getAllInstructorSuccess,
  getInstructorByIdFail,
  getInstructorByIdStart,
  getInstructorByIdSuccess
} from "./instructors.actions";
import { HttpErrorResponse } from "@angular/common/http";
import {InstructorUpdateRequest} from "../../models/reqeust_dto/instructor/instructor.update.model";
import { Router } from "@angular/router";

@Injectable()
export class InstructorEffects {

    constructor(
      private _actions: Actions, 
      private _instructorService: InstructorService,
      private _router: Router
    ) {}

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
        ofType(editInstructorStart),
        mergeMap((action: InstructorUpdateRequest) =>{
          return this._instructorService.editInstructor(action).pipe(
            map((data: Response<Instructor>) => {
              console.log(data);
              
              this._router.navigate(['/instructors']);
              return editInstructorSuccess(data);
            }),
            catchError((res: Response<Instructor> | HttpErrorResponse) => {
              console.log(res);
              let message = '';
              if (res instanceof HttpErrorResponse) {
                message = res.error.error;
              } else {
                message = res.error!;
              }

              return of(editInstructorFail({message}));
            })
          )
        })
      )
    })

}
