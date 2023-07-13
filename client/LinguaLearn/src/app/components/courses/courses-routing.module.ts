import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CoursesComponent },
  {
    path: 'create',
    component: CourseCreateComponent,
    title: 'Create Course | LinguaLearn',
  },
  {
    path: ':courseId',
    component: CourseDetailsComponent,
    title: 'Course Details | LinguaLearn',
  },
  {
    path: ':courseId/edit',
    component: CourseEditComponent,
    title: 'Edit Course | LinguaLearn',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
