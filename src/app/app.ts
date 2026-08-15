import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login';
import { ReportCase } from './components/report-case/report-case';
import { CaseDetail } from './components/case-detail/case-detail';
import { CaseFeed } from './components/case-feed/case-feed';
import { Navbar } from './components/navbar/navbar';

type View = 'signup' | 'login' | 'report' | 'case' | 'feed';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Signup, Login, ReportCase, CaseDetail, CaseFeed, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'rescuelink-web';
  currentView: View = 'signup';
  selectedCaseId = 1;

  @ViewChild(Navbar) navbar!: Navbar;

  setView(view: string) {
    this.currentView = view as View;
  }

  onLoginSuccess() {
    this.navbar.refreshUser();
    this.currentView = 'feed';
  }

  onViewCase(id: number) {
    this.selectedCaseId = id;
    this.currentView = 'case';
  }
}