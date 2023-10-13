import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Instructor } from 'src/app/models/dto/instructor.model';
import { editInstructorActionStart, getInstructorByIdStart } from '../state/instructors.actions';
import { getInstructorError, getInstructorLoading, getSingleInstructor } from '../state/instructors.selectors';

@Component({
  selector: 'app-create-instructor',
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.css'],
})
export class CreateInstructorComponent implements OnInit {
  instructorUpdateForm!: FormGroup;
  instructor!: Instructor;
  error$!: Observable<string | null>;
  isLoading$!: Observable<boolean>;
  instructorId!: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _aRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.instructorId = +this._aRoute.snapshot.paramMap.get('id')!;
    this._store.dispatch(getInstructorByIdStart({ id: this.instructorId }));

    this.error$ = this._store.select(getInstructorError);
    this.isLoading$ = this._store.select(getInstructorLoading);

    this._store.select(getSingleInstructor).subscribe({
      next: (val: Instructor) => {
        this.instructor = val;
        this.createUpdateForm()
      },
    });
  }

  createUpdateForm() {
    this.instructorUpdateForm = this._formBuilder.nonNullable.group({
      id: new FormControl(this.instructor.id),
      name: new FormControl(this.instructor.name),
      email: new FormControl(this.instructor.email),
      phone: new FormControl(this.instructor.phone),
    });
  }

  onSubmit() { 
    this._store.dispatch(editInstructorActionStart(this.instructorUpdateForm.getRawValue()))
    this._router.navigate(['/instructors']);
  }
}
