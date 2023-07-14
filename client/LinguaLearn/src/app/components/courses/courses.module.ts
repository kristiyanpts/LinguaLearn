import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesHeaderComponent } from './courses-header/courses-header.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CoursesHeaderComponent,
    CoursesComponent,
    CourseDetailsComponent,
    CourseCreateComponent,
    CourseEditComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, ReactiveFormsModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
