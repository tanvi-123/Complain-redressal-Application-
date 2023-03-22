import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { RegistrationComponent } from '../registration/registration.component';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { LocationsService } from 'src/app/services/locations.service';
@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css'],
})
export class UpdateLocationComponent implements OnInit {
  toUpdateLocationData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationsService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    let locationId = this.route.snapshot.paramMap.get('id');
    // console.warn(locationId);

    this.getLocation(locationId);
    // console.warn(this.toUpdateUserData);
  }
  getLocation(id: any) {
    this.locationService.getSingleLocation(id).subscribe((data) => {
      // console.warn(data.location);

      this.toUpdateLocationData = data.location;
    });
  }
  locationList: any[] = [];

  updateLocation(data: any) {
    // console.warn("data",data,"id",this.toUpdateLocationData._id);

    // this.locationService.getlocation().subscribe((data:any[])=>{
    //    console.warn(data);
    //   // this.locationList.push(data.location)

    // })

    this.locationService
      .updateLocation(data, this.toUpdateLocationData._id)
      .subscribe((result) => {
        // console.warn(result)
        this.openSnackBar('Location Updated Successfully!!');
        this.router.navigate(['/admin/location']);
      });
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(PopupMessageComponent, {
      data: {
        message: message,
        // action: action,
        snackbar: this._snackBar,
      },
      horizontalPosition: 'right',
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
