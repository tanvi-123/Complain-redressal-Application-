import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { RegistrationComponent } from '../registration/registration.component';
import { PopupMessageComponent } from '../popup-message/popup-message.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {


  toUpdateUserData: any
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private route: ActivatedRoute, private userService: UserService, private _snackBar: MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id')
    this.getUser(userId)
    // console.warn(this.toUpdateUserData);
    

  }
  getUser(id: any) {
    this.userService.getSingleUser(id).subscribe((data) => {
      this.toUpdateUserData = data.user
    })

  }


  updateUser(data1: any) {
      //  console.warn(this.toUpdateUserData.email);
      // let localValues = 

    this.userService.getuser().subscribe((data: any) => {
       
       let check = data.user;
       console.warn(check);
      let checkEmail = false;
      check.map((item: any) => {
         console.warn(item.email);

        // if(){

        // }




        if (item.email == data1.email && item.email != this.toUpdateUserData.email) {
          checkEmail = true;
          // console.warn('same mail id');
         this. openSnackBar('User already exist ')
          setTimeout(()=>{
            location.reload()
          },2500)

         
        }
       });

      if (!checkEmail) {
        // console.warn("data",data1,"update_id", this.toUpdateUserData._id);
        
        this.userService.updateUser(data1, this.toUpdateUserData._id).subscribe((result) => {
            // console.warn(result)
          this.openSnackBar('User Updated Successfully!!')
          // setTimeout(() => {
          //   location.reload()
            
          // }, 2000);
          this.router.navigate(['/admin/Registration'])

    
        })
      }
    });
    

    
  }


  openSnackBar(message: string) {
    this._snackBar.openFromComponent(PopupMessageComponent, {
      data: {
        message: message,
        // action: action,
        snackbar: this._snackBar

      },
      horizontalPosition: 'right',
      verticalPosition: this.verticalPosition,
       duration:2500
    })
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
