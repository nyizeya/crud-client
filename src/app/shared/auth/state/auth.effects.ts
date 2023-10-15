import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../auth.service";
import * as loginaActions from "./auth.actions";
import { catchError, filter, map, mergeMap, of, tap } from "rxjs";
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
                        this._authService.getCurrentUser(res.data![0].accessToken.token).pipe(
                            map(user => this._authService.setCurrentUser(user))
                        );

                        this._router.navigateByUrl('/courses')
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
                        this._router.navigate(['/auth/login']);
                        return loginaActions.registerActionSuccess(res);
                    }),
                  catchError((res: Response<Instructor> | HttpErrorResponse) => {
                    console.log(res);
                    let message = '';
                    if (res instanceof HttpErrorResponse) {
                      message = res.error.error;
                    } else {
                      message = res.error!;
                    }
                    this._router.navigate(['/auth/register']);
                    return of(loginaActions.registerActionFail({message}));
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

    getCurrentUser$ = createEffect(() => {
        return this._actions.pipe(
            ofType(loginaActions.getCurrentUserStart),
            mergeMap((action: {token: string}) => {
                return this._authService.getCurrentUser(action.token).pipe(
                    map((res: Instructor | null) => {
                        console.log('current user ', res);
                        return loginaActions.getCurrrentUserSuccess({user: res});
                    }),
                    catchError((res: HttpErrorResponse) => {
                        console.log('current user error ', res);
                        return of(loginaActions.getCurrrentUserFail({message: res.error.error}))
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
                        this._router.navigate(['/auth/login'])
                        this._authService.currentUser$.next(null);
                        return loginaActions.logoutActionSuccess();
                    }),
                    catchError(err => {
                        this._router.navigate(['/auth/login'])
                        return of(loginaActions.logoutActionFail());
                    })
                )
            })
        )
    })

}
