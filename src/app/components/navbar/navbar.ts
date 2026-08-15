import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Output() navigate = new EventEmitter<string>();

  user = signal<any>(this.getStoredUser());

  getStoredUser() {
    const raw = localStorage.getItem('rescuelink_user');
    return raw ? JSON.parse(raw) : null;
  }

  refreshUser() {
    this.user.set(this.getStoredUser());
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  go(view: string) {
    this.navigate.emit(view);
  }

  logout() {
    localStorage.removeItem('rescuelink_token');
    localStorage.removeItem('rescuelink_user');
    this.refreshUser();
    this.navigate.emit('signup');
  }
}