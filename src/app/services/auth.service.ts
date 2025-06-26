import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable} from "@angular/core";
import { API_URL } from "../environment/enviroment";
import { LocalStorageService } from "./local-storage.service";


export interface LoginRequest{
  username: string,
  password: string
}

export interface RegisterRequest{
    username: string,
    password: string,
    confirmPassword?: string,
    name: string,
    email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorEmitter = new Subject<string>();

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService) {}

   login(credentials: LoginRequest) {
    return this.http.post<any>(`${API_URL}/login`, credentials);
  }

  register(credentials: RegisterRequest) {

    if(credentials.password === credentials.confirmPassword) delete credentials.confirmPassword; 
     
    this.http.post(`${API_URL}/register`, {
      username: credentials.username,
      password: credentials.password,
      password2: credentials.confirmPassword,
      email: credentials.email,
      name: credentials.name
    })
  }

  setLoggedInUser(user: any){
    this.localstorage.set('currentUser', user);
  }

  getLoggedInUser(){
    return this.localstorage.get('currentUser');
  }

  deleteLoggedInUser(){
    this.localstorage.delete('currentUser');
  }

  isLoggedIn(): boolean{
    return this.getLoggedInUser();
  }
}
