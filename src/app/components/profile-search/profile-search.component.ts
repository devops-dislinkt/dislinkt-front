import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/model/profile.model';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent implements OnInit {
  
  searchForm: FormGroup
  profiles: Profile[] = [
    {'firstName': 'pera', 'lastName': 'petrovic', 'email': 'asdf@gmail.com', username: 'pera', id: 1, private: false, role: 'user'},
    {'firstName': 'mika', 'lastName': 'mikic', 'email': 'asdf@gmail.com', username: 'pera', id: 1, private: true, role: 'user'},

  ]

  constructor(
    public fb: FormBuilder,
    public router: Router,
  ) {
    this.searchForm = this.fb.group({
      'search': ['', [Validators.minLength(3), Validators.required]]
    })
   }

   ngOnInit(): void {
       
   }

   search() {
    const searchString = this.searchForm.value.search
    console.log(searchString)

   }
   visitProfile(profile: Profile) {
    console.log(profile)
    // this.router.navigateByUrl(`profile/${profile.id}`)
   }

}
