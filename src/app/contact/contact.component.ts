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
  constructor( private fb : FormBuilder) {
    this.createFrom();
   }

  ngOnInit() {

  }

  createFrom()
  {
    this.feedbackForm = this.fb.group({
      firstname : ['',Validators.required],
      lastname : ['',Validators.required],
      mobile : ['',Validators.required],
      email : ['',Validators.required],
      agree : false,
      contacttype : 'None',
      message : ''
    });
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
