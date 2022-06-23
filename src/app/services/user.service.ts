import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../model/login.model';
import { UserDto } from '../model/user.model';
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Profile } from '../model/profile.model';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authPath = 'http://localhost:8080/api';
  // headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + this.getToken()});
  headers = new HttpHeaders({'user': this.getUsername()})

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  // TODO: FINISH TESTING
  async updateUsername(profile: Profile) {
    try {
      await this.http.put(`${this.authPath}/users/username`, profile).toPromise()
    } catch (error) {
      throw error;
    }
  }

  async signUp(user: UserDto) {
    try {
      const response = await this.http.post<UserDto>(`${this.authPath}/auth/users`, user).toPromise()
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
      const jwt = await this.http.post<string>(`${this.authPath}/auth/login`, dto).toPromise()
      localStorage.setItem('token', jwt)
      const decodedToken = new JwtHelperService().decodeToken(jwt)
      localStorage.setItem('role', decodedToken.role)
      localStorage.setItem('username', decodedToken.username)
      this.openSuccessSnackBar(`successfully logged in.`)
      this.router.navigate(['/']);
      this.setupNotifications()
    }
    catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
  }

  private setupNotifications() {
    const socket = io("ws://localhost:8080", { path: '/notification' });

    socket.on("new-post", (message) => {
      console.log("TU SAM", message)
      const por = `${message['username']} created new post: ${message['title']}.`
      this.openSuccessSnackBar(por)
    })

    socket.on("connected-response", () => {
      socket.emit('username', this.getUsername());
    })
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
    let role = "admin";
    return authority === role;
  }

  isUser(): boolean {
    let authority = this.getRole();
    let role = "user";
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
