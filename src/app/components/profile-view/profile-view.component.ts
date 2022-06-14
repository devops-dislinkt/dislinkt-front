import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/model/profile.model';
import { FollowService } from 'src/app/services/follow.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {


  profile: Profile | undefined // profile to display
  isBlockedByMe: boolean = false
  followRequestStatus: 'SENT' | 'NOT_SENT' | 'APPROVED'

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    public userService: UserService,
    private followService: FollowService,
    ) { }

  async ngOnInit() {
    const username = String(this.route.snapshot.paramMap.get('username'))
    this.profile = await this.profileService.getProfileDetails(username)
    if (!this.profile || !this.userService.isLoggedIn()) return

    // check if profile is blocked
    this.isBlockedByMe = await this.profileService.isProfileBlockedByMe(this.profile)  
    // check follow request status
    this.followRequestStatus = await this.followService.getFollowingRequestStatus(this.profile)
    
  }

  async follow() {
    await this.followService.followProfile(this.profile)
    this.followRequestStatus = await this.followService.getFollowingRequestStatus(this.profile)
  }


  async block() {
    await this.profileService.blockProfile(this.profile)
    this.isBlockedByMe = await this.profileService.isProfileBlockedByMe(this.profile)
  }
}
