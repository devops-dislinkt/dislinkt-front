import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { PostsCreateComponent } from './components/posts-create/posts-create.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'posts-create', component: PostsCreateComponent},
      { path: 'edit-profile', component: ProfileEditComponent},
      { path: 'profile/:username', component: ProfileViewComponent},
      { path: 'messages', component: MessagesComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
