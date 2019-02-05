import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { RoleServicesService } from '../../../../../Services/Administrator/RoleLibrary/RoleService';
import { Router } from '@angular/router';
import { Role } from '../../../../../Models/Administrator/RoleLibrary/Role';


@Component({
  selector   : 'app-list-of-role',
  templateUrl: './list-of-role.component.html',
  styleUrls  : ['./list-of-role.component.css']
})
export class ListOfRoleComponent implements OnInit {
  public ShowEditRow:boolean = false;
  public buttonName:any      = 'edit';

  //for table
  displayedColumns = ['SNo', 'RoleName', 'OrganizationLevel','action'];
  
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection  = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort          : MatSort;
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
  ListRole:any = []
  constructor(private _listRoleservice:RoleServicesService,private _router:Router) { }
  viewRoleDetails() {
    debugger;
    this._listRoleservice.listRoleDetails().subscribe((data: any) => {
      debugger;
      if (data)
        this.ListRole = JSON.parse(data._body);
        for(var i in this.ListRole){
          this.ListRole[i].level_Name = this.ListRole[i].OrganizationLevel.LevelName
        }       
        this.dataSource           = new MatTableDataSource<Element>(this.ListRole);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort      = this.sort;
      console.log(this.ListRole, "ListRole")
   
    })
  }
  AddRolesdetails(value) {
  
    this._listRoleservice.setIsEditing(value);
    // this.countryVal = [];
    this._router.navigate(["AddRole"])
  }

  editRoles(value,element) {
    debugger;
   
    this._listRoleservice.setRoleVal(element);
    this._listRoleservice.setIsEditing(value)
    this._router.navigate(["AddRole"])
  }
  //for make screen as fullscreen
  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }

  ngOnInit() {
    this.viewRoleDetails();
  } 
  
 
  //for Deleteing a Row
  removeRole(element) {
    debugger;
    const role = new Role();
    role.RoleId = element.RoleId
    this._listRoleservice.deleteRoleDetail(role.RoleId).subscribe((data: any) => {
      debugger;
      this.ListRole = data['result'];
      this.viewRoleDetails();
      alert("delete success")
      this.dataSource = new MatTableDataSource(this.ListRole);
      this.dataSource.sort = this.sort;
 
    })
  }

}



export interface Element {
  SNo              : number;
  RoleName         : string;
  OrganizationLevel: string;
} 
const ELEMENT_DATA: Element[] = [
 ];



