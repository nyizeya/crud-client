import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/dto/token.model';
import { AuthState } from '../state/auth.state';
import { getError, getLoading, getSuccess, getToken } from '../state/auth.selectors';
import { Router } from '@angular/router';
import { loginActionStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  
  isLoading$!: Observable<boolean>;
  success$!: Observable<boolean>;
  error$!: Observable<string | null>;
  token$!: Observable<Token[]>;

  constructor(
    private _formBuilder: FormBuilder, 
    private _store: Store<{'login': AuthState}>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.nonNullable.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

    this.isLoading$ = this._store.select(getLoading);
    this.success$ = this._store.select(getSuccess);
    this.error$ = this._store.select(getError);
    this.token$ = this._store.select(getToken);
  }

  onSubmit() {
    this._store.dispatch(loginActionStart(this.loginForm.getRawValue()));
  }

  getUsernameErrorMessage(control: AbstractControl): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'Username is required';
      }
    }
  }

  getPasswordErrorMessage(control: AbstractControl): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'Password is requried';
      }
    }

    return 'Password needs to be at least 8 characters';
  }

}
