import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error:string=null;
  submitted = false;
  @ViewChild('logInForm') logInForm: NgForm;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  Login() {
    this.error=null;
    this.submitted = true;
    if (!this.logInForm.valid) return;

    this.authService
      .login(this.logInForm.value.email, this.logInForm.value.password)
      .subscribe(
        (data) => {
          if (data.state && data.data) {
            this.error=null;
            this.router.navigate(['/location']);
            this.logInForm.reset();
          }
        },
        (errorMessage:any) => {
          this.error=errorMessage[0].message;
        }
      );
  }
  switchToRegister() {
    this.authService.switchToLogin.next(false);
  }
}
