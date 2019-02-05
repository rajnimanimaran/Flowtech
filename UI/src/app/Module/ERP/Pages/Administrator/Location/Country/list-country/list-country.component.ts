import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CountryServicesService } from '../../../../../Services/Administrator/Location/CountryService';
import { Route, Router } from '@angular/router';
import { CountryEntity } from '../../../../../Models/Administrator/Location/Countrymodel';

@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrls: ['./list-country.component.css']
})
export class ListCountryComponent implements OnInit {
  public ShowEditRow: boolean = false;
  public buttonName: any = 'edit';
  isEditing: boolean = false;
  //for table
  displayedColumns = ['SNo', 'CountryName', 'CountryCode', 'action'];
  listcountry: any = [];
  dataSource = new MatTableDataSource<Element>(this.listcountry);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  countryVal: any;

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

  constructor(private _ListService: CountryServicesService, private _router: Router,
    private _CountryService: CountryServicesService) { }

  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }

  viewCountryDetails() {
    debugger;
    this._ListService.listCountryDetails().subscribe((data: any) => {
      debugger;
      if (data)
        this.listcountry=JSON.parse(data._body)
      this.dataSource = new MatTableDataSource<Element>(this.listcountry);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      console.log(this.listcountry, "ListConutry")
    })
  }
  ngOnInit() {
    this.viewCountryDetails();
  }
  RemoveCountry(element) {
    debugger;
    const Country = new CountryEntity();
    Country.CountryId = element.CountryId
    this._CountryService.deleteCountryDetail(Country).subscribe((data: any) => {
      debugger;
      this.listcountry = data['result'];
      this.viewCountryDetails();
      alert("delete success")
      this.dataSource = new MatTableDataSource(this.listcountry);
      this.dataSource.sort = this.sort;
      console.log(this.listcountry);
    })
  }



  editCountry(value, element) {
    debugger;
    this.countryVal = element.CountryId;
    this._ListService.setCountryVal(element);
    this._CountryService.setIsEditing(value)
    this._router.navigate(["AddCountry"])
  }

  AddCountrydetails(value) {
    debugger;
    this._CountryService.setIsEditing(value);
  this._router.navigate(["AddCountry"])
  }

}


export interface Element {
  SNo: number;
  CountryName: string;
  CountryCode: string;
  CurrrencyName: string;
  CurrencyCode: string;
  CurrencySymbol: string;

} 
