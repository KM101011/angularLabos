import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}
   
  getUserById(userId: number): Observable<any> {
    console.log(userId)
    return this.http.get<any>(`${API_URL}/api/users/${userId}`);
  }
}
