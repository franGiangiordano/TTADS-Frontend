import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración del mensaje en ms
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar' // Clases CSS para estilo de éxito o error
    });
  }
}
