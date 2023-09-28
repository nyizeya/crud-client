import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { AppState } from 'src/app/app.state';
import { Response } from 'src/app/models/dto/response.model';
import { Instructor } from 'src/app/models/dto/instructor.model';
import { getAllInstructorAction } from '../state/instructors.actions';

@Component({
  selector: 'app-instructors-list',
  templateUrl: './instructors-list.component.html',
  styleUrls: ['./instructors-list.component.css']
})
export class InstructorsListComponent implements OnInit {

  instructorList$?: Observable<Response<Instructor>>;

  constructor(
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(getAllInstructorAction())
  }

}
