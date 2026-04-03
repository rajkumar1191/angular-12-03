import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addFormData, clearFormData } from '../store/form-data.actions';
import { selectFormDataItems } from '../store/form-data.selectors';
import { FormDataItem } from '../store/form-data.model';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forms.html',
  styleUrls: ['./forms.css'],
})
export class FormsDemo {
  // Template-driven form model
  templateModel = {
    name: '',
    email: '',
    age: null,
  };

  // Reactive form model
  reactiveForm: FormGroup;

  submittedTemplate = false;
  submittedReactive = false;

  formDataItems$: Observable<FormDataItem[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.reactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(120)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agree: [false, [Validators.requiredTrue]],
      skills: this.fb.array([]),
    });

    this.reactiveForm.get('name')?.setValue('Rajkumar');
    console.log('Reactive form initialized', this.reactiveForm.value.name);
    this.formDataItems$ = this.store.select(selectFormDataItems);
  }

  onTemplateSubmit(form: any) {
    console.log('Template form submitted', form);

    this.submittedTemplate = true;
    if (form.valid) {
      console.log('Template form valid data', this.templateModel);
      this.store.dispatch(
        addFormData({
          item: {
            name: this.templateModel.name,
            email: this.templateModel.email,
            age: Number(this.templateModel.age),
            agree: true,
          },
        }),
      );
      this.templateModel = { name: '', email: '', age: null };
      alert(`Template form submitted and state stored`);
    } else {
      console.log('Template form invalid');
    }
  }

  get skills() {
    return this.reactiveForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onReactiveSubmit() {
    this.submittedReactive = true;
    if (this.reactiveForm.valid) {
      const value = this.reactiveForm.value;
      console.log('Reactive form valid data', value);
      this.store.dispatch(
        addFormData({
          item: {
            name: value.name,
            email: value.email,
            age: Number(value.age),
            agree: value.agree,
            skills: value.skills,
          },
        }),
      );
      this.reactiveForm.reset({ name: '', email: '', age: null, password: '', agree: false });
      alert(`Reactive form submitted and state stored`);
    } else {
      console.log('Reactive form invalid', this.reactiveForm.errors);
    }
  }

  clearStoredData() {
    this.store.dispatch(clearFormData());
  }

  get reactive() {
    return this.reactiveForm.controls;
  }
}
