import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login';
import { ReportCase } from './components/report-case/report-case';
import { CaseDetail } from './components/case-detail/case-detail';

type View = 'signup' | 'login' | 'report' | 'case';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Signup, Login, ReportCase, CaseDetail],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'rescuelink-web';
  currentView: View = 'signup';

  setView(view: View) {
    this.currentView = view;
  }
}