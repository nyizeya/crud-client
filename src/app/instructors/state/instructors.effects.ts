import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { InstructorService } from "../service/instructor.service";
import { Response } from "src/app/models/dto/response.model";
import { Instructor } from "src/app/models/dto/instructor.model";
import { getAllInstructorFail, getAllInstructorStart, getAllInstructorSuccess } from "./instructors.actions";

@Injectable()
export class InstructorEffects {

    constructor(private _actions: Actions, private _instructorService: InstructorService) {}

    instructors$ = createEffect(() => {
        console.log('inside instructors effect()');
        
        return this._actions.pipe(
            ofType(getAllInstructorStart),
            mergeMap(action => {
                return this._instructorService.getAllInstructors().pipe(
                    map((data: Response<Instructor>) => {
                        console.log('success ', data);
                        return getAllInstructorSuccess(data);
                    }),
                    catchError((data: Response<Instructor>) => {
                        console.log('error ', data);
                        return of(getAllInstructorFail({message: data.error ?? 'Unknown Error Occurred'}))
                    })
                )
            })
        )
    })

}