import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Instructor } from 'src/app/models/dto/instructor.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { getInstructor, getInstructorError, getInstructorLoading } from '../state/instructors.selectors';
import { Course } from 'src/app/models/dto/course.model';
import { getCourse, getCourseError, getCourseLoading } from 'src/app/courses/state/course.selectors';
import { getCoursesByInstructorStart } from 'src/app/courses/state/course.actions';
import { getInstructorByIdStart } from '../state/instructors.actions';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.css']
})
export class InstructorDetailsComponent implements OnInit {

  isLoading$!: Observable<boolean>;
  isInstructorLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  courseError$!: Observable<string | null>;
  instructor$!: Observable<Instructor[]>;
  courses$!: Observable<Course[]>;

  constructor(
    private _store: Store<{}>,
    private _aRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.isLoading$ = this._store.select(getCourseLoading);
    this.isInstructorLoading$ = this._store.select(getInstructorLoading);
    this.error$ = this._store.select(getInstructorError);
    this.courseError$ = this._store.select(getCourseError);
    this.instructor$ = this._store.select(getInstructor);
    this.courses$ = this._store.select(getCourse);
    
    this._loadInstructorDetails();
  }

  _loadInstructorDetails() {
    let id = +this._aRoute.snapshot.paramMap.get('id')!;

    console.log('instructor details id ', id);
    console.log(typeof(id));
    

    this._store.dispatch(getInstructorByIdStart({id}));  
    this._store.dispatch(getCoursesByInstructorStart({id}));
  }
}
