import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuShown: boolean = false;
  constructor() {}

  toggleMenu(): void {
    this.isMenuShown = !this.isMenuShown;
    console.log(this.isMenuShown);
  }

  getMenuClass(): string {
    return this.isMenuShown ? 'open' : '';
  }
}
