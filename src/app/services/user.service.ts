import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from '../model/login.model';
import { Jwt } from '../model/jwt.model';
import { UserDto } from '../model/user.model';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private path = 'http://localhost:8080';

  constructor(private http: HttpClient,
    private route: Router) { }

  signUp(user: UserDto): Observable<UserDto> {
    console.log("signup = ", user)
    return this.http.post<UserDto>(this.path + '/auth/register', user);
  }

  login(dto: LoginDto): Observable<Jwt> {
    console.log("login = ", dto)
    return this.http.post<Jwt>(this.path + '/auth/login', dto);
  }

  logout(): void {
    localStorage.removeItem("token");
    this.route.navigate(['/']);
  }

  getToken(): string {
    return <string>localStorage.getItem("token");
  }

  getUsername(): string {
    return <string>localStorage.getItem("username");
  }

  getRole(): string {
    return <string>localStorage.getItem("role");
  }

  isAdmin(): boolean {
    let authority = this.getRole();
    let role = "ADMIN";
    return authority === role;
  }

  isUser(): boolean {
    let authority = this.getRole();
    let role = "CLIENT";
    return authority === role;
  }

  isLoggedIn(): boolean {
    let token = this.getToken();
    return !!token;
  }

}
