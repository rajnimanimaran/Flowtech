import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { OrganizationlevelService } from '../../../../Services/Administrator/Organization/Organizationlevelservice';
import { Router } from '@angular/router';
import { OrganizationLevel } from '../../../../Models/Administrator/Organization/Organizationmodel';

@Component({
  selector   : 'app-list-of-organization-level',
  templateUrl: './list-of-organization-level.component.html',
  styleUrls  : ['./list-of-organization-level.component.css']
})
export class ListOfOrganizationLevelComponent implements OnInit {
  public ShowEditRow:boolean = false;
  public buttonName:any      = 'edit';

  //for table
  displayedColumns = ['SNo', 'Code', 'LevelName', 'ReportingOffice','action'];
  
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection  = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort          : MatSort;
  model: string;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue            = filterValue.trim();
    filterValue            = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  
  handleClick(event) {
    event.stopPropagation();
  }
  ListOrganizationLevelArray:any = []
  
  constructor(private _ListOrganizationLevelService:OrganizationlevelService,private _router:Router) { }

viewOraganizationLevelDetails(){
    debugger;
this._ListOrganizationLevelService.listOrganizationLevel().subscribe((data:any) => {
  debugger;
  if(data)
  this.ListOrganizationLevelArray = JSON.parse(data._body);
  this.dataSource                 = new MatTableDataSource<Element>(this.ListOrganizationLevelArray);
  this.dataSource.paginator       = this.paginator;
  this.dataSource.sort            = this.sort;
  console.log(this.ListOrganizationLevelArray,"ListOrganizationLevelArray")
})
  }
  editOrg(value,element){
    debugger;
this._ListOrganizationLevelService.setOrgVal(element);
this._ListOrganizationLevelService.setIsEditing(value);
this._router.navigate(["AddOrganizationt"])
  }
  
  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }

  ngOnInit() {
    this.viewOraganizationLevelDetails();
  } 
  
  AddOrgdetails(value){
  this._ListOrganizationLevelService.setIsEditing(value);
  this._router.navigate(["/AddOrganizationt"])

}
  Removeorg(element){
    debugger;
    const orglevel         = new OrganizationLevel();
    orglevel.OrganizationLevelId = element.OrganizationLevelId;
    this._ListOrganizationLevelService.removeOrg(orglevel).subscribe(response => {
      debugger;
      this.ListOrganizationLevelArray = response['result'];
      alert("success")     
      this.viewOraganizationLevelDetails();
      this.dataSource      = new MatTableDataSource(this.ListOrganizationLevelArray);
      this.dataSource.sort = this.sort;
      console.log(this.ListOrganizationLevelArray);
    });
  }

}



export interface Element {
  SNo            : number;
  Code           : string;
  LevelName      : string;
  ReportingOffice: string;
  OrganizationLevelId:number;
} 
const ELEMENT_DATA: Element[] = []
 



