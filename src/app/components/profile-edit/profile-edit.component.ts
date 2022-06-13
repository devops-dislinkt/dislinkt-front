import { Component, OnInit } from '@angular/core';
import { Education, Profile, WorkExperience } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profile: Profile = new Profile()
  workExperience = new WorkExperience()
  education = new Education()


  employmentType = [ 'FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE', 'CONTRACT']

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
  ) {
    
  }

  async ngOnInit() {
    const username = this.userService.getUsername()
    this.profile = await this.profileService.getProfileDetails(username)
    if (this.profile.work_experience[0]) this.workExperience = this.profile.work_experience[0]
    if (this.profile.education[0]) this.education = this.profile.education[0]
  }

  updateBasicInfo() {
    if (this.profile.birthday instanceof Date) {
      this.profile.birthday = this.profile.birthday.toLocaleDateString('en-CA')
    }
    this.profileService.updateBasicInfo(this.profile)
  }

  updateWorkExperience() {
    if (this.workExperience.start_date instanceof Date) 
      this.workExperience.start_date = this.workExperience.start_date.toLocaleDateString('en-CA')
    if (this.workExperience.end_date instanceof Date) 
      this.workExperience.end_date = this.workExperience.end_date.toLocaleDateString('en-CA')
    
    this.profileService.updateWorkExperience(this.profile.username,this.workExperience)
    
  }

  updateEducation() {
    if (this.education.start_date instanceof Date) 
      this.education.start_date = this.education.start_date.toLocaleDateString('en-CA')
    if (this.education.end_date instanceof Date) 
      this.education.end_date = this.education.end_date.toLocaleDateString('en-CA')
    
      this.profileService.updateEducation(this.profile.username, this.education)
  }

  updateUsername() {
    console.log(this.profile.username)
  }

}
