import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersHeaderComponent } from './teachers-header/teachers-header.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeachersComponent } from './teachers/teachers.component';



@NgModule({
  declarations: [
    TeachersHeaderComponent,
    TeachersListComponent,
    TeachersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TeachersModule { }
