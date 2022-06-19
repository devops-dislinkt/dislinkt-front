import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private path = 'http://localhost:8070/api';
  private getPostsPath = this.path + '/list';
  private likePostPath = this.path + '/like';
  private dislikePostPath = this.path + '/dislike';
  private addCommentPath = this.path + '/comment';

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<any> {
    console.log("get posts");
    return this.http.get<any>(this.getPostsPath);
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
}
