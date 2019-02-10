import {Component} from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
})
export class Home {
  languages = [];//["English", "Spanish", "Other"];

  model = new Employee('', '', false, '', 'default');
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPoster){
    this.formPoster.getLanguages()
    .delay(5000)
    .subscribe(
      data => this.languages = data.languages,
      err => console.log('get error: ', err)
    );
  }

  submitForm(form: NgForm) {

    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if (this.hasPrimaryLanguageError) {
      return;
    } else {

    }
    this.formPoster.postEmployeeForm(this.model)
        .subscribe(
          data => console.log('success: ', data),
          err => console.log('error: ', err)
        );

  }

  firstNameToUpperCase(value: string){
    if (value.length > 0) {
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      this.model.firstName = value;
    }
  }

  lastNameToUpperCase(value: string){
    if (value.length > 0) {
      this.model.lastName = value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      this.model.lastName = value;
    }
  }

  validatePrimaryLanguage(value){
    if (value === 'default') {
      this.hasPrimaryLanguageError = true;
    } else {
      this.hasPrimaryLanguageError = false;
    }
  }
}
