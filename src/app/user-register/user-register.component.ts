import { Component } from '@angular/core';
import {
  FormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
  user: User = new User();

  confirmPassword = '';
  photo_profile = 'photo';
  biography = 'New User';
  maxBirthday: string = '';
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';

  private fecha = new Date();

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit() {
    this.setMaxBirthday();
  }

  register() {
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const year = this.fecha.getFullYear();
    const month = (this.fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = this.fecha.getDate().toString().padStart(2, '0');

    this.user.created_at = `${year}-${month}-${day}`;
    this.user.photo_profile = this.photo_profile;
    this.user.biography = this.biography;

    this.authService.register(this.user).subscribe({
      next: (response) => {
        alert('User registered successfully');
        this.login();
        console.log(response);
      },
      error: (err: any) => {
        alert('Username or Email already exists!');
        console.error(err);
      },
    });
  }

  login() {
    this.route.navigate(['/login']);
  }

  //Validations

  setMaxBirthday() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 14);
    this.maxBirthday = today.toISOString().split('T')[0];
  }

  isPasswordValid(): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[%$;&.,#]).{8,12}$/;
    return this.user.password ? regex.test(this.user.password) : false;
  }

  isEmailValid(): boolean {
    const regex = new RegExp(this.emailPattern);
    return this.user.email ? regex.test(this.user.email) : false;
  }
}
