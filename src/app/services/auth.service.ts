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

  register(registerCredentials: RegisterRequest) {

    delete registerCredentials.confirmPassword; 
    console.log(registerCredentials);
     
    return this.http.post<any>(`${API_URL}/register`, registerCredentials); /* {
      username: credentials.username,
      password: credentials.password,
      name: credentials.name,
      email: credentials.email
    }); */
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
