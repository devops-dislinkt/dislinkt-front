import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/model/profile.model';
import { FollowService } from 'src/app/services/follow.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  profiles: Profile[] = []
  searchForm: FormGroup
  chatWith = ''

  myUsername: string
  messages: { 'from': string, 'value': string, 'to_whom'?: string }[] = []
  newMsg = ''
  friends: string[] = []

  constructor(
    private messagesService: MessagesService,
    private authService: UserService,
    private profileService: ProfileService,
    public fb: FormBuilder,
    private followService: FollowService,
  ) {
    this.searchForm = this.fb.group({
      'search': ['', [Validators.minLength(3), Validators.required]]
    })
  }

  ngOnInit(): void {
    this.messagesService.msgReceived.subscribe(msg => this.receiveMessage(msg))
    this.myUsername = this.authService.getUsername()
  }

  addFriend(friendUsername: string) {
    if (this.friends.some(f => f === friendUsername)) return
    this.friends.unshift(friendUsername)

    this.setChatWith(friendUsername)
  }

  setChatWith(friendUsername: string) {
    this.chatWith = friendUsername
  }


  sendMessage() {
    const msg = { 'to_whom': this.chatWith, 'message': this.newMsg }
    this.messagesService.sendMessage(msg)
    this.messages.unshift({ 'to_whom': this.chatWith, 'value': this.newMsg, 'from': this.myUsername })
    this.newMsg = '' // clear content
  }

  receiveMessage(msg: { 'from': string, 'value': string }) {
    this.addFriend(msg.from)
    this.messages.unshift(msg)
  }

  async search() {
    if (!this.searchForm.valid) return
    const searchString = this.searchForm.value.search
    let foundProfiles = await this.profileService.searchProfiles(searchString)

    // // remove myself
    foundProfiles = foundProfiles.filter(p => p.username !== this.myUsername)


    this.profiles = await this.filter(foundProfiles, async (p: Profile) => {
      const isBlockedByMe = await this.profileService.isProfileBlockedByMe(p)
      const followRequestStatus = await this.followService.getFollowingRequestStatus(p)
      if (followRequestStatus != 'APPROVED' || isBlockedByMe) {
      }
      else {
        return p
      }
    })

  }

  // helper function for async filter
  async filter(arr: any[], callback: any) {
    const fail = Symbol()
    return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
  }

}
