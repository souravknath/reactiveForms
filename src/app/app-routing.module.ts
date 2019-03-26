import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { RegistrationComponent } from './pages/registration/registration/registration.component';
import { EmployeeProfileComponent } from './pages/employee/employee-profile/employee-profile.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "profile", component: EmployeeProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
