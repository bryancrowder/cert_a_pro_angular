import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  isLoggedIn: boolean = false;

  login(): void {
    // Perform login logic here
    this.isLoggedIn = true;
  }
}
