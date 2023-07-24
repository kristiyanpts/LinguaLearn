import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { RouterModule } from '@angular/router';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminCoursesComponent,
    AdminUsersComponent,
    AdminNavComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [AdminComponent, AdminPanelRoutingModule],
})
export class AdminPanelModule {}
