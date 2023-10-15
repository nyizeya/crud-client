import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Instructor } from 'src/app/models/dto/instructor.model';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { editInstructorStart } from '../state/instructors.actions';

@Component({
  selector: 'app-update-instructor',
  templateUrl: './update-instructor.component.html',
  styleUrls: ['./update-instructor.component.css']
})
export class UpdateInstructorComponent implements OnInit {

  updateForm!: FormGroup
  currentUser!: Instructor

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this._authService.currentUser$.subscribe({
      next: (val: Instructor | null | undefined) => {
        this.currentUser = val!;
      }
    })


    this.updateForm = this._formBuilder.nonNullable.group({
      id: new FormControl(this.currentUser.id),
      name: new FormControl(this.currentUser.name),
      email: new FormControl(this.currentUser.email),
      phone: new FormControl(this.currentUser.phone)
    })
  }

  onSubmit() {
    console.log(this.updateForm.value);   
    this._store.dispatch(editInstructorStart(this.updateForm.value)) 
  }
  
}
