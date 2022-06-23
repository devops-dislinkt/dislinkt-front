import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  friends: string[] = ['perapera', 'mikamika', 'djuradjura'];
  constructor() { }

  ngOnInit(): void {
  }

  setChatWith(friend: string) {
    console.log(friend)
  }

}
