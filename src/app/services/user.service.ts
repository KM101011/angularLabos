import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../profile/userProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api';  
  getUserById(userId: number): Observable<UserProfile> {
  return this.http.get<UserProfile>(`http://localhost:8081/api/users/${userId}`);
}
}
