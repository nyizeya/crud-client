import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/state/auth.state';
import { logoutActionStart } from '../auth/state/auth.actions';
import { Router } from '@angular/router';
import { getAuthenticated } from '../auth/state/auth.selectors';
import { Instructor } from 'src/app/models/dto/instructor.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  currentUser: Instructor | null | undefined

  constructor(
    private _store: Store<{'login': AuthState}>,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._store.select(getAuthenticated).subscribe({
      next: (val: boolean) => {
        this.isAuthenticated = val;
      }
    });

    this._authService.currentUser$.subscribe({
      next: (user: Instructor | null | undefined) => {
        console.log('current user inside header component ', user);
        
        this.currentUser = user;
      }
    })
  }

  onLogout() {
    this._store.dispatch(logoutActionStart());
  }

}
