import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'default',
    component: AdminComponent,
    title: 'Admin | Lingualearn',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        title: 'Admin - Dashboard | LinguaLearn',
        outlet: 'panel',
        canActivate: [AdminGuard],
      },
      {
        path: 'courses',
        component: AdminCoursesComponent,
        title: 'Admin - Courses | LinguaLearn',
        outlet: 'panel',
        canActivate: [AdminGuard],
      },
      {
        path: 'users',
        component: AdminUsersComponent,
        title: 'Admin - Users | LinguaLearn',
        outlet: 'panel',
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
