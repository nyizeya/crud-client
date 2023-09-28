import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from "../app/shared/shared.module";
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { InstructorsListComponent } from './instructors/instructors-list/instructors-list.component';
import { FormsModule } from '@angular/forms';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { StoreModule } from '@ngrx/store';
import { CreateInstructorComponent } from './instructors/create-instructor/create-instructor.component';
import { appReducer } from './app.state';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesListComponent,
    InstructorsListComponent,
    CreateCourseComponent,
    CreateInstructorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    StoreModule.forRoot(appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
