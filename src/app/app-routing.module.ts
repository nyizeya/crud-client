import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstructorsListComponent } from './instructors/instructors-list/instructors-list.component';
import { InstructorDetailsComponent } from './instructors/instructor-details/instructor-details.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { authGuard } from './shared/auth/auth.guard';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { RegisterComponent } from './shared/auth/register/register.component';

const routes: Routes = [
  {
    path: 'instructors/:id',
    component: InstructorDetailsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'instructors',
    component:InstructorsListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'courses/new/:id',
    component: CreateCourseComponent,
    canActivate: [authGuard]
  },
  {
    path: 'courses/:id',
    component: CreateCourseComponent,
    canActivate: [authGuard]
  },
  {
    path: 'courses',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
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
