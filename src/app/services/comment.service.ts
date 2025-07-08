import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../environment/enviroment';

export interface Comment {
  id?: number;
  user_id: number;
  username: string;
  content: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private http = inject(HttpClient);

  constructor() {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${API_URL}/api/comments`);
  }

  addComment(comment: Comment): Observable<any> {
    return this.http.post(`${API_URL}/api/comments`, comment);
  }

  updateComment(commentId: number, userId: number, content: string): Observable<any> {
    return this.http.put(`${API_URL}/api/comments/${commentId}`, { userId, content });
  }

  deleteComment(commentId: number, userId: number): Observable<any> {
    return this.http.request('delete', `${API_URL}/api/comments/${commentId}`, { body: { userId } });
  }
}