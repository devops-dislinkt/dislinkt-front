import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Profile } from '../model/profile.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profilePublicPath = 'http://localhost:5000';
  private profilePrivatePath = 'http://localhost:5000/api'
  // headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + this.getToken()});
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: UserService
  ) { }

  async getProfileDetails(username: string) {
    try {
      const logged_in_username = this.authService.getUsername()
      if (logged_in_username) {
        const headers = new HttpHeaders({'user': username})
        return await this.http.get<Profile>(`${this.profilePublicPath}/profile/details/${username}`, {headers: headers}).toPromise();
      }
      else {
        return await this.http.get<Profile>(`${this.profilePublicPath}/profile/details/${username}`).toPromise();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
  }

  async searchProfiles(searchString: string) {
    try {
      return await this.http.get<Profile[]>(`${this.profilePublicPath}/profile/search?username=${searchString}`).toPromise()
    } catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
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
      panelClass: ['red-snackbar'],
      duration: 4000,
    });
  }
}
