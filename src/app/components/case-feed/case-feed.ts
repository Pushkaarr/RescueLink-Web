import { Component, OnInit, signal, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-case-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-feed.html',
  styleUrl: './case-feed.css'
})
export class CaseFeed implements OnInit {
  cases = signal<any[]>([]);
  errorMessage = signal('');

  @Output() viewCase = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCases();
  }

  loadCases() {
    this.http.get<any[]>('http://localhost:5201/api/cases').subscribe({
      next: (data) => this.cases.set(data),
      error: () => this.errorMessage.set('Could not load cases.')
    });
  }

  openCase(id: number) {
    this.viewCase.emit(id);
  }
}