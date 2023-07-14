import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuShown: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu(): void {
    this.isMenuShown = !this.isMenuShown;
    console.log(this.isMenuShown);
  }

  getMenuClass(): string {
    return this.isMenuShown ? 'open' : '';
  }

  logout(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/user/login']);
    } else {
      this.authService
        .logout()
        .subscribe
        //todo: remove any session storage
        ();
    }
  }
}