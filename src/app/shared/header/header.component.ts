import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/state/auth.state';
import { logoutActionStart } from '../auth/state/auth.actions';
import { Router } from '@angular/router';
import { getAuthenticated } from '../auth/state/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;

  constructor(
    private _store: Store<{'login': AuthState}>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._store.select(getAuthenticated).subscribe({
      next: (val: boolean) => {
        this.isAuthenticated = val;
      }
    })
  }

  onLogout() {
    this._store.dispatch(logoutActionStart());
    this._router.navigate(['/auth/login'])
  }

}
