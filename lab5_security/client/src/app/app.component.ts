import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token')
    const potentialUserName = localStorage.getItem('auth-user')
    if (potentialToken) {
      this.authService.setJWT(potentialToken);
      this.authService.setUserName(potentialUserName);
    }
  }
}
