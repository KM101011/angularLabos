import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Comment {
  id?: number;
  user_id: number;
  username: string;
  content: string;
  timestamp?: string;
}

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = 'http://localhost:8081/api/comments';

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }

  addComment(comment: Comment): Observable<any> {
    return this.http.post(this.apiUrl, comment);
  }

  updateComment(commentId: number, userId: number, content: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${commentId}`, { userId, content });
  }

  deleteComment(commentId: number, userId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${commentId}`, { body: { userId } });
  }
}