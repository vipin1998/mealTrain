import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators , FormGroup} from '@angular/forms'
import { Feedback , ContactType } from '../shared/feedback'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback : Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname' : '',
    'lastname' : '',
    'mobile' : '',
    'email' : ''
  };

  validationMessages = {
    'firstname' : {
      'required' : 'First Name is Required',
      'minlength' : 'First Name must be atleast 2 character long',
      'maxlength' : 'First Name can not be more than 25 character'
    },
    'lastname' : {
      'required' : 'Last Name is Required',
      'minlength' : 'Last Name must be atleast 2 character long',
      'maxlength' : 'Last Name can not be more than 25 character'
    },
    'mobile' : {
      'required' : 'Mobile Number is Required',
      'pattern' : 'Mobile Number must contain only Numbers',
    },
    'email' : {
      'required' : 'Email is Required',
      'email' : 'Invalid Email',
    }

  };
  constructor( private fb : FormBuilder) {
    this.createFrom();
   }

  ngOnInit() {

  }

  createFrom()
  {
    this.feedbackForm = this.fb.group({
      firstname : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      mobile : ['',[Validators.required,Validators.pattern]],
      email : ['',[Validators.required,Validators.email]],
      agree : false,
      contacttype : 'None',
      message : ''
    });
    this.feedbackForm.valueChanges
      .subscribe( data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged( data ? : any)
  {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit()
  {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname : '',
      lastname : '',
      mobile : '',
      agree : false,
      email : '',
      message : '',
      contacttype : 'None'
    });
  }
}
