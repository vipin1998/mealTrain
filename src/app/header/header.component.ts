import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef} from '@angular/material'
import { LoginComponent } from '../login/login.component'
import { SignupComponent } from '../signup/signup.component'
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string = undefined;
  subscription: Subscription;

  constructor( private dialog : MatDialog ,private userService: UserService ) { }

  ngOnInit() 
  {
    this.userService.loadUserCredentials();
    this.username = this.userService.getName();
    
    this.subscription = this.userService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; }); 
      
  }

  openLogInForm()
  {
    let loginRef  = this.dialog.open(LoginComponent,{width : '500px' ,height : '450px'})

    loginRef.afterClosed()
      .subscribe(result => {
        console.log(result);
      });
  }

  openSignUpForm()
  {
    this.dialog.open(SignupComponent,{width : '400px' ,height : '550px'})
  }

  logOut() {
    this.username = undefined;
    this.userService.logOut();
  }
}
