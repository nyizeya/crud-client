import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './state/auth.state';
import { getAuthenticated } from './state/auth.selectors';
import { checkTokenActionStart } from './state/auth.actions';

 
export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<{'login': AuthState}>);
  const router = inject(Router);
  let isAuthenticated = false;

  store.dispatch(checkTokenActionStart());

  store.select(getAuthenticated).subscribe({
    next: (val: boolean) => {
      isAuthenticated = val;
    }
  })

  if (isAuthenticated) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};

