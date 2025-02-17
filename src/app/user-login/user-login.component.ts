import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserAuth } from '../models/auth/user-auth';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  user: UserAuth = new UserAuth();
  token: string | null = '';  

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        this.token = response.token;

        if (this.token) {
          sessionStorage.setItem('authToken', this.token);
          sessionStorage.setItem('username', this.user.username);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        alert('Invalid credentials or server error');
        console.error(err);
      }
    });
  }
}
