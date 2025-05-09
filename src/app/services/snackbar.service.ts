import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private defaultDuration = 3000; // Set default duration in milliseconds

  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action: string = 'Close', duration?: number) {
    const config: MatSnackBarConfig = {
      duration: duration ?? this.defaultDuration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, action, config);
  }

  success(message: string, duration?: number) {
    this.open(`✅ ${message}`, 'Close', duration);
  }

  error(message: string, duration?: number) {
    this.open(`❌ ${message}`, 'Close', duration);
  }

  info(message: string, duration?: number) {
    this.open(`ℹ️ ${message}`, 'Close', duration);
  }
}
