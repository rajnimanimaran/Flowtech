import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CustomerService } from '../../../Services/Master/customer.service';
import { HttpClient } from '@angular/common/http';
import { Customers } from '../../../Models/Master/Customer/Customers';
import { environment } from '../../../../../../environments/environment';
import { CityServicesService } from '../../../Services/Administrator/Location/CityService';
import { StateServicesService } from '../../../Services/Administrator/Location/State.service';
import { CountryServicesService } from '../../../Services/Administrator/Location/CountryService';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customers[] = [];
  public show: boolean = false;
  isEditing: boolean = false;
  selection = new SelectionModel<Element>(true, []);
  public ProductForm: FormGroup;
  API_URL: string;
  //  model:Customers = new Customers();
  model: any = {}
  CountryIdName: any = []
  StateIdName: any = []
  stateData: any= [];
  cityData: any=[];
  constructor(public form: FormBuilder, private _http: HttpClient, private _customerService: CustomerService, private _countryServices: CountryServicesService) {
    this.API_URL = environment.apiUrl;
  }

  dataSource = new MatTableDataSource();
  displayedColumns = ['SNo', 'CustomerCode', 'CustomerName', 'CustomerAddress', 'CustomerContact', 'CustomerEmail', 'GSTNo', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveCustomer() {
    debugger;
    if (this.isEditing === false) {
      // const obj = [{
      //   "CustCity": this.model.CityId,
      //   "CustCountry": this.model.CountryId,
      //   "CustState": this.model.StateId
      // }]
      this._customerService.insertCustomer(this.model).subscribe(response => {
        if (response) {
          alert("sucessfuly saved");
          this.ngOnInit();
          this.Cancel();
        }
      });
    }
    else {
      // const obj=[{
      //   "CustCity":this.model.CityId,
      //   "CustCountry":this.model.CountryId,
      //   "CustState":this.model.StateId
      // }]
      this._customerService.updateCustomer(this.model).subscribe(response => {
    debugger;
        if (response) {
          alert("updated sucessfully");
          this.ngOnInit();
          this.Cancel();
        }
      })
    }
    this.getCustomer()
  }



  updateCustomers(element, isEditing) {
    debugger;
    this.isEditing = isEditing;
    this.show = !this.show;
    this.model=element;
    this.model.CustCountry =Number( element.CustCountry);
   
    this.model.CustState =Number( element.CustState);
    this.model.CustCity =Number( element.CustCity);

  }

  deleteCustomers(element) {
    // const Id = new Product();
    // Id.prdID = element.Id;
    debugger;
    if (confirm("Are you sure?")) {
      this._customerService.deleteCustomer(element.CustId).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.ngOnInit();
        }
      });
    }

  }

  getCustomer() {
    debugger
    this._customerService.getCustomer().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.customer = response;
        this.dataSource = new MatTableDataSource(this.customer);
        console.log(this.dataSource);
      }
    });
  }


  GetCountryName() {
    debugger;
    this._countryServices.listCountryDetails().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.CountryIdName = JSON.parse(data._body);
        console.log(this.CountryIdName, 'CountryName')
      }
    }
    )
  }
  // GetStateName(value) {
  //   debugger;
  //   this._stateServices.GetStateNameByCountryId(value).subscribe((data: any) => {
  //     debugger;
  //     data['result']
  //     if (data) {
  //     this.StateIdName = JSON.parse(data._body);
  //       console.log(this.StateIdName, 'StateName')
  //     }
  //   }
  //   )
  // }
  // CityIdName:any = []
  // GetCityName(value) {
  //   debugger;
  //   this._CityService.listCityDetailsByStateId(value).subscribe((data: any) => {
  //     debugger;
  //     data['result']
  //     if (data) {
  //     this.CityIdName = JSON.parse(data._body);
  //       console.log(this.CityIdName, 'CityName')
  //     }
  //   }
  //   )
  // }
  AreaModel: any = []



  ngOnInit() {
    this.getCustomer();
    this.GetCountryName();
  }

  getStateName(Id) {
    debugger;
    this._customerService.getState(Id).subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.stateData = data;
      }
    });
  }
  getCityName(Id) {
    debugger;
    this._customerService.getCity(Id).subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.cityData = data;
      }
    });
  }


  addArea() {
    this.show = !this.show;
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
      CustomerCode: ['', [Validators.required]],
      CustomerName: ['', [Validators.required]],
      CustomerAddress: ['', [Validators.required]],
      CustomerContact: ['', [Validators.required]],
      CustomerEmail: ['', [Validators.required]],
      GSTNo: ['', [Validators.required]],

    });
    console.log(this.ProductForm)
  }
}



