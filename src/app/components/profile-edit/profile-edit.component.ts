import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile, WorkExperience } from 'src/app/model/profile.model';
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
  basicInfoForm: FormGroup
  workExperienceForm: FormGroup  
  educationForm: FormGroup
  usernameForm: FormGroup

  employmentType = [ 'FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE', 'CONTRACT']

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
  ) {

    this.educationForm = this.fb.group({
      "school": ['', Validators.required],
      "degree": [''],
      "field_of_study": [''],
      "start_date": [''],
      "end_date": [''],
      "description": [''],
    })
    
    this.usernameForm = this.fb.group({
      'username': ['', Validators.required]
    })
  }

  async ngOnInit() {
    const username = this.userService.getUsername()
    this.profile = await this.profileService.getProfileDetails(username)
    if (this.profile.work_experience[0]) this.workExperience = this.profile.work_experience[0]
  }

  updateBasicInfo() {
    if (this.profile.birthday instanceof Date) {
      this.profile.birthday = this.profile.birthday.toLocaleDateString('en-CA')
    }
    this.profileService.updateBasicInfo(this.profile)
  }

  updateWorkExperience() {
    this.profile.work_experience = this.workExperience
    if (this.workExperience.start_date instanceof Date) 
      this.workExperience.start_date = this.workExperience.start_date.toLocaleDateString('en-CA')
    if (this.workExperience.end_date instanceof Date) 
      this.workExperience.end_date = this.workExperience.end_date.toLocaleDateString('en-CA')
    
    this.profileService.updateWorkExperience(this.profile.username,this.workExperience)
    
  }

  updateEducation() {

  }

  updateUsername() {
    console.log(this.usernameForm.value)
  }

  
  private updateForms() {


    this.educationForm = this.fb.group({
      "school": [this.profile.education.school, Validators.required],
      "degree": [this.profile.education.degree],
      "field_of_study": [this.profile.education.field_of_study],
      "start_date": [this.profile.education.start_date],
      "end_date": [this.profile.education.end_date],
      "description": [this.profile.education.description],
    })
    
    this.usernameForm = this.fb.group({
      'username': [this.profile.username, Validators.required]
    })
  }

}
