import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherItemComponent } from './teacher-item/teacher-item.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TeachersComponent, TeacherItemComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class TeachersModule {}
