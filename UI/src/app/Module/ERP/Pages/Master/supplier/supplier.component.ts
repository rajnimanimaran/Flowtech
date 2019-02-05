import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../Services/Master/supplier.service';
import { MatTableDataSource } from '@angular/material';
import { SupplierModel } from '../../../Models/Master/Supplier/Supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  displayedColumns = ['SNo', 'SupplierName', 'SupplierPhNo', 'GSTNo', 'State', 'StateCode', 'action'];
  public show: boolean;
  model: SupplierModel = {
    SID: 0,
    SName: '',
    SPhNo: '',
    SGSTNo: 0,
    SState: '',
    SStateCode: ''
  }
  Supplier: SupplierModel[] = [];
  isEditing = false;
  dataSource: MatTableDataSource<SupplierModel>;
  // dataSource: any;
  constructor(private _supplierservice: SupplierService) { }

  ngOnInit() {

    this.getQualityAudit();

  }

  getQualityAudit() {
    debugger;
    this._supplierservice.getQuality().subscribe(response => {
      response['result'];
      if (response) {
        this.Supplier = response;
        this.dataSource = new MatTableDataSource(this.Supplier);
        console.log(this.Supplier);
      }

    })

  }

  saveQuality() {
    debugger;
    if (this.isEditing == false) {
      // this.model=empty;
      this._supplierservice.insertQuality(this.model).subscribe(response => {
        if (response) {
          alert("sucessfuly saved");

          this.ngOnInit();
          this.Cancel();

        }
      });
    }
    else {
      this._supplierservice.updateQuality(this.model).subscribe(response => {
        if (response) {
          alert("updated sucessfully");


          this.ngOnInit();
          this.Cancel();


        }
      })
    }


    // this. getQuality()
  }

  updateProducts(element, isEditing) {
    this.isEditing = isEditing;
    this.show = !this.show;
    this.model = element;


  }



  addArea() {
    this.show = true;
    this.isEditing = false;
    this.model = {
      SID: 0,
      SName: '',
      SPhNo: '',
      SGSTNo: 0,
      SState: '',
      SStateCode: ''
    }
  }
  Cancel() {
    this.show = false
  }


  deleteProducts(element) {
 
    debugger;
    if (confirm("Are you sure?")) {
      this._supplierservice.deleteQualityAudit(element.SID).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.Cancel()
          this.ngOnInit();


        }
      });
    }

  }

}


