import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  public commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

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

  onSubmit(postId: string) {
    console.log("submit = ", this.commentForm.value)
    this.service.addComment(postId, this.commentForm.value.comment).subscribe(response => {
      this.getPosts();
      this.commentForm.reset();
      /*Swal.fire({
        title: 'Success!',
        text: 'Comment successfully created!',
        icon: 'success',
        confirmButtonText: 'OK'
      });*/
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong!',
        icon: 'error',
        confirmButtonColor: '#DC143C',
        confirmButtonText: 'OK'
      });
    });
  }

  likePost(postId: string) {
    console.log("like post = ", postId)
    this.service.likePost(postId).subscribe((data: any) => {
      console.log('like post = data ', data);
      //this.posts = data;
      this.getPosts();
    }, error => {
      console.log('error = ', error);
    });
  }

  dislikePost(postId: string) {
    console.log("dislike post = ", postId)
    this.service.dislikePost(postId).subscribe((data: any) => {
      console.log('dislike post data = ', data);
      //this.posts = data;
      this.getPosts();
    }, error => {
      console.log('error = ', error);
    });
  }

  get f() {
    return this.commentForm.controls;
  }

}
