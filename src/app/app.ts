import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
   title = signal('Enquiry_Management');

   loggedIn = signal(false);
   username = signal('John Doe');

  login(){
    this.loggedIn.set(true);
  }

  logoff(){
    this.loggedIn.set(false);
  }
}
