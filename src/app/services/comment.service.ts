import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL_COMMENTS } from '../environment/enviroment';

export interface Comment {
  id?: number;
  user_id: number;
  username: string;
  content: string;
  timestamp?: string;
}

@Injectable({ providedIn: 'root' })
export class CommentService {
  

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(API_URL_COMMENTS);
  }

  addComment(comment: Comment): Observable<any> {
    return this.http.post(API_URL_COMMENTS, comment);
  }

  updateComment(commentId: number, userId: number, content: string): Observable<any> {
    return this.http.put(`${API_URL_COMMENTS}/${commentId}`, { userId, content });
  }

  deleteComment(commentId: number, userId: number): Observable<any> {
    return this.http.request('delete', `${API_URL_COMMENTS}/${commentId}`, { body: { userId } });
  }
}