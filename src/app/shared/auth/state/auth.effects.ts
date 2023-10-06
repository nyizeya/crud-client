import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../auth.service";
import * as loginaActions from "./auth.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Response } from "src/app/models/dto/response.model";
import { Token } from "src/app/models/dto/token.model";
import { LoginRequest } from "src/app/models/reqeust_dto/auth/login.request";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { InstructorRegistrationRequest } from "src/app/models/reqeust_dto/instructor/instructor.registration.model";
import { Instructor } from "src/app/models/dto/instructor.model";

@Injectable()
export class AuthEffects {

    constructor(
        private _actions: Actions, 
        private _authService: AuthService,
        private _router: Router
    ) {}


    login$ = createEffect(() => {
        return this._actions.pipe(
            ofType(loginaActions.loginActionStart),
            mergeMap((action: LoginRequest) => {
                return this._authService.login(action).pipe(
                    map((res: Response<Token>) => {
                        this._router.navigateByUrl('/')
                        return loginaActions.loginActionSuccess(res);
                    }),
                    catchError((res: Response<Token> | HttpErrorResponse) => {
                        console.log('login error inside effects ', res);
                        
                        if (res instanceof HttpErrorResponse) {
                            return of(loginaActions.loginActionFail({message: res.error.error ?? 'Login Attampt Failed'}))
                        }

                        return of(loginaActions.loginActionFail({message: res.error ?? 'An Unknown Error Occurred'}))
                    })
                )
            })
        )
    });

    register$ = createEffect(() => {
        return this._actions.pipe(
            ofType(loginaActions.registerActionStart),
            mergeMap((action: InstructorRegistrationRequest) => {
                return this._authService.register(action).pipe(
                    map((res: Response<Instructor>) => {
                        console.log('register success ', res);
                        return loginaActions.registerActionSuccess(res);
                    })
                )
            })
        )
    })

    checkTokenValidity$ = createEffect(() => {
        return this._actions.pipe(
            ofType(loginaActions.checkTokenActionStart),
            mergeMap(action => {
                return this._authService.isTokenValid().pipe(
                    map((val: boolean) => loginaActions.checkTokenActionSuccess({val})),
                    catchError((res: HttpErrorResponse) => {
                        return of(loginaActions.checkTokenActionFail({message: res.error.error ?? 'Cannot Check Token Validity'}));
                    })
                )
            })
        )
    })

    logout$ = createEffect(() => {
        return this._actions.pipe(
            ofType(loginaActions.logoutActionStart),
            mergeMap(action => {
                return this._authService.logout().pipe(
                    map(() => {
                        this._router.navigateByUrl('/courses')
                        return loginaActions.logoutActionSuccess();
                    }),
                    catchError(err => {
                        this._router.navigateByUrl('/auth/login')
                        return of(loginaActions.logoutActionFail());
                    })
                ) 
            })
        )
    })

}