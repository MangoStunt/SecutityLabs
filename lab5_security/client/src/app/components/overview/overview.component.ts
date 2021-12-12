import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  showAdditionalInfo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleInfo() {
    console.log('info toggled', !this.showAdditionalInfo.value)
      this.showAdditionalInfo.next(!this.showAdditionalInfo.value)
  }
}
