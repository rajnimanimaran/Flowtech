import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AreaServicesService } from '../../../../../Services/Administrator/Location/Area.service';
import { Router } from '@angular/router';
import { Area } from '../../../../../Models/Administrator/Location/Area';

@Component({
  selector   : 'app-list-area',
  templateUrl: './list-area.component.html',
  styleUrls  : ['./list-area.component.css']
})
export class ListAreaComponent implements OnInit {

  public ShowEditRow:boolean = false;
  public buttonName:any      = 'edit';

  //for table
  displayedColumns = ['SNo', 'AreaName', 'Pincode', 'CityName','StateName','CountryName','action'];
  
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection  = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort          : MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue            = filterValue.trim();
    filterValue            = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // menu prevent from closing
  handleClick(event) {
    event.stopPropagation();
  }

  constructor( private _listareaservice:AreaServicesService, private _router:Router) { }

  //for make screen as fullscreen
  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }
  AreaVal: any
  editArea(index,element){
    debugger;
this.AreaVal = element.CountryId;
this._listareaservice.setAreaVal(element);
this._router.navigate(["AddCountry"])
  }
  ngOnInit() {
    this.viewAreaDetails();
    
  } 

  AddAreadetails(value){
    this._listareaservice.setIsEditing(value);
    this._router.navigate(['/AddArea'])
  }
  cityVal: any

  editCity(value,element){
    debugger;
this.cityVal = element.CityId;
this._listareaservice.setAreaVal(element);
this._listareaservice.setIsEditing(value);
this._router.navigate(["AddArea"])
  }

  ListArea:any = []

  viewAreaDetails(){
  debugger;
 this._listareaservice.listAreaDetails().subscribe((data:any) => {
  debugger;
  if(data)
  this.ListArea             = JSON.parse(data._body);
  this.dataSource           = new MatTableDataSource<Element>(this.ListArea);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort      = this.sort;
  console.log(this.ListArea,"ListArea")

})
  }

  RemoveArea(element){  
    debugger;
       const area        = new Area();
             area.AreaId = element.AreaId
             this._listareaservice.removeArea(area).subscribe((data: any) => {
               debugger;
               this.ListArea = data['result'];
               alert("delete success")
               this.viewAreaDetails();               
               this.dataSource      = new MatTableDataSource(this.ListArea);
               this.dataSource.sort = this.sort;
         console.log(this.ListArea);   
     })
   }



}


//for table
export interface Element {
  SNo        : number;
  AreaName   : string;
  Pincode    : string;
  CityName   : string;
  StateName  : string;
  CountryName: string;
} 
const ELEMENT_DATA: Element[] = []
  