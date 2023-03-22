import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComplaintService } from 'src/app/services/complaint.service';
// import { AssignFieldWorkerComponent } from '../assign-field-worker/assign-field-worker.component';
import { ViewDetailsComponent } from 'src/app/Manager/view-details/view-details.component';

@Component({
  selector: 'app-engineer-table',
  templateUrl: './engineer-table.component.html',
  styleUrls: ['./engineer-table.component.css'],
})
export class EngineerTableComponent {
  title = 'Table-Trial1';
  p:any
  localStorageValues: any;
  getComplaintIn: any = [];
  getDataFromComplaint: any = [];
  loginEng: string = 'Engineer-2';
  name: any;
  constructor(
    private dialog: MatDialog,
    private complaintService: ComplaintService
    
  ) {}

  ngOnInit(): void {
    this.localStorageValues = JSON.parse(localStorage.getItem('user') || '{}');
    this.localStorageValues = this.localStorageValues.user.email;
    this.getComplaint(this.localStorageValues)
   
  }

  getComplaint(emailId:any){
    
      // console.warn("gg",this.localStorageValues);
    
    this.complaintService.getComplaint().subscribe((result) => {
       console.warn(result);
      
      result.map((items: any) => {
  console.warn(items);

        if (items.assignUserId === emailId && items.status != 'open') {
            console.log("ok");

          this.getDataFromComplaint.push(items);
            console.warn(this.getDataFromComplaint);
        }
      });

     
    });
  }
  
  openDialog(id: any) {
    this.dialog.open(ViewDetailsComponent, {
      width: '35%',
      data: id,
    });
  }
  updateStatus(id: any, itemToAdd: any) {
    this.complaintService.updateSingleStatus(id, itemToAdd);
  }
  // openDialog(id:any) {
  //   this.dialog.open(ViewDetailsComponent, {
  //     width: '35%'

  //   });
  // }
  // openAssign() {
  //   this.dialog.open(AssignFieldWorkerComponent, {});
  // }
  search() {
    if (this.name == '') {
      this.ngOnInit();
    } else {
      console.warn(this.getDataFromComplaint);
      this.getDataFromComplaint = this.getDataFromComplaint.filter((res: any) => {
        return res.firstName.toLowerCase().match(this.name.toLowerCase());
      });
    }
  }
  user(user: any) {
    throw new Error('Method not implemented.');
  }
}
