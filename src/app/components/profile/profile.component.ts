import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  basicInfoForm: FormGroup
  workExperienceForm: FormGroup  
  educationForm: FormGroup
  usernameForm: FormGroup

  employmentType = [ 'FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE', 'CONTRACT']

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.basicInfoForm = this.fb.group({
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'email': [''],
      'phone_number': [''],
      'birthday': [''],
      'biography': [''],
      'skills': [''],
      'interests': [''],
      'private': false,
    })

    this.workExperienceForm = this.fb.group({
      "title": ['', Validators.required],
      "type": [''],
      "company": [''],
      "location": [''],
      "currently_working":  [''],
      "start_date":  [''],
      "end_date":  [''],
    })

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
    // const profile:UserDto =  await this.userService.getProfileDetails()
    // console.log(profile)
  }

  updateBasicInfo() {

  }

  updateWorkExperience() {

  }

  updateEducation() {

  }

  updateUsername() {
    
  }
}
