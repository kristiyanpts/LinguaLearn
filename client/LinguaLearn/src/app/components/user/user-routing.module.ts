import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Log In | LinguaLearn' },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register | LinguaLearn',
  },
  {
    path: ':userId',
    component: ProfileComponent,
    title: 'User Profile | LinguaLearn',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
