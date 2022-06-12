import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

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
    ) { }

  async ngOnInit() {
    const username = String(this.route.snapshot.paramMap.get('username'));
    this.profile = await this.profileService.getProfileDetails(username)
    console.log(this.profile)
  }

  async follow() {

  }
  async block() {
    
  }
}
