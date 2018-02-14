import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef} from '@angular/material'
import { UserService } from '../services/user.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {fname : "",mobile:"",sex:"",password:""};

  sex  = ["Male" , "Female" , "Other"]

  errMess : string;

  constructor( private dialogRef : MatDialogRef<SignupComponent>,private userService : UserService, ) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.userService.signUp(this.user)
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
