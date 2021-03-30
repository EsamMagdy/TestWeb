export class User {
  constructor(
    public id?: string,
    public name?: string,
    public userName?: string,
    public phoneNumber?: string,
    public code?: string,
    public email?: string,
    public password?: string,
    public address?:string,
    public _token?: string,
    public _tokenExpirationDate?: Date,
    public expiresIn?: number,
    public _tokenType?: string,
    public rememberMe?: boolean
  ) {}

  setTokenData(code: string) {
    let token: any = JSON.parse(code.replace(/\\|\//g, ''));
    this._token = token['access_token'];
    this.expiresIn = +token['expires_in'];
    this._tokenExpirationDate = new Date(
      new Date().getTime() + this.expiresIn * 1000
    );
    this._tokenType = token['token_type'];
  }
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

export interface RegisterationData {
  phoneNumber: string;
  password: string;
  code: string;
  userId: string;
}
