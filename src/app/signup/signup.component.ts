import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef} from '@angular/material'
import { UserService } from '../services/user.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public loading = false;

  user = {fname : "",mobile:"",sex:"",password:""};

  sex  = ["Male" , "Female" , "Other"]

  errMess : string;

  constructor( private dialogRef : MatDialogRef<SignupComponent>,private userService : UserService, ) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.loading = true;
    this.userService.signUp(this.user)
      .subscribe(res => {
        this.loading = false;
        if (res.success) {
          this.dialogRef.close(res.success);
          alert(res.status);         
        }
        else {
          alert(res.status)
        }
      },
      error => {
        this.loading = false;
        alert(error)
        this.errMess = error
      })

  }
}
