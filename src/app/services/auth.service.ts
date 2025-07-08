import { HttpClient } from "@angular/common/http";
import { inject, Injectable} from "@angular/core";
import { API_URL } from "../environment/enviroment";
import { LocalStorageService } from "./local-storage.service";
import { User } from "../profile/user";

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

  private http = inject(HttpClient);
  private localstorage = inject(LocalStorageService)

  constructor() {}

  login(credentials: LoginRequest) {
    return this.http.post<any>(`${API_URL}/login`, credentials);
  }

  register(registerCredentials: RegisterRequest) {

    delete registerCredentials.confirmPassword;
    return this.http.post<any>(`${API_URL}/register`, registerCredentials);
  }

  setLoggedInUser(user: User){
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
