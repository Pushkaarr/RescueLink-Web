import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login';
import { ReportCase } from './components/report-case/report-case';
import { CaseDetail } from './components/case-detail/case-detail';
import { Navbar } from './components/navbar/navbar';

type View = 'signup' | 'login' | 'report' | 'case';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Signup, Login, ReportCase, CaseDetail, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'rescuelink-web';
  currentView: View = 'signup';

  @ViewChild(Navbar) navbar!: Navbar;

  setView(view: string) {
    this.currentView = view as View;
  }

  onLoginSuccess() {
    this.navbar.refreshUser();
    this.currentView = 'report';
  }
}