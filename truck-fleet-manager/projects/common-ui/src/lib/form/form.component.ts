import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Location } from '@angular/common';

import { comboField } from '../../constants/types';

@Component({
  selector: 'fm-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() inputLabels: string[] = [];
  @Input() editMode: boolean = false;
  @Input() entityName: string = '';
  @Input() fields: string[] = [];
  @Input() combos: string[] = [];
  @Input() combosFields: comboField[][] = [];
  @Input() title: string = '';

  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Output() formEdit = new EventEmitter<FormGroup>();

  entityForm!: FormGroup;
  categories?: string[];
  passwordVisible: Array<boolean> = Array.prototype.fill(
    false,
    this.fields.filter((field) => field.includes('password')).length
  );

  constructor(
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.dateAdapter.setLocale('es-AR');
  }

  createForm(): void {
    this.entityForm = new FormGroup({});
    this.fields.forEach((field) => {
      this.entityForm?.addControl(
        field,
        new FormControl('', [Validators.required])
      );
    });

    this.combos.forEach((combos) => {
      this.entityForm?.addControl(
        combos,
        new FormControl('', [Validators.required])
      );
    });

    this.formEdit.emit(this.entityForm);
  }

  onSave() {
    this.formSubmit.emit(this.entityForm);
  }

  goBack(): void {
    this.location.back();
  }
}
