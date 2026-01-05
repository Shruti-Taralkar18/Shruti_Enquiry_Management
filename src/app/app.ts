import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  title = 'Enquiry_Management';

  constructor(private router: Router) {}

  // To check login state directly
  get loggedIn(): boolean {
    return localStorage.getItem('LoginEmail') !== null;
  }

  // // to get username directly
  // get username(): string {
  //   return localStorage.getItem('LoginEmail') || '';
  // }

  login() {
    this.router.navigateByUrl('/login');
  }

  logoff() {
    localStorage.removeItem('LoginEmail');
    this.router.navigateByUrl('/login');
  }
}
