import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Signup } from './components/signup/signup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Signup],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'rescuelink-web';
}