import { EventEmitter, Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})


export class MessagesService {

  socket = io("ws://localhost:8080", { path: '/messages' });

  msgReceived = new EventEmitter<{'from': string, 'value': string}>()

  constructor(
    private authService: UserService
  ) {
    this.socket.on('connect', () => this.socket.emit('username', authService.getUsername()))
    this.socket.on( 'response', ( msg:{'from': string, 'value': string} ) => this.msgReceived.emit(msg))
  }

  sendMessage(msg: {'to_whom': string, 'message': string}) {
    this.socket.emit('new-message', msg)
  }
}
