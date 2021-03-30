import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponseData } from '../shared/model/authResponseData.model';
import { LoginResData } from '../shared/model/loginData.model';
import { RegisterData } from '../shared/model/registerData.model';
import { ResponseDataCRMWithObjectData } from '../shared/model/responseDataCRM.model';
import { RegisterationData, User } from '../shared/model/user.model';
import { VerificationCode } from '../shared/model/verificationCode.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }
  switchToLogin = new Subject<boolean>();
  isRegister = new Subject<boolean>();
  isVerfied = new Subject<boolean>();
  user: User = new User();
  userSb = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  register(registerData: RegisterData) {
    this.user.email = registerData.email;
    this.user.password = registerData.password;
    this.user.address = registerData.address;
    this.user.rememberMe = registerData.rememberMe;
    this.user.phoneNumber = registerData.userName;
    return this.http
      .post<ResponseDataCRMWithObjectData<RegisterationData>>(
        'http://rht.excprotection.com:8008/ar/api/Account/Register',
        registerData
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.user.code = resData.data.code;
          this.user.id = resData.data.userId;
        })
      );
  }

  verifyCode(code: string) {
    this.user.code = code;
    return this.http
      .post<ResponseDataCRMWithObjectData<VerificationCode>>(
        'http://rht.excprotection.com:8008/ar/api/Account/VerifyCode',
        this.user
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.user.setTokenData(resData.data.code);

          this.handleAuth(resData.data.user);
        })
      );
  }
  autoLogin() {
    const userData: {
      email: string;
      name: string;
      userName: string;
      id: string;
      phoneNumber: string;
      _token: string;
      _tokenExpirationDate: string;
      address: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;

    const loaderUser = new User(
      userData.id,
      userData.name,
      userData.userName,
      userData.phoneNumber,
      '',
      userData.email,
      '',
      userData.address,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loaderUser.token) {
      this.userSb.next(loaderUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

        debugger;
      this.autoLogout(expirationDuration);
    }
  }
  login(userName: string, password: string, rememberMe: boolean = true) {
    return this.http
      .post<ResponseDataCRMWithObjectData<LoginResData>>(
        'http://rht.excprotection.com:8008/ar/api/Account/login',
        {
          userName: userName,
          password: password,
          rememberMe: rememberMe,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          if (!resData.data && resData.message) {
            let errors: any = [];
            resData.message.forEach((error: any) => {
              errors.push(new Error(error.value));
            });
            throw errors;
          } else {
            this.user.setTokenData(resData.data.token);
            this.handleAuth(resData.data.user);
          }
        })
      );
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      console.log(expirationDuration);
      console.log(expirationDuration*1000);
      
    }, expirationDuration*1000);
  }
  logout() {
    this.userSb.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  private handleAuth(user: User) {
    this.user.email = user.email;
    this.user.name = user.name;
    this.user.userName = user.userName;
    this.user.id = user.id;
    this.user.phoneNumber = user.phoneNumber;
    this.user.password = user.password;

    this.userSb.next(this.user);
    this.autoLogout(this.user.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(this.user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
