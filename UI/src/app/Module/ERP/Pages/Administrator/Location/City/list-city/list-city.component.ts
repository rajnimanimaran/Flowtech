import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CityServicesService } from '../../../../../Services/Administrator/Location/CityService';
import { Router } from '@angular/router';
import { City } from '../../../../../Models/Administrator/Location/City';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.css']
})
export class ListCityComponent implements OnInit {
  public ShowEditRow: boolean = false;
  public buttonName: any = 'edit';

  //for table
  displayedColumns = ['SNo', 'CountryName', 'StateName', 'CityName', 'action'];
  ListCity: any = [];
  countryarray: any = {};
  dataSource = new MatTableDataSource<Element>(this.ListCity);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();         // Remove whitespace
    filterValue = filterValue.toLowerCase();  // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // menu prevent from closing
  handleClick(event) {
    event.stopPropagation();
  }

  constructor(private _listCityservice: CityServicesService, private _router: Router) { }

  //for make screen as fullscreen
  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }

  AddCitydetails(value){
    this._listCityservice.setIsEditing(value);
    this._router.navigate(['/AddCity'])
  }

  viewCityDetails() {
    debugger;
    this._listCityservice.listCityDetails().subscribe((data: any) => {
      debugger;
      if (data)
        this.ListCity = JSON.parse(data._body)
      this.countryarray = this.ListCity.Country;
      this.dataSource = new MatTableDataSource<Element>(this.ListCity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.ListCity, "ListCity")
    })
  }
  ngOnInit() {
    this.viewCityDetails();
  }
  cityVal: any

  editCity(value, element) {
    debugger;
  
    this._listCityservice.setCityVal(element);
    this._listCityservice.setIsEditing(value);
    this._router.navigate(["AddCity"])
  }
  RemoveCountry(element) {
    debugger;
    const city = new City();
    city.CityId = element.CityId
    this._listCityservice.removeCity(city).subscribe((data: any) => {
      debugger;
      this.ListCity = data['result'];
      alert("delete success")
      this.viewCityDetails();

      this.dataSource = new MatTableDataSource(this.ListCity);
      this.dataSource.sort = this.sort;
      console.log(this.ListCity);
    })
  }


}


export interface Element {
  SNo: number;
  CountryName: string;
  StateName: string;
  CityName: string;
} 
