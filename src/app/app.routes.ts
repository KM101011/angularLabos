import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    {path: "", component: HomeComponent, canActivate: [AuthGuard]},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
    {path: "edit", component: EditComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: '/login' }
];
