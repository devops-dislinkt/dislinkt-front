import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private path = 'http://localhost:8080/api';
  private getPostsPath = this.path + '/list';

  constructor(private http: HttpClient) {
  }
  getPosts(): Observable<any> {
    console.log("get posts requests");
    return this.http.get<any>(this.getPostsPath);
  }
}
