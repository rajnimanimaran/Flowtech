import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeServicesService } from '../../../../Services/HumanResource/EmployeeService';
import { Router } from '@angular/router';
import { EmployeeModel } from '../../../../Models/HumanResource/Employee/EmployeeModel';
import { HeaderStorageService } from '../../../../../../header-storage.service';


@Component({
  selector   : 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls  : ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public ShowEditRow:boolean = false;
  public buttonName:any      = 'edit';
  ListEmployee: any;
  //for table
  displayedColumns = ['SNo','FirstName','LastName', 'Department','Designation',
  'DateOfJoining','ReportingTo','action'];
  
  dataSource = new MatTableDataSource<Element>(this.ListEmployee);
  selection  = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort          : MatSort;
  userCompanyId: any;
  
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

  constructor(private _employeeService:EmployeeServicesService,private _router:Router,private _headerService:HeaderStorageService) { }

  //for make screen as fullscreen
  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }

  ngOnInit() {
    this.viewEmployeeDetails();
  } 

  editEmployeeDetails(value, element) {
    debugger;

    this._employeeService.setEmpVal(element);
    this._employeeService.setIsEditing(value)
    this._router.navigate(["AddEmployee"])
  }

  AddEmployeedetails(value) {
    debugger;
    this._employeeService.setIsEditing(value);
  this._router.navigate(["AddEmployee"])
  }
  viewEmployeeDetails() {
    debugger;
    // const designation           = new UserAccount();
    this.userCompanyId= this._headerService.getCompanyId()
    
    this._employeeService.listEmployeeDetails(this.userCompanyId).subscribe((data: any) => {
      debugger;
      if (data)
        this.ListEmployee      =  JSON.parse(data._body);
        this.dataSource           = new MatTableDataSource<Element>(this.ListEmployee);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort      = this.sort;
      console.log(this.ListEmployee, "ListEmployee")
      
    })
  }
  //for Deleteing a Row
  RemoveEmployee(element) {
    debugger;
    const emp = new EmployeeModel();
    emp.EmployeeId = element.EmployeeId
    this._employeeService.deleteEmployeeDetail(emp.EmployeeId).subscribe((data: any) => {
      debugger;
      this.ListEmployee = data['result'];
      this.viewEmployeeDetails();
      alert("delete success")
      this.dataSource = new MatTableDataSource(this.ListEmployee);
      this.dataSource.sort = this.sort;
 
    })
  }

}


//for table
export interface Element {
  SNo          : number;
  FirstName    : string;
  LastName     : string;
  Department   : string;
  Designation  : string;
  DateOfJoining: string;
  ReportingTo  : string
  

  
} 
const ELEMENT_DATA: Element[] = [
  {SNo: 2532, FirstName: 'SWD',LastName: 'Software', Department:'Director',
  Designation:'Developer',DateOfJoining:'Valley Vista Hotel',ReportingTo:'dsdssds'},

];

