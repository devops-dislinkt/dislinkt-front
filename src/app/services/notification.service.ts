import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { io } from "socket.io-client";
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(
    private snackBar: MatSnackBar,
    private authService: UserService,
    private http: HttpClient
  ) { }


  async toggleNotifications(username: string) {
    try {
      const path = `localhost:8091/api/notifications/${username}`
      const headers = new HttpHeaders({ 'user': this.authService.getUsername() })
      const response = await this.http.get<boolean>(path, { headers }).toPromise()
      return response
    }
    catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
      throw error
    }

  }

  openFailSnackBar(message = 'Something went wrong.'): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['red-snackbar'],
      duration: 4000,
    });
  }
}
