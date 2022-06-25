import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from '../model/profile.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private profilePublicPath = 'http://localhost:5000';
  private profilePrivatePath = 'http://localhost:5000/api'

  
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private authService: UserService
  ) { }

  async getFollowingRequestStatus(profile: Profile): Promise<"SENT" | "NOT_SENT" | "APPROVED"> {
    let following = []
    following = await this.getAllFollowing(true)
    if (following.some(req => req.following_id == profile.id)) return 'APPROVED'
    
    following = await this.getAllFollowing(false)
    if (following.some(req => req.following_id == profile.id)) return 'SENT'

    else return 'NOT_SENT'
  }

  async getAllFollowing(approved: boolean) {
    try {
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')})
      const response = await this.http.get<any[]>(`${this.profilePrivatePath}/profile/following?approved=${approved}`, {headers}).toPromise()
      return response
    } catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
  }

  async followProfile(profile: Profile) {
    try {
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')})
      const data = {'user_to_follow': profile.username}
      await this.http.post(`${this.profilePrivatePath}/profile/follow`, data, {headers}).toPromise()
    } catch (error) {
      // throw error
      // if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      // else this.openFailSnackBar()
    }
  }

  async resolveFollowRequest(profile: Profile, reject: boolean ) {
    try {
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')})
      const data = {
        'follower_id': profile.id, 
        'reject': ()=> reject ?  'true' : 'false'
      }
      const response = await this.http.post(`${this.profilePrivatePath}/profile/followers`, data, {headers}).toPromise()
      return response  
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
