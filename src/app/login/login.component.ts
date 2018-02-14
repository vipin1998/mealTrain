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
  errMess: string;
  user = {remember:false,mobile :"",password : ""};

  constructor( private dialogRef : MatDialogRef<LoginComponent>,private userService: UserService) { }

  ngOnInit() {

  }

  onSubmit()
  {
    this.userService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close(res.success);
          alert(res.status);         
        }
        else {
          alert(res.status)
        }
      },
      error => {
        console.log(error);
        this.errMess = error
      })
  }
}


