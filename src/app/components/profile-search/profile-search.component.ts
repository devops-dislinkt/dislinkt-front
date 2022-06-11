import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent implements OnInit {
  
  searchForm: FormGroup
  
  constructor(
    public fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      'search': ['', Validators.minLength(3)]
    })
   }

   ngOnInit(): void {
       
   }

   search() {
    const searchString = this.searchForm.value.search
    console.log(searchString)
    
   }

}
