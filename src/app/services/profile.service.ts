import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Profile } from '../model/profile.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profilePublicPath = 'http://localhost:5000';
  profilePrivatePath = 'http://localhost:5000/api'
  // headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + this.getToken()});
  headers = new HttpHeaders({'user': this.authService.getUsername()})

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: UserService
  ) { }

  async getProfileDetails() {
    try {
      return await this.http.get<Profile>(`${this.profilePrivatePath}/profile/me`, {headers: this.headers}).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async searchProfiles(searchString: string) {
    try {
      return await this.http.get<Profile[]>(`${this.profilePublicPath}/profile/search?username=${searchString}`).toPromise()
    } catch (error) {
      throw error
    }
  }
}
