import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.less'],
})
export class VerifyCodeComponent implements OnInit {
  @ViewChild('lastNumber') lastNumber: ElementRef;
  @ViewChild('verificationForm') vForm: NgForm;
  isLastNumber: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  goToNextInput(event: any) {
    let key = event.which;
    let target = event.target;
    let nextInput = target.nextElementSibling;

    let lastNumber = this.lastNumber.nativeElement.value.length;
    if (lastNumber) {
      target.select().focus();
      return;
    }
    if (key != 9 && (key < 48 || key > 57)) {
      event.preventDefault();
      return false;
    }
    if (key === 9) {
      return true;
    }
    if (nextInput.nodeName === 'BUTTON') {
      nextInput = (<any>document.getElementsByTagName('input'))[0];
    }
    return nextInput.select().focus();
  }
  onKeyDown(e: any) {
    var key = e.which;

    if (key === 9 || (key >= 48 && key <= 57)) {
      return true;
    }

    e.preventDefault();
    return false;
  }
  onFocus(e: any) {
    e.target.select();
  }
  onSubmit() {
    if (!this.vForm.valid) return;
    // this.router.navigate(['/location']);
    let code = this.toString(this.vForm.value);

    this.authService.verifyCode(code).subscribe(
      (resData) => {
        if (resData.state && resData.data) {
          this.navigateToHome();
        }
      },
      (errorMessage) => {
      }
    );
    this.vForm.reset();
  }
  private navigateToHome() {
    this.router.navigate(['/location']);
  }
  private toString(o: any) {
    let code = '';
    Object.keys(o).forEach((k) => {
      code += o[k];
    });

    return code;
  }
}
