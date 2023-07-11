import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/landing/home/home.component';
import { AboutComponent } from './components/landing/about/about.component';
import { ContactComponent } from './components/landing/contact/contact.component';
import { NotFoundComponent } from './components/landing/not-found/not-found.component';
import { TeachersComponent } from './components/teachers/teachers/teachers.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'courses',
    loadChildren: () =>
      import('../app/components/courses/courses.module').then(
        (c) => c.CoursesModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../app/components/user/user.module').then((c) => c.UserModule),
  },
  {
    path: 'teachers',
    component: TeachersComponent,
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
