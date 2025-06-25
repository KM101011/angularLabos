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
    confirmPassword: string,
    name: string,
    email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public value = false;

  errorEmitter = new Subject<string>();

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService) {}

   login(credentials: LoginRequest) {
    return this.http.post<any>(`${API_URL}/login`, credentials);
  }

  register(credentials: RegisterRequest) {
    //delete credentials.confirmPassword
    this.http.post(`${API_URL}/register`, {
      username: credentials.username,
      password: credentials.password,
      password2: credentials.confirmPassword,
      email: credentials.email,
      name: credentials.name
    }).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: (err) => {
      if(err){
        console.log(err);
        console.log("Something wrong with inputing form");
      }
    }
    });
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
