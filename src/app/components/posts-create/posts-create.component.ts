import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {

  post: Post = new Post()
  link: string
  image: string
  constructor(
    private postService: PostsService,
  ) { }

  ngOnInit(): void {
  }

  async createPost() {
    await this.postService.createPost(this.post)
  }
}
