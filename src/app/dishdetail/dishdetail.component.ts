import { Component, OnInit ,Inject } from '@angular/core';
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
  dishCopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  errMess : string;

  constructor( private dishService : DishService ,
     private route : ActivatedRoute,
     private location : Location,
     private cmf : FormBuilder,
       @Inject('BaseURL') private BaseURL) {
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

    this.dishCopy.comments.push(this.comment);

    this.dishCopy.save()
      .subscribe(dish => this.dish = dish)

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
      .subscribe(dish => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id);},
      errmess =>this.errMess = <any>errmess);
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
