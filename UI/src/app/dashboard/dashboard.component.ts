import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //for table
  displayedColumns = ['select', 'position', 'empname', 'department', 'designation', 'manager', 'email','phoneno'];
  
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }

  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort; 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 
  // menu prevent from closing
  handleClick(event) {
    event.stopPropagation();
  }
  
  constructor() { }

  //for make screen as fullscreen
  screenfullClicked = false; 
  onClick() {
    this.screenfullClicked= !this.screenfullClicked;
  }

  ngOnInit() {
  }

}


//for table
export interface Element {
  empname: string;
  position: number;
  department: string;
  designation: string;
  manager: string;
  email: string;
  phoneno: number;
} 
const ELEMENT_DATA: Element[] = [
  {position: 2532, empname: 'John', department: 'Information Technology', designation: 'Software Developer', manager: 'John Doe', email: 'Johndoe@gmail.com', phoneno: 9874563210},
  {position: 1452, empname: 'Shan', department: 'ECE', designation: 'System Analysis', manager: 'System Analysis', email: 'Shan@gmail.com', phoneno: 9632587410},
  {position: 3254, empname: 'Doe', department: 'Mechanical Engineering', designation: 'Project Lead', manager: 'John Doe', email: 'Doe@gmail.com', phoneno: 9517538264},
  {position: 9856, empname: 'Ryder', department: 'Leather Technology', designation: 'Account Manager', manager: 'John Doe', email: 'Ryder@gmail.com', phoneno: 9666352410},
  {position: 7452, empname: 'Declan', department: 'Fashion Technology', designation: 'Technical Specialist', manager: 'John Doe', email: 'Declan@gmail.com', phoneno: 6584582130},
  {position: 6584, empname: 'Elsie', department: 'Tele Communications', designation: 'Bussiness Analysis', manager: 'John Doe', email: 'Elsie@gmail.com', phoneno: 6352410002},
  {position: 8563, empname: 'Finn', department: 'Marine Engineering', designation: 'System Analysis', manager: 'John Doe', email: 'Finn@gmail.com', phoneno: 698523333},
  {position: 1264, empname: 'Beatrice', department: 'EEE', designation: 'Tech Specialist', manager: 'Software Developer', email: 'Beatrice@gmail.com', phoneno: 9874566621},
  {position: 4563, empname: 'John Doe', department: 'Fashion Technology', designation: 'Account Manager', manager: 'John Doe', email: 'Johndoe@gmail.com', phoneno: 6593222142},
  {position: 1052, empname: 'Neon', department: 'MI', designation: 'Technical Specialist', manager: 'John Doe', email: 'Neone@gmail.com', phoneno: 6542395122},
  {position: 4511, empname: 'Ryder', department: 'Marine Engineering', designation: 'Project Lead', manager: 'John Doe', email: 'Rydere@gmail.com', phoneno: 89652310147},
  {position: 1582, empname: 'Finn bal', department: 'Tele Communications', designation: 'Software Developer', manager: 'John Doe', email: 'Finnbal@gmail.com', phoneno: 7896524130},
  {position: 2513, empname: 'John mech', department: 'ECE', designation: 'Technical Specialist', manager: 'John Doe', email: 'JJohnmech@gmail.com', phoneno: 7896525256},
  {position: 1498, empname: 'Sham', department: 'Information Technology', designation: 'System Analysis', manager: 'John Doe', email: 'Sham@gmail.com', phoneno: 6859332512},
  {position: 1755, empname: 'Angel', department: 'Information Technology', designation: 'Tech Specialist', manager: 'John Doe', email: 'Angel@gmail.com', phoneno: 6985566320},
  {position: 2356, empname: 'Kumar', department: 'Mechanical Engineering', designation: 'Bussiness Analysis', manager: 'John Doe', email: 'Kumar@gmail.com', phoneno: 9874563652},
  {position: 6587, empname: 'Ravi', department: 'Leather Technology', designation: 'Software Developer', manager: 'John Doe', email: 'Ravi@gmail.com', phoneno: 5698542365},
  {position: 9818, empname: 'Goku', department: 'Mechanical Engineering', designation: 'Project Lead', manager: 'John Doe', email: 'Goku@gmail.com', phoneno: 9586326985},
  {position: 7619, empname: 'Jiren', department: 'EEE', designation: 'Technical Specialist', manager: 'System Analysis', email: 'Jiren@gmail.com', phoneno: 8965987456},
  {position: 8520, empname: 'king', department: 'Leather Technology', designation: 'Software Developer', manager: 'John Doe', email: 'kinggmail.com', phoneno: 9586286352}
];
