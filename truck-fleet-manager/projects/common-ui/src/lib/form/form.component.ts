import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'fm-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {

  @Input() editMode: boolean = false;
  @Input() entityName: string = '';
  @Input() fields: string[] = [];
  @Input() title: string = '';

  
  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Output() formEdit = new EventEmitter<FormGroup>();

  entityForm!: FormGroup;  

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.entityForm = new FormGroup({});
    this.fields.forEach(field => {
      this.entityForm?.addControl(field, new FormControl('', 
      [Validators.required])
      );
    });      
    this.formEdit.emit(this.entityForm);    
  }

  onSave(){     
    this.formSubmit.emit(this.entityForm);
   }
}