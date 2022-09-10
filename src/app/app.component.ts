import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isSave = false;
  options: any = ['Male', 'FeMale', 'Others', 'I do not wish to say'];
  saveName = 'John Wick';
  saveEmail = 'donottake@mydog.com';
  savePhone = '0123456789';
  saveNotes =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  saveGender = 'Male';
  form?: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.saveName, Validators.required],
      email: [this.saveEmail, [Validators.required, Validators.email]],
      phone: [
        this.savePhone,
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(8),
          Validators.pattern('[0-9]*'),
        ],
      ],
      notes: [this.saveNotes, Validators.required],
      gender: [this.saveGender, [Validators.required]],
    });
  }
  onSave() {
    if (this.form?.invalid) {
      return;
    } else {
      this.isSave = !this.isSave;
      this.saveName = this.form?.get('name')?.value;
      this.savePhone = this.form?.get('phone')?.value;

      this.saveEmail = this.form?.get('email')?.value;

      this.saveGender = this.form?.get('gender')?.value;
      this.saveNotes = this.form?.get('notes')?.value;
    }
  }
}
