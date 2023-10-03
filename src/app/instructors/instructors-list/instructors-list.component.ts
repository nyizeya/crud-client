import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { Instructor } from 'src/app/models/dto/instructor.model';
import { getInstructor, getInstructorError, getInstructorLoading } from '../state/instructors.selectors';
import { getAllInstructorStart } from '../state/instructors.actions';
import { InstructorState } from '../state/instructors.state';

@Component({
  selector: 'app-instructors-list',
  templateUrl: './instructors-list.component.html',
  styleUrls: ['./instructors-list.component.css']
})
export class InstructorsListComponent implements OnInit {

  isLoading$?: Observable<boolean>;
  errorMessage$?: Observable<string | null>;
  instructors$?: Observable<Instructor[]>;

  constructor(
    private _store: Store<{'instructor': Instructor}>
  ) {}

  ngOnInit(): void {
   this.isLoading$ = this._store.select(getInstructorLoading);
   this.errorMessage$ = this._store.select(getInstructorError);
   this.instructors$ = this._store.select(getInstructor);

   this._loadInstructors();
  }
  
  _loadInstructors() {
    console.log('_loadInstructors()');
    
    this._store.dispatch(getAllInstructorStart())
  }

}
