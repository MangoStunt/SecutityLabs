import { Injectable } from '@angular/core';
import {IRegUser, IUser} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userJWT: string = '';
  private userName: string = '';
  private userInfo: {number: string, address: string} = {number: '', address: ''};

  constructor(private http: HttpClient) { }

  login(user: IUser): Observable<{token: string}> {
    return this.http.post<{token: string, user: IRegUser}>('/api/auth/login', user).
    pipe(
      tap(res => {
        localStorage.setItem('auth-token', res.token);
        localStorage.setItem('auth-user', res.user.name);
        this.setJWT(res.token);
        this.setUserName(res.user.name);
        this.setAdditionInfo(res.user)
      })
    )
  }

  register(user: IRegUser) {
    return this.http.post('/api/auth/register', user)
  }

  exit() {
    this.setJWT('')
    localStorage.clear()
  }

  getJWT(): string {
    return this.userJWT
  }

  setJWT(token: string) {
    this.userJWT = token;
  }

  getUserName(): string {
    if (this.isEntered()) {
      return this.userName
    } else
      return 'LAB5'
  }

  setUserName(user: any) {
    if (typeof user == "string") {
      this.userName = user
    } else {
      this.userName = 'LAB5 (logged)'
    }

  }

  getAdditionInfo() {
    return {number: this.userInfo.number, address: this.userInfo.address}
  }

  setAdditionInfo(user: any) {
    return this.userInfo = {number: user.number, address: user.address}
  }

  isEntered(): boolean {
    return !!this.userJWT
  }

}
