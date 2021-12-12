import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../../services/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  onSubmit() {

    this.loginForm.disable();

    this.authService.login(this.loginForm.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {MaterialService.toast(error.error.message); this.loginForm.enable()} ,
      () => this.loginForm.enable()
    )
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Now you can Sign In with newly created account')
      } else if (params['accessDenied']) {
        MaterialService.toast('You need to Sign In to access that page')
      }
    })
  }

}
