import { Component } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service';
import { ComplaintserviceService } from '../complaintservice.service';

@Component({
  selector: 'app-resolved',
  templateUrl: './resolved.component.html',
  styleUrls: ['./resolved.component.css'],
})
export class ResolvedComponent {
  // users: any = []
  // constructor(private status: ComplaintserviceService) {

  //   this.status.status().subscribe((data) => {
  //     console.warn("data", data);
  //     // this.users = data;
  //     data.map((items:any)=>{
  //       if (items.status==="resolved"){
  //         this.users.push(items)
  //       }
  //     })
  //   })

  // }

  user: any = [];
  users: any = [];
  localStorageValues: any;
  serviceName:any
  problemName:any
  constructor(
    private status: ComplaintserviceService,
    private complaintservice: ComplaintService
  ) {
    // this.status.alldata().subscribe((data) => {
    //   this.users = data;
    //   // console.log(this.users)
    //   this.users.map((items:any)=>{
    //           if (items.status==="resolved"){
    //             this.user.push(items)
    //           }
    //          })
    // })
    this.localStorageValues = JSON.parse(localStorage.getItem('user') || '{}');
    this.localStorageValues = this.localStorageValues.user._id;
    this.complaintservice
      .getAuserComplaints(this.localStorageValues)
      .subscribe((result) => {
        // console.warn(result);
        this.users = result;
        //  console.log(this.users)
        this.users.map((items: any) => {
          if (items.status === 'resolved') {
            this.user.push(items);
            this.user.map((item:any)=>{
              // console.warn(item.serviceData);
              item.serviceData.map((i:any)=>{
                this.serviceName = i.name
                // console.warn(i);
                
              })
              item.problemData.map((i:any)=>{
                console.warn(i.name)
                this.problemName = i.name
              })
            })
          }
        });
      });
      // console.warn(this.user);
      
      
  }

  // getResolvedComplaints(){

  // }
}
