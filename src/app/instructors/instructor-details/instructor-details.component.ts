import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Instructor } from 'src/app/models/dto/instructor.model';
import { getInstructorByIdAction } from '../state/instructors.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { getInstructor, getInstructorError, getInstructorLoading } from '../state/instructors.selectors';
import { Course } from 'src/app/models/dto/course.model';
import { getCoursesByInstructor } from 'src/app/courses/state/course.actions';
import { getCourse } from 'src/app/courses/state/course.selectors';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.css']
})
export class InstructorDetailsComponent implements OnInit {

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  instructor$!: Observable<Instructor[]>;
  courses$!: Observable<Course[]>;

  constructor(
    private _store: Store<{'instructor': Instructor, 'course': Course}>,
    private _aRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = +this._aRoute.snapshot.paramMap.get('id')!

    this.isLoading$ = this._store.select(getInstructorLoading);
    this.error$ = this._store.select(getInstructorError);
    this.instructor$ = this._store.select(getInstructor);
    this.courses$ = this._store.select(getCourse)
    
    this._store.dispatch(getInstructorByIdAction({id}));  
    this._store.dispatch(getCoursesByInstructor({id}));
  }
}
