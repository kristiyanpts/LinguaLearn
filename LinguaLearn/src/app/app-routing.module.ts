import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/landing/home/home.component';
import { AboutComponent } from './components/landing/about/about.component';
import { ContactComponent } from './components/landing/contact/contact.component';
import { NotFoundComponent } from './components/landing/not-found/not-found.component';
import { TeachersComponent } from './components/teachers/teachers/teachers.component';
import { AdminComponent } from './components/admin-panel/admin/admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, title: 'Home | LinguaLearn' },
  { path: 'about', component: AboutComponent, title: 'About | LinguaLearn' },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Us | LinguaLearn',
  },
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
    title: 'Teachers | LinguaLearn',
  },
  {
    path: 'admin-panel',
    loadChildren: () =>
      import('../app/components/admin-panel/admin-panel.module').then(
        (c) => c.AdminPanelModule
      ),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: 'Not Found | LinguaLearn',
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
