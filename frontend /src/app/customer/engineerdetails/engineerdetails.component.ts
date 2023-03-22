import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-engineerdetails',
  templateUrl: './engineerdetails.component.html',
  styleUrls: ['./engineerdetails.component.css']
})
export class EngineerdetailsComponent implements OnInit {


  users: any = []
  engDetails: any = []

  constructor(

    private userservice: UserService,
    @Inject(MAT_DIALOG_DATA) public engEmail: any
  ) { }


  ngOnInit(): void {
    console.warn(this.engEmail);

    this.userservice.getuser().subscribe((data: any) => {
      // console.log(data.user)
      this.users = data.user
      
      // console.warn(this.users);
      // data.user.map((item:any)=>{
      //   console.warn(item.email);
     // })
     
      this.users.map((i: any) => {
        // console.warn(i.email);
        if (this.engEmail == i.email) {
          this.engDetails.push(i)
          console.warn(this.engDetails);

        }
      })
    })
  }

}
