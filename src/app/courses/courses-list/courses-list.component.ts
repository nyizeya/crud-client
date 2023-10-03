import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllCourseStart } from '../state/course.actions';
import { Course } from 'src/app/models/dto/course.model';
import { Observable } from 'rxjs';
import { getCourse, getCourseError, getCourseLoading } from '../state/course.selectors';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courseName?: string;
  level?: string;
  pageNumber?: number;
  size?: number;

  isLoading$?: Observable<boolean>;
  errorMessage$?: Observable<string | null>;
  courses$?: Observable<Course[]>;

  constructor(private _store: Store<{'course': Course}>) {}

  ngOnInit(): void {
    this.isLoading$ = this._store.select(getCourseLoading);
    this.errorMessage$ = this._store.select(getCourseError);
    this.courses$ = this._store.select(getCourse);

    this._loadCourses();
  }

  _loadCourses() {
    this._store.dispatch(getAllCourseStart({
      name: this.courseName, 
      level: this.level, 
      pageNumber: this.pageNumber, 
      size: this.size
    }));
  }

}
