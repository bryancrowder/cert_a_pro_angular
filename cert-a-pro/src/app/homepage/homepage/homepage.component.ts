import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth.service'
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private authService: AuthService) {}
  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
}