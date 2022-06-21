import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { io } from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  
  constructor(
    private snackBar: MatSnackBar,
  ) { }

  initSocketForNotifications(loggedInUsername: string){
    const socket = io("ws://localhost:8080", {path: '/notification'});

    socket.on("new-post", (message) => {
        console.log("TU SAM", message)
        const por = `${message['username']} created new post: ${message['title']}.`
        this.showSnackBar(por)
    })
  
    socket.on("connected-response", () => {
      socket.emit('username', loggedInUsername);
    })

  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }

}
