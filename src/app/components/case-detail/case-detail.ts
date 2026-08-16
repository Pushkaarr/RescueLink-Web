import { Component, OnInit, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './case-detail.html',
  styleUrl: './case-detail.css'
})
export class CaseDetail implements OnInit {
  @Input() caseId = 1;
  caseData = signal<any>(null);
  comments = signal<any[]>([]);
  newComment = '';

  errorMessage = signal('');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCase();
    this.loadComments();
  }

  loadCase() {
    this.http.get(`http://localhost:5201/api/cases/${this.caseId}`).subscribe({
      next: (data) => this.caseData.set(data),
      error: () => this.errorMessage.set('Could not load case.')
    });
  }

  loadComments() {
    this.http.get<any[]>(`http://localhost:5201/api/cases/${this.caseId}/comments`).subscribe({
      next: (data) => this.comments.set(data),
      error: () => {}
    });
  }

  postComment() {
    const token = localStorage.getItem('rescuelink_token');
    if (!token) {
      this.errorMessage.set('Please log in to comment.');
      return;
    }
    if (!this.newComment.trim()) return;

    this.http.post(
      `http://localhost:5201/api/cases/${this.caseId}/comments`,
      { message: this.newComment },
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: () => {
        this.newComment = '';
        this.loadComments();
      },
      error: () => this.errorMessage.set('Could not post comment.')
    });
  }

  claimCase() {
    const token = localStorage.getItem('rescuelink_token');
    if (!token) {
      this.errorMessage.set('Please log in to claim a case.');
      return;
    }

    this.http.put(
      `http://localhost:5201/api/cases/${this.caseId}/claim`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: () => this.loadCase(),
      error: () => this.errorMessage.set('Could not claim case (maybe already claimed).')
    });
  }

  unclaimCase() {
    const token = localStorage.getItem('rescuelink_token');
    if (!token) {
      this.errorMessage.set('Please log in to unclaim a case.');
      return;
    }

    this.http.put(
      `http://localhost:5201/api/cases/${this.caseId}/unclaim`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: () => this.loadCase(),
      error: () => this.errorMessage.set('Could not unclaim case.')
    });
  }
}