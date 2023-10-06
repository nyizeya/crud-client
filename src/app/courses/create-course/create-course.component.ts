import { Component, OnInit } from "@angular/core";
import { CourseState } from "../state/course.state";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "src/app/models/dto/course.model";
import { getCourseLoading, getSingleCourse } from "../state/course.selectors";
import { courseCreationStart, courseUpdateStart, getSingleCourseStart } from "../state/course.actions";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Instructor } from "src/app/models/dto/instructor.model";
import { getAllInstructorStart } from "src/app/instructors/state/instructors.actions";
import { getInstructor } from "src/app/instructors/state/instructors.selectors";
import { formatDate } from "@angular/common";
import { InstructorState } from "src/app/instructors/state/instructors.state";
import { CourseRegistrationRequest } from "src/app/models/reqeust_dto/course/course.registration.model";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  course$!: Observable<Course>;
  instructors$!: Observable<Instructor[]>;
  courseForm!: FormGroup
  courseId = 0;
  isCourseUpdateLoading$!: Observable<boolean>;

  constructor(
    private _store: Store<{'course': CourseState, 'instructor': InstructorState}>,
    private _aRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}


  ngOnInit(): void {

    this._store.dispatch(getAllInstructorStart());
    this.instructors$ = this._store.select(getInstructor);
    this.isCourseUpdateLoading$ = this._store.select(getCourseLoading);

    this.courseId = +this._aRoute.snapshot.paramMap.get('id')!;

    if (this.courseId > 0) {
      this._store.dispatch(getSingleCourseStart({id: this.courseId}));
      this._store.select(getSingleCourse).subscribe({
        next: (val: Course) => {
          this.courseUpdateForm(val);
        }
      })

    } else {
      this.courseCreateForm();
    }
  }

  getLevels() {
    return ['Basic', 'Intermediate', 'Advanced'];
  }

  onSubmit() {    
    if (this.courseId === 0) {
      console.log('start date ', this.courseForm.get('startDate'));
      
      // let request: CourseRegistrationRequest = {
      //   ...this.courseForm.getRawValue(),
      //   startDate: formatDate(new Date(this.courseForm.get('startDate')?.value), 'yyyy-MM-dd', 'en')
      // }

      this._store.dispatch(courseCreationStart(this.courseForm.getRawValue()));
      this._router.navigate(['/courses']);
    
    } else {
      this._store.dispatch(courseUpdateStart(this.courseForm.getRawValue()));
      this._router.navigate(['/courses']);
    }
    
  }

  courseCreateForm() {
    this.courseForm = this._formBuilder.group({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]),
      level: new FormControl('', [Validators.required]),
      instructorId: new FormControl('', [Validators.required])
    });
  }

  courseUpdateForm(course: Course) {
    console.log('course ', course);
    
    const dateString = course.startDate;
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);
    
    if (course) {
      this.courseForm = this._formBuilder.group({
        id: new FormControl(course.id),
        name: new FormControl(course.name),
        description: new FormControl(course.description),
        startDate: new FormControl(formatDate(new Date(year, month, day), 'yyyy-MM-dd', 'en')),
        level: new FormControl(course.level),
        instructorId: new FormControl(course.instructorId)
      });
    }
  }

  getInstructorControlErrors(control: AbstractControl): string | void { 
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'You need to choose instructor'
      }
    }
  }

  getCourseNameControlErrors(control: AbstractControl): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'Course name is required.';
      }
    }
  }

  getCourseDescriptionControlErrors(control: AbstractControl): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'Course description is required.';
      }
    }
  }

  getCourseLevelControlErrors(control: AbstractControl): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'Course level is required.';
      }
    }
  }

  getCourseDateControlErrors(control: AbstractControl): string | void {
    if (control.touched && !control.valid) {
      if (control.errors?.['required']) {
        return 'Course Start Date is required.'
      }
    }
  }

}