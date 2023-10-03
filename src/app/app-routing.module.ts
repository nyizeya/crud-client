import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstructorsListComponent } from './instructors/instructors-list/instructors-list.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';
import { InstructorDetailsComponent } from './instructors/instructor-details/instructor-details.component';

const routes: Routes = [
  {
    path: 'courses/:id',
    component: UpdateCourseComponent
  },
  {
    path: 'instructors/:id',
    component: InstructorDetailsComponent
  },
  {
    path: 'instructors',
    component:InstructorsListComponent
  },
  {
    path: 'courses',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'courses'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
