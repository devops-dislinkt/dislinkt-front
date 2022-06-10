import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit(): void {

  }

  logout(): void {
    this.service.logout();
  }

  isLoggedIn(): boolean {
    return this.service.isLoggedIn()
  }

  isUser() {
    return this.service.isUser();
  }

  isUserAdmin(): boolean {
    return this.service.isAdmin();
  }

  getUsername(): string {
    return this.service.getUsername();
  }
}
