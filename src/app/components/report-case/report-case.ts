import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-case',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './report-case.html',
  styleUrl: './report-case.css'
})
export class ReportCase {
  description = '';
  animalType = 'Dog';
  severity = 'Serious';
  photoUrl = '';
  latitude: number | null = null;
  longitude: number | null = null;

  successMessage = '';
  errorMessage = '';
  isGettingLocation = false;

  constructor(private http: HttpClient) {}

  getLocation() {
    this.isGettingLocation = true;
    this.errorMessage = '';

    if (!navigator.geolocation) {
      this.errorMessage = 'Location is not supported on this browser.';
      this.isGettingLocation = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.isGettingLocation = false;
      },
      (error) => {
        this.errorMessage = 'Could not get your location. Please allow location access.';
        this.isGettingLocation = false;
      }
    );
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.latitude === null || this.longitude === null) {
      this.errorMessage = 'Please share your location before submitting.';
      return;
    }

    const payload = {
      description: this.description,
      animalType: this.animalType,
      severity: this.severity,
      photoUrl: this.photoUrl,
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.http.post('http://localhost:5201/api/cases', payload).subscribe({
      next: () => {
        this.successMessage = 'Case reported successfully! Nearby helpers will be notified.';
        this.description = '';
        this.photoUrl = '';
        this.latitude = null;
        this.longitude = null;
      },
      error: (err) => {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    });
  }
}