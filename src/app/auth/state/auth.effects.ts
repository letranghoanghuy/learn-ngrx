import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth.service";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { AppState } from "src/app/store/app.state";
import { Store } from "@ngrx/store";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.action";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>, private router: Router) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(map((data) => {
                    this.store.dispatch(setLoadingSpinner({ status: false }));
                    this.store.dispatch(setErrorMessage({ message: '' }))
                    const user = this.authService.formatUser(data);
                    this.authService.setUserInLocalStorage(user);
                    return loginSuccess({ user, redirect: true });
                }),
                    catchError((errResp) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errMessage = this.authService.getErrorMessage(
                            errResp.error.error.message
                        )
                        return of(setErrorMessage({ message: errMessage }));
                    })
                )
            })
        )
    })

    loginRedirect$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(...[loginSuccess, signupSuccess]),
                tap((action) => {
                    this.store.dispatch(setErrorMessage({ message: "" }));
                    if (action.redirect) {
                        this.router.navigate(['/']);
                    }
                })
            )
        },
        { dispatch: false }
    )

    signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                return this.authService.signup(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return signupSuccess({ user, redirect: true});
                    }),
                    catchError((errResp) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errMessage = this.authService.getErrorMessage(
                            errResp.error.error.message
                        )
                        return of(setErrorMessage({ message: errMessage }));
                    })

                )
            })
        )
    })

    // signupRedirect$ = createEffect(
    //     () =>{
    //         return this.actions$.pipe(
    //             ofType(signupSuccess),
    //             tap((action) =>{
    //                 this.store.dispatch(setErrorMessage({message: ""}));
    //                 this.router.navigate(['/']);
    //             })
    //         )
    //     },
    //     {dispatch:false}
    // )

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authService.getUserFromLocalStorage();
                return of(loginSuccess({ user, redirect: false }))
            })
        )
    },
        { dispatch: false }
    )

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogout),
            map((action) => {
                this.authService.logout();
                this.router.navigate(['/auth']);
            })
        )
    },
        { dispatch: false }
    )
}