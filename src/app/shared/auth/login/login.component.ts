import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.nonNullable.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
    
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
