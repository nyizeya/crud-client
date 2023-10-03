import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  courseForm!: FormGroup

  constructor(private _formBuilder: FormBuilder, private _aRouter: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this._aRouter.snapshot.paramMap.get('id');
    

    this.courseForm = this._formBuilder.nonNullable.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      instructorId: new FormControl('', [Validators.required])
    });
  }

  getCourseFieldErrorMessage(control: AbstractControl, fieldName: string): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return this._generateErrorMessage(fieldName);
      }
    }
  }

  _generateErrorMessage(field: string): string {
    return `Course ${field} is required`;
  }

}
