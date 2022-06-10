import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from '../model/login.model';
import { Jwt } from '../model/jwt.model';
import { UserDto } from '../model/user.model';
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private path = 'http://localhost:8090/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  async signUp(user: UserDto) {
    try {
      const response = await this.http.post<UserDto>(`${this.path}/users`, user).toPromise()
      this.openSuccessSnackBar(`successfully created user ${user.username}. Please login to continue.`)
      this.router.navigate(['/login']);
      
    }
    catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
  }

  async login(dto: LoginDto | UserDto) {
    try {
      const jwt = await this.http.post<string>(`${this.path}/login`, dto).toPromise()
      localStorage.setItem('token', jwt)
      const decodedToken = new JwtHelperService().decodeToken(jwt)
      localStorage.setItem('role', decodedToken.role)
      localStorage.setItem('username', decodedToken.username)
      this.openSuccessSnackBar(`successfully logged in.`)
      this.router.navigate(['/']);
    }
    catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
  }

  logout(): void {
    localStorage.removeItem("token")
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    this.router.navigate(['/'])
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

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
      duration: 4000,
    });
  }
  openFailSnackBar(message = 'Something went wrong.'): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['red-snackbar']
    });
  }


}
