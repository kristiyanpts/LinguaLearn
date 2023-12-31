import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { CoursesModule } from '../courses/courses.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, EditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoursesModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class UserModule {}
