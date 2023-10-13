import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import { registerActionStart } from '../state/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AuthState>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this._formBuilder.nonNullable.group({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11)])
    })
  }

  onSubmit() {
    console.log(this.registrationForm.getRawValue());
    this._store.dispatch(registerActionStart(this.registrationForm.getRawValue()));
    
    this._router.navigateByUrl('/instructors');
  }

  getNameControlError(control: AbstractControl): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'Name is required.'
      }
    }
  }

  getEmailControlError(control: AbstractControl): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'Eamil is required.'
      } else if (control.errors?.['email']) {
        return 'Email is invalid.'
      }
    }
  }

  getPasswordControlError(control: AbstractControl): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'Password is required.'
      } else if (control.errors?.['minlength']) {
        return 'Password must be at least 8 characters.'
      }
    }
  }

  getPhoneControlError(control: AbstractControl): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'Phone is required.'
      } else if (control.errors?.['minlength']) {
        return 'Valid phone should be at lest 11 digits.'
      }
    }
  }

}
