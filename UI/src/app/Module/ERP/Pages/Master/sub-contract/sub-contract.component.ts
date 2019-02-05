import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { subContract } from '../../../Models/Master/SubContract/SubContract';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { SubContractService } from '../../../Services/Master/sub-contract.service';

@Component({
  selector: 'app-sub-contract',
  templateUrl: './sub-contract.component.html',
  styleUrls: ['./sub-contract.component.css']
})
export class SubContractComponent implements OnInit {
  public show: boolean = false;
  isEditing: boolean = false;
  selection = new SelectionModel<Element>(true, []);
  public ProductForm: FormGroup;
  API_URL: string;
  model: subContract = {
    subContID: 0,
    Name: "",
    Address: "",
    GstNo: "",
    contactNumber: 0,
    supplierID: 0,
    emailID: "",
    IsActive: false
  }
  contract: subContract[] = [];

  constructor(public form: FormBuilder, public _dialog: MatDialog, private _http: HttpClient, private _subContractService: SubContractService) {
    this.API_URL = environment.apiUrl;
  }

  dataSource = new MatTableDataSource();
  displayedColumns = ['SNo', 'supplierID', 'Name', 'Address', 'GstNo', 'contactNumber', 'emailID', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveContract() {
    debugger;
    if (this.isEditing === false) {
      this._subContractService.insertsubcontract(this.model).subscribe(response => {
        if (response) {
          alert("sucessfuly saved");
          this.ngOnInit();
          this.Cancel();
        }
      });
    }
    else {
      this._subContractService.updatesubcontract(this.model).subscribe(response => {
        if (response) {
          alert("updated sucessfully");
          this.ngOnInit();
          this.Cancel();
        }
      })
    }
   
  }

  updateContract(element, isEditing) {
    this.isEditing = isEditing;
    this.show = !this.show;
    this.model = element;
  }

  deleteContract(element) {

    debugger;
    if (confirm("Are you sure?")) {
      this._subContractService.deletesubcontract(element.subContID).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.ngOnInit();
        }
      });
    }

  }
  getContract() {
    debugger
    this._subContractService.getsubContract().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.contract = response

        this.dataSource = new MatTableDataSource(this.contract);
        console.log(this.dataSource);
      }
    });
  }



  ngOnInit() {
    this.getContract();

  }


  addArea() {
    this.show = !this.show;
    this.model = {
      subContID: 0,
      Name: "",
      Address: "",
      GstNo: "",
      contactNumber: 0,
      supplierID: 0,
      emailID: "",
      IsActive: false
    }
  }
  Cancel() {
    this.show = !this.show;
    this.isEditing = false;
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();         // Remove whitespace
    filterValue = filterValue.toLowerCase();  // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  handleClick(event) {
    event.stopPropagation();
  }

  public buildForm() {
    this.ProductForm = this.form.group({
      supplierID: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      GstNo: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      emailID: ['', [Validators.required]],


    });
    console.log(this.ProductForm)
  }

}
