import { Component } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service';
// import { AssignFieldWorkerComponent } from '../assign-field-worker/assign-field-worker.component';
import { ViewDetailsComponent } from 'src/app/Manager/view-details/view-details.component';
import { MatDialog} from '@angular/material/dialog';
import { PopupMessageComponent } from 'src/app/admin/components/popup-message/popup-message.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-escalated-table',
  templateUrl: './escalated-table.component.html',
  styleUrls: ['./escalated-table.component.css'],
})
export class EscalatedTableComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  
  constructor(
    private dialog: MatDialog,
    private complaintService: ComplaintService,
    private _snackBar: MatSnackBar
  ) {}
  getComplaintIn: any;
  localStorageValues: any;
  getDataFromComplaint: any = [];
  // loginEng: string='Engineer-2';
  ngOnInit(): void {
    this.localStorageValues = JSON.parse(localStorage.getItem('user') || '{}');
    this.localStorageValues = this.localStorageValues.user.email;
    this.complaintService.getComplaint().subscribe((result) => {
      result.map((items: any) => {
        if (
          items.assignUserId === this.localStorageValues &&
          items.status === 'escalated'
        ) {
          // console.log("ok");

          this.getDataFromComplaint.push(items);

           console.warn(this.getDataFromComplaint.fieldWorker);
        }
      });
    });
  }

  name: any;
  selectedWorker: string = '';
  WorkerList:any=['Field Worker 1','Field Worker 2','Field Worker 3']
  
  selectChangeHandler(event: any, id: any) {
    this.selectedWorker = event.target.value;
    var itemToAdd ={fieldWorker:this.selectedWorker}
    this.complaintService
    .updateSingleStatus(id, itemToAdd)
    .subscribe((result) => {
      // this.router.navigate(['/engineer/openComplaint'])
    });
  // location.reload();
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
  p:any

  assignFieldWorker(){
    // alert(`${this.selectedWorker} is assigned`)

    this.openSnackBar(`${this.selectedWorker} is assigned`)

  }

  resolveStatus(id:any){
    this.complaintService
    .updateSingleStatus(id, {status:"resolved"})
    .subscribe((result) => {
      // this.router.navigate(['/engineer/openComplaint'])
    });
    setTimeout( () => {  location.reload();}, 2000 );
    this.openSnackBar('Ticket Resolved')
  }
  // openSnackBar(message: string) {
  //   this._snackBar.openFromComponent(PopupMessageComponent, {
  //     data: {
  //       message: message,
        
  //       snackbar: this._snackBar,
  //     },
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //     duration: 2000,
  //   });
  // }

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

 
}
