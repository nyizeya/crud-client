import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from "../app/shared/shared.module";
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { InstructorsListComponent } from './instructors/instructors-list/instructors-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { StoreModule } from '@ngrx/store';
import { CreateInstructorComponent } from './instructors/create-instructor/create-instructor.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppState } from './state/app.state';
import { CourseEffects } from './courses/state/course.effects';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';
import { InstructorEffects } from './instructors/state/instructors.effects';
import { InstructorDetailsComponent } from './instructors/instructor-details/instructor-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesListComponent,
    InstructorsListComponent,
    CreateCourseComponent,
    CreateInstructorComponent,
    UpdateCourseComponent,
    InstructorDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(AppState),
    EffectsModule.forRoot([CourseEffects, InstructorEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
