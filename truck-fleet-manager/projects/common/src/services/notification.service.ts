import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message: string | Record<string, any>, type: 'success' | 'error'): void {
    let errorMessage = '';

    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    };

    if (typeof message === 'string') {
      this.snackBar.open(message, 'Cerrar', config);
    } else if (typeof message === 'object') {
      const keys = Object.keys(message) as Array<keyof typeof message>;

      for (const key of keys) {
        errorMessage += String(message[key]) + '\n';
      }

      this.snackBar.open(errorMessage, 'Cerrar', config);
    }
  }
}
