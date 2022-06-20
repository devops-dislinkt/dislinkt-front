import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postPath = 'http://localhost:8070/api/post';
  private likePostPath = this.postPath + '/like';
  private dislikePostPath = this.postPath + '/dislike';
  private addCommentPath = this.postPath + '/comment';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private authService: UserService
  ) { }

  async createPost(post: Post) {
    try {
      const headers = new HttpHeaders({'user': this.authService.getUsername()})
      console.log(post)
      const response = await this.http.post<number>(this.postPath, post, {headers}).toPromise()
      this.openSuccessSnackBar(`successfully created post: ${post.title}`)
      return response 
    } catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
  }

  getPosts(): Observable<any> {
    console.log("get posts");
    return this.http.get<Post[]>(this.postPath);
  }

  likePost(id: string): Observable<any> {
    console.log("like posts = ", id);
    let obj = {
      "post_id": id,
      "username": "username10"
    }
    return this.http.post<any>(this.likePostPath, obj);
  }

  dislikePost(id: string): Observable<any> {
    console.log("dislike posts id = ", id);
    let obj = {
      "post_id": id,
      "username": "username10"
    }
    return this.http.post<any>(this.dislikePostPath, obj);
  }

  addComment(id: string, comment: any): Observable<any> {
    let obj = {
      "post_id": id,
      "username": "username1",
      "comment": comment
    }
    return this.http.post<any>(this.addCommentPath, obj);
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
      duration: 4000,
    });
  }
  openFailSnackBar(message = 'Something went wrong.'): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['red-snackbar'],
      duration: 4000,
    });
  }
}
