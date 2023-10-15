import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './state/auth.state';
import { getAuthenticated } from './state/auth.selectors';
import { checkTokenActionStart } from './state/auth.actions';
import { AuthService } from './auth.service';
import { Instructor } from 'src/app/models/dto/instructor.model';

 
export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<{'login': AuthState}>);
  const router = inject(Router);
  const _authService = inject(AuthService);

  let isAuthenticated = false;

  store.dispatch(checkTokenActionStart());

  let token = localStorage.getItem('token');

  console.log(token);
        
  if (token) {
    _authService.getCurrentUser(localStorage.getItem('token')!).subscribe({
      next: (user: Instructor | null) => {
        console.log('current user inside auth guard ', user);
        
        _authService.setCurrentUser(user);
      }
    });
  }


  store.select(getAuthenticated).subscribe({
    next: (val: boolean) => {
      isAuthenticated = val;
    }
  })

  if (isAuthenticated) {
    return true;
  }

  router.navigateByUrl('/auth/login');
  return false;
};

