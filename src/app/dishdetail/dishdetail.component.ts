import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import {Params ,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { DishService } from '../services/dish.service';

import { FormBuilder , Validators , FormGroup} from '@angular/forms'
import { Comment } from '../shared/comment'


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  commentForm : FormGroup;
  comment : Comment;
  formErrors = {
    'author' : '',
    'comment' : ''
  };
  validationMessages = {
    'author' : {
      'required' : 'Author Name is Required',
      'minlength' : 'Author Name must be atleast 2 character long',
      'maxlength' : 'Author Name can not be more than 25 character'
    },
    'comment' : {
      'required' : 'Your Comment is Required',
    }
  };


  dish : Dish;
  dishIds: number[];
  prev: number;
  next: number;

  constructor( private dishService : DishService ,
     private route : ActivatedRoute,
     private location : Location,
     private cmf : FormBuilder) {
      this.createFrom();
    }

    createFrom()
    {
      this.commentForm = this.cmf.group({
        author : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
        comment : ['',Validators.required],
        rating : '',
        date : new Date()
      });
      this.commentForm.valueChanges
        .subscribe( data => this.onValueChanged(data));
  
      this.onValueChanged();
    }

  onValueChanged( data ? : any)
  {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
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
    this.comment = this.commentForm.value;
    
    this.dish.comments.push(this.comment);

    this.commentForm.reset({
      author : '',
      rating : 1,
      comment : ''
    });
  }



  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }


  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack() : void{
    this.location.back();
  }


}
