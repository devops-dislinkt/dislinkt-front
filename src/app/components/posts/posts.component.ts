import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private service: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.service.getPosts().subscribe((data: Post[]) => {
      console.log('get posts requests = ', data);
      this.posts = data;
    }, error => {
      console.log('error = ', error);
    });
  }

  likePost(postId: string){
    console.log("like post = ", postId)
  }
  
  dislikePost(postId: string){
    console.log("dislike post = ", postId)
  }
  
}
