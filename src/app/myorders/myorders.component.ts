import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit 
{

  username: string = undefined;
  subscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() 
  {
    this.username = this.userService.getName();
    this.subscription = this.userService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; });
  }

}
