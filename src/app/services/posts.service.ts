import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { Post } from '../model/post.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postPath = 'http://localhost:8070/api/post';
  private likePostPath = 'http://localhost:8070/api/like';
  private dislikePostPath = 'http://localhost:8070/api/dislike';
  private commentPath = 'http://localhost:8070/api/comment';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: UserService
  ) { }

  async createPost(post: Post) {
    try {
      const headers = new HttpHeaders({ 'user': this.authService.getUsername() })
      const response = await this.http.post<number>(this.postPath, post, { headers }).toPromise()
      this.openSuccessSnackBar(`successfully created post: ${post.title}`)
      this.router.navigate(['/'])
    } catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
  }

  async getPosts(username: string) {
    try {
      const logged_in_username = this.authService.getUsername()
      if (logged_in_username) {
        const headers = new HttpHeaders({ 'user': this.authService.getUsername() })
        return await this.http.get<Post[]>(`${this.postPath}/${username}`, { headers }).toPromise()
      }
      else {
        return await this.http.get<Post[]>(`${this.postPath}/${username}`).toPromise()
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
  }

  async createComment(postId: string, comment: string) {
    try {
      const logged_in_username = this.authService.getUsername()
      const headers = new HttpHeaders({ 'user': this.authService.getUsername() })
      const data = {
        'post_id': postId,
        'username': logged_in_username,
        'comment': comment
      }
      console.log(data)

      return await this.http.post<any>(this.commentPath, data, { headers }).toPromise()
    } catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()
    }
  }

  async likePost(id: string) {
    try {
      const logged_in_username = this.authService.getUsername()
      const headers = new HttpHeaders({ 'user': this.authService.getUsername() })
      let data = {
        "post_id": id,
        "username": logged_in_username
      }
      return this.http.post<any>(this.likePostPath, data, {headers}).toPromise()
    } catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()      
    }
  }

  async dislikePost(id: string) {
    try {
      const logged_in_username = this.authService.getUsername()
      const headers = new HttpHeaders({ 'user': this.authService.getUsername() })
      let data = {
        "post_id": id,
        "username": logged_in_username
      }
      return this.http.post<any>(this.dislikePostPath, data, {headers}).toPromise()
    } catch (error) {
      if (error instanceof HttpErrorResponse) this.openFailSnackBar(error.error)
      else this.openFailSnackBar()      
    }
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
