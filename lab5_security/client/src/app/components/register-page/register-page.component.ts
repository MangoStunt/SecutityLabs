import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialService} from "../../services/material.service";
import {checkPasswordStrength, checkPhoneNumber, MatchPassword} from "../../guards/validators";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm = this.fb.group({
      name: ['', [Validators.required]],
      number: ['', [Validators.required, checkPhoneNumber()]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, checkPasswordStrength()]],
      repeatPassword: ['', [Validators.required]],
    },
    {validators: MatchPassword('password', 'repeatPassword')}
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  onSubmit() {

    this.registerForm.disable()

    this.authService.register(this.registerForm.value).subscribe(
      () => this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      }),
      error => {
        MaterialService.toast(error.error.message);
        this.registerForm.enable()
      },
      () => this.registerForm.enable()
    )
  }

  ngOnInit(): void {
  }

}
