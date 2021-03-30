import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isRegister = false;
  isLogin = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isRegister.subscribe((data) => (this.isRegister = true));
    this.authService.switchToLogin.subscribe((data) => (this.isLogin = data));
  }
}
