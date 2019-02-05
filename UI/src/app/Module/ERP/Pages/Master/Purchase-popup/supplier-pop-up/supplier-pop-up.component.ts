import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material';
// import { environment } from 'src/environments/environment';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-supplier-pop-up',
  templateUrl: './supplier-pop-up.component.html',
  styleUrls: ['./supplier-pop-up.component.css']
})
export class SupplierPopUpComponent implements OnInit {
  // supplier : any[];

  constructor() { }

  
  // supplierinsert() {
  //   debugger;
  //   this.http.post(environment.apiUrl + "Bill/InsertVendorMaster", {
  //     "SName": this.supplier.SName,
  //     "Address": this.supplier.Address,
  //     "GSTNo": this.supplier.GSTNo,
  //     "ContactNo": this.supplier.ContactNo
  //   }).subscribe((data) => {
  //     debugger
  //     if (data) {
  //       this.supplier = [];
  //      this.thisDialogRef.close(data)
  //     }
  //   })

  // }

  ngOnInit() {
  }

}
