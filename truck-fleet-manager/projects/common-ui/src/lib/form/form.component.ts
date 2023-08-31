import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/app/models/form-field.model';

@Component({
  selector: 'fm-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {

  @Input() editMode: boolean = false;
  @Input() entityName: string = '';
  @Input() fields: string[] = [];
  
  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Output() formEdit = new EventEmitter<FormGroup>();

  entityForm!: FormGroup;  

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const formGroupConfig: FormField = {};
    this.fields.forEach(field => {
      formGroupConfig[field] = ['', [Validators.required]];
    });
    this.entityForm = this.formBuilder.group(formGroupConfig);
    this.formEdit.emit(this.entityForm);
  }

  onSave(){        
    this.formSubmit.emit(this.entityForm);
   }
}
