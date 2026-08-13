import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Signup, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'rescuelink-web';
  showLogin = false;

  toggleView() {
    this.showLogin = !this.showLogin;
  }
}