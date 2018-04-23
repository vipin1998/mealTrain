import { Component, OnInit ,Inject } from '@angular/core';
import { FormBuilder , Validators , FormGroup} from '@angular/forms'
import { Dish } from '../shared/dish'
import { Params ,ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit 
{

  pnrForm : FormGroup;
  dishes : Dish[];
  errMess : string;
  cart : Dish[] = [];
  pnr : string;
  stCode : string;
  trainNumber : string;
  ammount : number = 0;
  formErrors = {
    'pnr' : ''
  }

  validationMessages = {
    'pnr' : {
      'required' : 'PNR Number is Required',
      'length' : 'Invalid PNR Number',
    }
  }


  constructor(private dishService : DishService,private route : ActivatedRoute
    ,@Inject('MongoURL') private MongoURL, private fb : FormBuilder) 
    {
      this.createFrom();
    }

     createFrom()
     {
       this.pnrForm = this.fb.group({
         pnr : ['',[Validators.required]],
       });
       this.pnrForm.valueChanges
         .subscribe( data => this.onValueChanged(data));
   
       this.onValueChanged();
     }
   
     onValueChanged( data ? : any)
     {
       if (!this.pnrForm) { return; }
       const form = this.pnrForm;
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
       this.pnr = this.pnrForm.value.pnr;
       this.pnrForm.reset({
         'pnr' : ''
       });
       for(var i=0;i<this.cart.length;i++)
       {
          this.dishService.addToCart(this.cart[i].name)
          .subscribe(res => {
            if (res.success) {  
              console.log("added to cart")    
            }
          })
       }
       this.dishService.makeOrder(this.stCode,this.trainNumber,this.pnr)
          .subscribe(res => {
            if (res.success) {  
              alert("Order Suceessfully")    
              this.cart = [];
            }
          },
          error => {
            alert(error)
          })

    }

  ngOnInit() 
  {
    this.trainNumber = this.route.snapshot.params['trainNumber'];
    this.stCode = this.route.snapshot.params['stCode'];
    this.route.params
      .switchMap((params: Params) => this.dishService.getDishes(params['stCode']))
      .subscribe(dish => { this.dishes = dish;},
      errmess =>this.errMess = <any>errmess);
  } 

  addToCart(dish : Dish) 
  {
    this.cart.push(dish);
    this.ammount = this.ammount + +dish.price;
  } 

  removeFromCart(dish : Dish)
  {
    var index = this.cart.indexOf(dish);
    if (index > -1) 
    {
      this.ammount = this.ammount - +dish.price;
      this.cart.splice(index, 1);
    }
  }

}
