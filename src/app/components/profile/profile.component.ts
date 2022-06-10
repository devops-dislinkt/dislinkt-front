import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  basicInfoForm: FormGroup;
  privateControl = new FormControl()

  constructor(
    private fb: FormBuilder,
  ) {
    this.basicInfoForm = this.fb.group({
      'first_name': [''],
      'last_name': [''],
      'email': [''],
      'phone_number': [''],
      'birthday': [''],
      'biography': [''],
      'skills': [''],
      'interests': [''],
      'private': false,
    })
  }

  ngOnInit(): void {
  }

}
