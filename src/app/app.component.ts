import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { API_URL } from './environment/enviroment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'AngularLabos';

  constructor(private router: Router) {
  }

  ngOnInit() {

    /* const storedUser = localStorage.getItem('currentUser');
    console.log(storedUser);
    if (!storedUser) {
      console.log(storedUser)
      this.router.navigateByUrl('/login');
      return;
    } */
  }
}
