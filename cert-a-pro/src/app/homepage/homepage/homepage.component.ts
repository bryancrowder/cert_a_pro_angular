import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  @Input() isLoggedIn: boolean = false; // Receive the isLoggedIn value from the parent component

  // ... rest of your code
}
