import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  fullName = '';
  email = '';
  phoneNumber = '';
  password = '';

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    const payload = {
      fullName: this.fullName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password
    };

    this.http.post('http://localhost:5062/api/auth/signup', payload).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully! You can now log in.';
        this.fullName = '';
        this.email = '';
        this.phoneNumber = '';
        this.password = '';
      },
      error: (err) => {
        this.errorMessage = err.error || 'Something went wrong. Please try again.';
      }
    });
  }
}