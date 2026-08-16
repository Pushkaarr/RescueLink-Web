import { Component, signal } from '@angular/core';
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
  photoUrl = signal('');
  latitude: number | null = null;
  longitude: number | null = null;

  successMessage = signal('');
  errorMessage = signal('');
  isGettingLocation = signal(false);
  isUploadingPhoto = signal(false);

  private cloudName = 'ifqv28eh';
  private uploadPreset = 'Rescue';

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.isUploadingPhoto.set(true);
    this.errorMessage.set('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    this.http.post<any>(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      formData
    ).subscribe({
      next: (response) => {
        this.photoUrl.set(response.secure_url);
        this.isUploadingPhoto.set(false);
      },
      error: () => {
        this.errorMessage.set('Photo upload failed. Please try again.');
        this.isUploadingPhoto.set(false);
      }
    });
  }

  getLocation() {
    this.isGettingLocation.set(true);
    this.errorMessage.set('');

    if (!navigator.geolocation) {
      this.errorMessage.set('Location is not supported on this browser.');
      this.isGettingLocation.set(false);
      return;
    }

    let finished = false;

    const failSafeTimer = setTimeout(() => {
      if (!finished) {
        finished = true;
        this.isGettingLocation.set(false);
        this.errorMessage.set('Location took too long. Please check your device location settings and try again.');
      }
    }, 10000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (finished) return;
        finished = true;
        clearTimeout(failSafeTimer);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.isGettingLocation.set(false);
      },
      (error) => {
        if (finished) return;
        finished = true;
        clearTimeout(failSafeTimer);
        this.errorMessage.set('Could not get your location. Please try again.');
        this.isGettingLocation.set(false);
      },
      {
        timeout: 10000,
        enableHighAccuracy: false,
        maximumAge: 60000
      }
    );
  }

  onSubmit() {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.latitude === null || this.longitude === null) {
      this.errorMessage.set('Please share your location before submitting.');
      return;
    }

    const payload = {
      description: this.description,
      animalType: this.animalType,
      severity: this.severity,
      photoUrl: this.photoUrl(),
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.http.post('http://localhost:5201/api/cases', payload).subscribe({
      next: () => {
        this.successMessage.set('Case reported successfully! Nearby helpers will be notified.');
        this.description = '';
        this.photoUrl.set('');
        this.latitude = null;
        this.longitude = null;
      },
      error: (err) => {
        this.errorMessage.set('Something went wrong. Please try again.');
      }
    });
  }
}