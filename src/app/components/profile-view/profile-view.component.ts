import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment, Post } from 'src/app/model/post.model';
import { Profile } from 'src/app/model/profile.model';
import { FollowService } from 'src/app/services/follow.service';
import { PostsService } from 'src/app/services/posts.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {


  profile: Profile | undefined // profile to display
  posts: Post[] = []
  isBlockedByMe: boolean = false
  followRequestStatus: 'SENT' | 'NOT_SENT' | 'APPROVED'

  newComment: string

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    public userService: UserService,
    private followService: FollowService,
    private postService: PostsService,
    ) { }

  async ngOnInit() {
    const username = String(this.route.snapshot.paramMap.get('username'))
    // get profile details
    this.profile = await this.profileService.getProfileDetails(username)
    if (!this.profile || !this.userService.isLoggedIn()) return


    // check if profile is blocked
    this.isBlockedByMe = await this.profileService.isProfileBlockedByMe(this.profile)  
    // check follow request status
    this.followRequestStatus = await this.followService.getFollowingRequestStatus(this.profile)

    // get profile's posts
    // if profile public everything ok
    // if req not approved or profile blocked, posts cannot be seen
    this.posts = await this.postService.getPosts(username)
    if (this.profile.private) {
      (this.followRequestStatus != 'APPROVED' || this.isBlockedByMe) 
        this.posts = [] 
    }    
  }

  async follow() {
    await this.followService.followProfile(this.profile)
    this.followRequestStatus = await this.followService.getFollowingRequestStatus(this.profile)
  }


  async block() {
    await this.profileService.blockProfile(this.profile)
    this.isBlockedByMe = await this.profileService.isProfileBlockedByMe(this.profile)
  }

  async createComment(postId: string) {
    await this.postService.createComment(postId, this.newComment)
    this.posts = await this.postService.getPosts(this.profile.username)

  }

  async likePost(postId: string) {
    await this.postService.likePost(postId)
    this.posts = await this.postService.getPosts(this.profile.username)
  }
  async dislikePost(postId: string) {
    await this.postService.dislikePost(postId)
    this.posts = await this.postService.getPosts(this.profile.username)
  }
  
  isPostLikedByMe(post: Post) {
    console.log(post)
    return post?.like?.some(like => like == this.userService.getUsername())
  }
}
