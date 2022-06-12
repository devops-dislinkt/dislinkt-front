import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  profile: Profile

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    public userService: UserService,
    ) { }

  async ngOnInit() {
    const username = String(this.route.snapshot.paramMap.get('username'));
    const response = await this.profileService.getProfileDetails(username)
    if (response instanceof Profile) this.profile = response
  }

  async follow() {

  }
  async block() {
    
  }
}
