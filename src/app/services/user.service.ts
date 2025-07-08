import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  constructor(){}

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/users/${userId}`);
  }
}
