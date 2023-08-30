import { Validators } from '@angular/forms';

export interface FormField {
    [fieldName: string]: [string, Validators[]];
  }