import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-assign-engineer',
  templateUrl: './assign-engineer.component.html',
  styleUrls: ['./assign-engineer.component.css']
})
export class AssignEngineerComponent implements OnInit {
  items: any
  firstName: any
  _id: any
  selectedName: any
  userType: any[] = []
  user: any[] = []
  mResult: any
  data: any
  matched:any
  answer:any
  assignedEngineerToManager: any[] = []
  localStorageValues:any
  form = new FormGroup({
    assignUserId: new FormControl(''),
    status: new FormControl('wip')
  });
  constructor(@Inject(MAT_DIALOG_DATA) public customerPincode: any,
    private userService: UserService,private snackBar: MatSnackBar,
    private http: HttpClient,
    ) { }
  ngOnInit(): void {
    this.getEngineer()
    // console.warn(this.customerPincode.firstName,
    //   this.customerPincode.pinCode,
    //    this.customerPincode._id);
    this.localStorageValues = JSON.parse(localStorage.getItem('user') || '{}');
    this.localStorageValues = this.localStorageValues.user._id;
    console.warn(this.localStorageValues);
  }
  getEngineer() {
    this.userService.getuser().subscribe((data: any) =>    //----------------------------------------get manager object--------------------------------------------
    {
      this.userType = data.user
      this.userType.map((e: any) => {
        if ((e.userType === 'manager' || e.userType==='Manager')&& e._id=== this.localStorageValues) {
          this.mResult = e
          console.log(this.mResult);
        }
      })
      //--------------match the engineer pincode with the manager assignedEngineerToManager[ ] ----------------------
      this.userType.map((items: any) => {
        if ((items.userType === 'Engineer'|| items.userType==='engineer') &&  this.mResult.assignedEngineerToManager.includes(items.pinCode)) {
          this.matched=items
          // this.user.push(this.matched)
          console.log(this.matched);
          ///---------------------  match the engineer with the customer pincode------------------------------------------------------
          if((items.userType==='Engineer'|| items.userType==='engineer') || this.matched.pinCode==this.customerPincode.pinCode){
            console.log(items);
            this.user.push(items)           
          }
        }
      })
     
    })
  }
  submit() {
    this.data = this.form.value;
    console.log(this.data);
    if(this.data.assignUserId && this.data.status){
    this.userService.updateEngineer(this.customerPincode._id, this.data)
      .subscribe((res) => {
        console.log("result", res);
        setTimeout(() => {
          location.reload()
        }, 2000);
        this.snackBar.open('Engineer Assigned SuccessFully !!!', '', {
          duration: 2000, 
          panelClass: 'success-snackbar',
          horizontalPosition: "end",
          verticalPosition: 'top',
        });
      })
    } else{
        this.snackBar.open('Engineer not selected !!!', '', {
          duration: 2000, 
          panelClass: 'success-snackbar',
          horizontalPosition: "end",
          verticalPosition: 'top',
        });
      }
  }
}