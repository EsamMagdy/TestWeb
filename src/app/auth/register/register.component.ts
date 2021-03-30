import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgForm,
  Validator,
  ValidationErrors,
  NG_VALIDATORS,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registrationMessage: string;
  isRegister = true;
  @ViewChild('registerForm') registerForm: NgForm;
  constructor(private authService: AuthService) {}
  value3: string;
  displayModal: boolean;

  ngOnInit(): void {}
  Register() {
    this.submitted=true;
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((data) => {
        if (data) {
          this.registrationMessage = 'Please Check your email to get the code';
          this.displayModal = true;
          this.authService.isRegister.next(true);
          this.registerForm.reset();
        }
      });
    }
  }
  switchToLogin() {
    this.isRegister = !this.isRegister;
    this.authService.switchToLogin.next(true);
  }
}
