import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service'
import { FormBuilder } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig 
} from '@angular/material/snack-bar';
// import { RegistrationComponent } from '../registration/registration.component';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { Validators } from '@angular/forms';
import { LocationsService } from 'src/app/services/locations.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent  {



  
constructor(private userService : UserService,private router:Router,
  private _snackBar: MatSnackBar,
  private locationService: LocationsService,
  private formBuider: FormBuilder,
  private serviceService: ServiceTypeService){
    this.userData = new FormGroup({
      userType: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      // username: new FormControl('', [Validators.required]),
      assignedEngineerToManager: new FormControl(''),
      serviceType: new FormControl(),
    });
  }


  //login functionality

  msgErr:string = ''

  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6),])
  })

  loginUser(){
   
    this.userService.loginUser(this.loginForm.value).subscribe(
      (data) => {
console.warn(data);

      let data1 = JSON.stringify(data.body);
      const obj = JSON.parse(data1).user.userType;
      const isApproved = JSON.parse(data1).user.isApproved;

      console.log(isApproved)
      localStorage.setItem('user', JSON.stringify(data.body));

         if(isApproved){

          if (obj === 'Engineer' || obj === 'engineer') {
            this.router.navigate(['/engineer/allcomplaints']);
          } else if (obj === 'Manager' || obj === 'manager') {
            this.router.navigate(['/dashboard/allcomplains']);
          } else if (obj === 'Customer' || obj === 'customer') {
            this.router.navigate(['/customer/complaints']);
          } else {
            this.router.navigate(['/admin/Dashboard']);
          }

        }
        else{
          this.msgErr = "User not approved.."
        }

     
    },(error)=>{
      // console.warn('error',error);
      this.msgErr = "Invalid user.."
    });
     
  }

  //validation
  // get email1(){
  //   return this.loginForm.get('email')
  // }
  // get password1(){
  //   return this.loginForm.get('password')
  // }
  

  //toggle form when click on forgot password button
  a:boolean = true;

  toggleForm()
  {
    this.a = !this.a
  }


  // registration functionality

  defaultValue = null;
  defaultValue1 = null;
  userTypes = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Manager' },
    { id: 3, name: 'Engineer' },
    { id: 4, name: 'Customer' },
  ];

  pincodeList: any = [];
  pincodeList1: any = [];

  serviceList: any = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  userData!: FormGroup;

  msg: string = '';

  isCheck = false;

  selectedData: any = [];

  isManagerRoleSelected: boolean = false;

  isCustomerRoleSelected: boolean = false;

  ngOnInit() {
    this.getPincode();
    this.getAllPincode();
    this.getService();
    // this.openSnackBar("checking")
  }

  onChangeCheckbox(pinCode: any) {
    this.isCheck = true;

    this.selectedData.push(pinCode);
  }

  getAllPincode() {
    this.locationService.getlocation().subscribe((data) => {
      let a: any = data.location;
      for (let i = 0; i < a.length; i++) {
        this.pincodeList1.push(a[i]);
      }
    });
  }

  getPincode() {
    this.locationService.getlocation().subscribe((data) => {
      let a: any = data.location;
      for (let i = 0; i < a.length; i++) {
        if (a[i].isSelected == false) {
          this.pincodeList.push(a[i]);
        }
      }
    });
  }

  getService() {
    this.serviceService.getService().subscribe((data) => {
      let a: any = data;
      for (let i = 0; i < a.length; i++) {
        if (a[i].isActive == true) {
          // this.pincodeList.push(a[i]);
          // console.warn(a[i]);
          this.serviceList.push(a[i])
          
        }
        // this.serviceList.push(a[i]);
      }
      // console.warn(this.serviceList['name']);
    });
  }

  createUser() {
    if (this.userData.value.userType == '1') {
      this.userData.value.userType = 'Admin';
    } else if (this.userData.value.userType == '2') {
      this.userData.value.userType = 'Manager';
    } else if (this.userData.value.userType == '3') {
      this.userData.value.userType = 'Engineer';
    } else {
      this.userData.value.userType = 'Customer';
    }
    this.userData.value.assignedEngineerToManager = this.selectedData;

    console.warn(this.userData.value);
    // post user

    this.userService.getuser().subscribe((data: any) => {
      // console.warn(data.user);
      let check = data.user;
      let checkEmail = false;
      check.map((item: any) => {
        // console.warn(item.email);
        if (item.email == this.userData.value.email) {
          checkEmail = true;
          // console.warn('same mail id');
         this. openSnackBar('User Added have same mail id!!')
          setTimeout(()=>{
            location.reload()
          },3000)

         
        }
      });

      if (!checkEmail) {
        // console.warn('not same');
        this.userService.createUser(this.userData.value).subscribe((result) => {
          console.warn(result);

          if (result) {
            this.msg = 'User Successfully Created.';
            this.router.navigate(['/admin/Registration']);
            this.openSnackBar('User Added Successfully!!')
          }
        });
      }
    });

    //update location collection

    this.locationService.getlocation().subscribe((data) => {
      let a: any;

      for (let i = 0; i < data.location.length; i++) {
        a = data.location[i];
        // console.warn(a.isSelected);
        this.selectedData.map((item: any) => {
          if (item == a.pinCode) {
            let b = {
              isSelected: true,
            };

            this.locationService.updateLocation(b, a._id).subscribe((data) => {
              console.warn(data);
            });
          }
        });
      }
    });
  }

  onChange() {
    if (this.userData.value.userType == '2') {
      this.isManagerRoleSelected = true;
    } else {
      this.isManagerRoleSelected = false;
    }

    if (this.userData.value.userType == '4') {
      this.isCustomerRoleSelected = true;
    } else {
      this.isCustomerRoleSelected = false;
    }
  }

  onChangePin() {}

  openSnackBar(message: string) {
    
    this._snackBar.openFromComponent(PopupMessageComponent, {
      data: {
        message: message,
        // action: action,
        snackbar: this._snackBar,
       
      },
      horizontalPosition: 'right',
      verticalPosition: this.verticalPosition,
      
        duration:2000
    });
  }

  get userType() {
    return this.userData.get('userType');
  }
  get firstName() {
    return this.userData.get('firstName');
  }
  get lastName() {
    return this.userData.get('lastName');
  }
  get email() {
    return this.userData.get('email');
  }
  get address() {
    return this.userData.get('address');
  }
  get pinCode() {
    return this.userData.get('pinCode');
  }
  get phone() {
    return this.userData.get('phone');
  }
  get password() {
    return this.userData.get('password');
  }
  // get username() {
  //   return this.userData.get('username');
  // }
  // get service(){
  //   return this.userData.get('service')
  // }
  // get assignedEngineerToManager(){
  //   return this.userData.get('assignedEngineerToManager')
  // }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  
  
}











































// goToCustomer(){
//   window.open('/customer');
// }
