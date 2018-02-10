import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators , FormGroup} from '@angular/forms';
import { Query } from '../shared/query';
import { ValidateTrainNumber } from '../shared/train_number.validator'
import { query } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss']
})
export class SearchFoodComponent implements OnInit {

  queryForm : FormGroup;
  query : Query;
  formErrors = {
    'train_number' : '',
    'journey_date' : ''
  };
  validationMessages = {
    'train_number' : {
      'required' : 'Train Number is Required',
      'validTrainNumber' :  'Invalid Train Number'
    },
    'journey_date' : {
      'required' : 'Journey Date is Required',
    }
  };

  createFrom()
    {
      this.queryForm = this.qf.group({
        train_number : ['',[Validators.required,ValidateTrainNumber]],
        journey_date : ['',Validators.required],
      });
      this.queryForm.valueChanges
        .subscribe( data => this.onValueChanged(data));
  
      this.onValueChanged();
    }

    onValueChanged( data ? : any)
    {
      if (!this.queryForm) { return; }
      const form = this.queryForm;
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

      this.query = this.queryForm.value;
      console.log(this.queryForm.value)
    
      
    }

  constructor(private qf : FormBuilder) {
    this.createFrom();
   }

  ngOnInit() {
  }

}
