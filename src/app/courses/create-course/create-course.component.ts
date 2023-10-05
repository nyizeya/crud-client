import { Component, OnInit } from "@angular/core";
import { CourseState } from "../state/course.state";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "src/app/models/dto/course.model";
import { getCourseLoading, getSingleCourse } from "../state/course.selectors";
import { courseUpdateStart, getSingleCourseStart } from "../state/course.actions";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Instructor } from "src/app/models/dto/instructor.model";
import { getAllInstructorStart } from "src/app/instructors/state/instructors.actions";
import { getInstructor } from "src/app/instructors/state/instructors.selectors";
import { formatDate } from "@angular/common";
import { InstructorState } from "src/app/instructors/state/instructors.state";

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
    console.log('on submit ', this.courseForm.getRawValue());
    console.log(this.courseForm);
    
    
    // this._store.dispatch(courseUpdateStart(this.courseForm.getRawValue()));
    this._router.navigateByUrl('/courses');
  }

  courseCreateForm() {
    this.courseForm = this._formBuilder.group({
      id: new FormControl(''),
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
    const dateParts = dateString.split("-"); // Split the string into day, month, and year parts
    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Subtract 1 because months are 0-based
    const day = parseInt(dateParts[0], 10);
    
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

}