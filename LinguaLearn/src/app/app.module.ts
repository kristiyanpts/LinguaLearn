import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { CoursesModule } from './components/courses/courses.module';
import { LandingModule } from './components/landing/landing.module';
import { TeachersModule } from './components/teachers/teachers.module';
import { UserModule } from './components/user/user.module';
import { authInterceptorProvider } from './core/interceptors/auth.interceptor';
import { AdminPanelModule } from './components/admin-panel/admin-panel.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 7500,
      closeButton: true,
      progressBar: true,
    }),
    AppRoutingModule,
    SharedModule,
    CoursesModule,
    LandingModule,
    TeachersModule,
    UserModule,
    HttpClientModule,
    AdminPanelModule,
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
