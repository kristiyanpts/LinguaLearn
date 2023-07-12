import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesModule } from '../courses/courses.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [CommonModule, CoursesModule, CoursesModule, RouterModule],
})
export class LandingModule {}
