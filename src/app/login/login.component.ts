import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef} from '@angular/material'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{  
  public loading = false;
  errMess: string;
  user = {remember:false,mobile :"",password : ""};
  wrongCredentials : string;

  constructor( private dialogRef : MatDialogRef<LoginComponent>,private userService: UserService) { }

  ngOnInit() {

  }

  onSubmit()
  {
    this.loading = true;
    this.userService.logIn(this.user)
      .subscribe(res => {
        this.loading = false;
        if (res.success) {
          this.dialogRef.close(res.success); 
          this.wrongCredentials = undefined;      
        }
      },
      error => {
        this.loading = false;
        console.log(error);
        this.errMess = error
        this.wrongCredentials = "InValid Mobile or Password"
      })
  }
}


