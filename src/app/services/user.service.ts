import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../profile/userProfile';
import { API_URL } from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}

  //private http = inject(HttpClient); 
  getUserById(userId: number): Observable<any> {
    console.log(userId)
    return this.http.get<any>(`${API_URL}/api/users/${userId}`);
  }
}
