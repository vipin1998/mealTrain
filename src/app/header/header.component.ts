import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef} from '@angular/material'
import { LoginComponent } from '../login/login.component'
import { SignupComponent } from '../signup/signup.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private dialog : MatDialog) { }

  ngOnInit() {
  }

  openLogInForm()
  {
    this.dialog.open(LoginComponent,{width : '500px' ,height : '450px'})
  }

  openSignUpForm()
  {
    this.dialog.open(SignupComponent,{width : '400px' ,height : '550px'})
  }
}
