import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CompanyInitiationService } from '../../../../Services/Administrator/Organization/companyIntiationService';
import { DepartmentServicesService } from '../../../../Services/HumanResource/DepartmentService';
import { Router } from '@angular/router';
import { Department } from '../../../../Models/HumanResource/Department/DepartmentModel';
import { HeaderStorageService } from '../../../../../../header-storage.service';

@Component({
  selector   : 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls  : ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  public ShowEditRow:boolean = false;
  public buttonCode:any      = 'edit';
  ListCompanyIntiation:any = []
  //for table
  ListDepartment:any = []
  displayedColumns = ['SNo', 'DepartmentCode', 'DepartmentName', 'ParentDepartment'
  ,'CompanyId','action']; 
  
  dataSource = new MatTableDataSource<Element>(this.ListDepartment);
  selection  = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort          : MatSort;
  userCompanyId: number;
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

  constructor( private _departmentService:DepartmentServicesService,private _router:Router, private _headerService:HeaderStorageService) { }

  //for make screen as fullscreen
  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }
  
  
ngOnInit(){
this.viewDepartmentDetails();
}

viewDepartmentDetails() {
  debugger;
  this.userCompanyId= this._headerService.getCompanyId()
  this._departmentService.listDepartmentDetails(this.userCompanyId).subscribe((data: any) => {
    debugger;
    if (data)
      this.ListDepartment      = JSON.parse(data._body);
      this.dataSource           = new MatTableDataSource<Element>(this.ListDepartment);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort      = this.sort;
    console.log(this.ListDepartment, "ListDepartment")
    
  })
}

 
  //for Deleteing a Row
  RemoveDepartment(element) {
    debugger;
    const department = new Department();
    department.DepartmentId = element.DepartmentId
    this._departmentService.deleteDepartmentDetail(department.DepartmentId).subscribe((data: any) => {
      debugger;
      this.ListDepartment = data['result'];
      this.viewDepartmentDetails();
      alert("delete success")
      this.dataSource = new MatTableDataSource(this.ListDepartment);
      this.dataSource.sort = this.sort;
 
    })
  }
  editDepartment(value, element) {
    debugger;

    this._departmentService.setDepartmentVal(element);
    this._departmentService.setIsEditing(value)
    this._router.navigate(["AddDepartment"])
  }

  AddDepartmentdetails(value) {
    debugger;
    this._departmentService.setIsEditing(value);
  this._router.navigate(["AddDepartment"])
  }
}


//for table
export interface Element {
  SNo             : number;
  DepartmentCode  : string;
  DepartmentName  : string;
  ParentDepartment: string;
  CompanyId       : string;
} 

