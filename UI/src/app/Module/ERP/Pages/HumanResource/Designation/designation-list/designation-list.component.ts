import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DepartmentServicesService } from '../../../../Services/HumanResource/DepartmentService';
import { DesignationServicesService } from '../../../../Services/HumanResource/DesignationService';
import { Router } from '@angular/router';
import { Designation } from '../../../../Models/HumanResource/Designation/DesignationModel';
// import { element } from 'protractor';
import { UserAccount } from '../../../../Models/Administrator/UserAccount/userAccount';
import { UserAccountService } from '../../../../Services/Administrator/UserAcccount/UserAccountService';
import { HeaderStorageService } from '../../../../../../header-storage.service';



@Component({
  selector   : 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls  : ['./designation-list.component.css']
})
export class DesignationListComponent implements OnInit {
  public ShowEditRow:boolean = false;
  public buttonName:any      = 'edit';

  //for table
  displayedColumns = ['SNo', 'Code', 'DesignationName', 'Superior','DepartmentId','CompanyId','action'];
  
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection  = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort          : MatSort;
  userCompanyId: any;
  companyId: any;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue            = filterValue.trim();         // Remove whitespace
    filterValue            = filterValue.toLowerCase();  // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // menu prevent from closing
  handleClick(event) {
    event.stopPropagation();
  }

  constructor(private _designationservice:DesignationServicesService,
    private _headerService:HeaderStorageService, private _router:Router,private _userService:UserAccountService) { }

  //for make screen as fullscreen
  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }

  ngOnInit() {
     this.viewDesignationDetails();

  } 

  ListDesignation:any = []
  
  editDepartment(index,element){
    debugger;
// this.countryVal = element.CountryId;
this._designationservice.setDesignVal(element);
this._router.navigate(["AddDesignation"])
  }
  viewDesignationDetails() {
    debugger;
    // const designation           = new UserAccount();
    this.userCompanyId= this._headerService.getCompanyId()
    
    this._designationservice.listDesignationDetails(this.userCompanyId).subscribe((data: any) => {
      debugger;
      if (data)
        this.ListDesignation      =  JSON.parse(data._body);
        this.dataSource           = new MatTableDataSource<Element>(this.ListDesignation);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort      = this.sort;
      console.log(this.ListDesignation, "ListDesignation")
      
    })
  }
  //for Deleteing a Row
  RemoveDesignation(element) {
    debugger;
    const designation = new Designation();
    designation.DesignationId = element.DesignationId
    this._designationservice.deleteDepartmentDetail(designation.DesignationId).subscribe((data: any) => {
      debugger;
      this.ListDesignation = data['result'];
      this.viewDesignationDetails();
      alert("delete success")
      this.dataSource = new MatTableDataSource(this.ListDesignation);
      this.dataSource.sort = this.sort;
 
    })
  }
  
  editDesignation(value, element) {
    debugger;

    this._designationservice.setDesignVal(element);
    this._designationservice.setIsEditing(value)
    this._router.navigate(["AddDesignation"])
  }

  AddDesignationdetails(value) {
    debugger;
    this._designationservice.setIsEditing(value);
  this._router.navigate(["AddDesignation"])
  }

}


//for table
export interface Element {
  SNo            : number;
  DesignationName: string
  CompanyId      : number
  DepartmentId   : number
  Superior       : number
  Code           : string
  

  
} 
const ELEMENT_DATA: Element[] = [];

