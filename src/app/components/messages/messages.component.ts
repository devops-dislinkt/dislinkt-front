import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  myUsername: string
  messages: {'from': string, 'value': string}[] = []
  newMsg = ''
  friends: string[] = ['perapera', 'mikamika', 'djuradjura'];
  constructor(
    private messagesService: MessagesService,
    private authService: UserService
  ) { }

  ngOnInit(): void {
    this.messagesService.msgReceived.subscribe(msg => this.receiveMessage(msg))
    this.myUsername = this.authService.getUsername()
  }

  setChatWith(friend: string) {
    console.log(friend)
  }

  sendMessage() {
    const msg = { 'to_whom': 'mikamika', 'message': this.newMsg }
    this.messagesService.sendMessage(msg)
    this.messages.unshift({'from': this.myUsername, 'value': this.newMsg})
    this.newMsg = '' // clear content
  }

  receiveMessage(msg: {'from': string, 'value': string}) {
    this.messages.unshift(msg)
  }

}
