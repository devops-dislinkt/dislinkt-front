import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserDto } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passConfirm: ['', Validators.required],
    },
      { validator: this.MustMatch('password', 'passConfirm') }
    );
  }

  async signUp() {

    const user: UserDto = new UserDto();
    user.username = this.signupForm.value.username;
    user.password = this.signupForm.value.password;
    user.role = 'user'


    // this.service.signUp(user).subscribe(
    //   (response => {
    //     if (response !== null) {
    //       console.log("sign up successfully");
    //       this.router.navigateByUrl('/login');
    //     }
    //   }),
    //   (error => {
    //     console.log(error.error.message);
    //   })
    // );
    await this.service.signUp(user);
  }


  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
