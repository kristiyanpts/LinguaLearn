import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherItemComponent } from './teacher-item/teacher-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TeachersComponent, TeacherItemComponent],
  imports: [CommonModule, RouterModule],
})
export class TeachersModule {}
