import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent implements OnInit {
  
  searchForm: FormGroup
  profiles: Profile[] = []

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private profileService: ProfileService,
  ) {
    this.searchForm = this.fb.group({
      'search': ['', [Validators.minLength(3), Validators.required]]
    })
   }

   ngOnInit(): void {
       
   }

   async search() {
    const searchString = this.searchForm.value.search
    const foundProfiles = await this.profileService.searchProfiles(searchString)
    this.profiles = foundProfiles
  }
   visitProfile(profile: Profile) {
    this.router.navigate(['profile', profile.username])
   }

}
