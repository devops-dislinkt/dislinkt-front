import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from '../model/login.model';
import { Jwt } from '../model/jwt.model';
import { UserDto } from '../model/user.model';
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

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
      const response = await this.http.post<UserDto>(`${this.path}/users`, user).toPromise();
      this.openSuccessSnackBar(`successfully created user ${user.username}. Please login to continue.`)
      this.router.navigate(['/login']);
      
    }
    catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
  }

  login(dto: LoginDto): Observable<Jwt> {
    console.log("login = ", dto)
    return this.http.post<Jwt>(this.path + '/auth/login', dto);
  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
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
