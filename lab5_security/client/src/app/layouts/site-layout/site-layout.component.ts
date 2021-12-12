import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  name: string = '';

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.name = this.authService.getUserName()
  }

}
