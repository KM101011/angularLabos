import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../profile/userProfile';
import { API_URL } from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient); 
  getUserById(userId: number): Observable<UserProfile> {
  return this.http.get<UserProfile>(`${API_URL}/api/users/${userId}`);
}
}
