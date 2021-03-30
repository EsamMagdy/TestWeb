import { User } from "./user.model";

export class LoginResData{
      token:string;
      loginData:LoginData;
      user:User;
}

export class LoginData{
      userName:string;
      password:string;
      rememberMe:string;
}