import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { CoursesModule } from '../courses/courses.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoursesModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
