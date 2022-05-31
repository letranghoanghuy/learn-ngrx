import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`https://test-b495d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`)
      .pipe(map((data) => {
        const posts: Post[] = [];
        for (let key in data) {
          posts.push({ ...data[key], id: key });
        }
        return posts;
      }))
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://test-b495d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`,
      post
    )
  }

  updatePost(post: Post) {
    const postData = {
      [post.id] : {title: post.title, description: post.description}
    }
    return this.http.patch(`https://test-b495d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`,
      postData
    )
  }

  deletePost(id: string){
    return this.http.delete(
      `https://test-b495d-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json  `
    )
  }
}
