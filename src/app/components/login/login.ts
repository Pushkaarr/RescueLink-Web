import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  successMessage = '';
  errorMessage = '';
  @Output() loggedIn = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    const payload = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:5201/api/auth/login', payload).subscribe({
      next: (response) => {
        this.successMessage = `Welcome back, ${response.fullName}!`;
        localStorage.setItem('rescuelink_token', response.token);
        localStorage.setItem('rescuelink_user', JSON.stringify(response));
        this.loggedIn.emit();
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}