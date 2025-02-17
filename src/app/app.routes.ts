import { Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from './auth/auth-guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:'login', component:UserLoginComponent},
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'register', component:UserRegisterComponent},
    {path:'home', component:HomeComponent, canActivate: [AuthGuard]}
];
