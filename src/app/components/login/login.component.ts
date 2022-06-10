import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LoginDto } from '../../model/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    "username": new FormControl('', [Validators.required]),
    "password": new FormControl('', Validators.required)
  });

  constructor(private service: UserService,
              private router: Router) {}

  async loginUser() {
    const loginDto = new LoginDto(this.loginForm.value.username, this.loginForm.value.password)
    await this.service.login(loginDto);
  }
  
  ngOnInit(): void {
  }

}