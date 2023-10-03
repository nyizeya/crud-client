import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstructorsListComponent } from './instructors/instructors-list/instructors-list.component';
import { InstructorDetailsComponent } from './instructors/instructor-details/instructor-details.component';
import { LoginComponent } from './shared/auth/login/login.component';

const routes: Routes = [
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
    path: 'auth/login',
    component: LoginComponent
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
