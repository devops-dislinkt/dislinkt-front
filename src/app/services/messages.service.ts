import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})


export class MessagesService {

  socket = io("ws://localhost:8080", { path: '/messages' });

  constructor(
    private authService: UserService
  ) {
    this.socket.on('connect', () => this.socket.emit('username', authService.getUsername()))
    this.socket.on( 'response', function( msg ) {
      console.log( msg )
      console.log(msg.from)    
    })
  }

  sendMessage(friendUsername: string, message: string) {
    console.log('sending')
    this.socket.emit('new-message', {
      to_whom: friendUsername,
      message: message
    })
  }

  receiveMessage(msg: any) {
    console.log('received')
    console.log(msg)
    console.log(msg.jsonParse())
  }

}

type message = {
  from: string
  value: string
}