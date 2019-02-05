import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CountryServicesService } from '../../../../../Services/Administrator/Location/CountryService';
import { StateServicesService } from '../../../../../Services/Administrator/Location/State.service';
import { CityServicesService } from '../../../../../Services/Administrator/Location/CityService';
import { City } from '../../../../../Models/Administrator/Location/City';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.css']
})
export class CreateCityComponent implements OnInit {
  cityValue: any = {};
  public signUpForm: FormGroup;
  CountryIdName: any = [];
  StateIdName: any = [];
  CityModel: any = {};
  isEditing: boolean=false;
  constructor(public form: FormBuilder, private _CountryService: CountryServicesService,
    private _StateService: StateServicesService, private _CityService: CityServicesService,private _router:Router) {
    this.cityValue = this._CityService.getCityVal();
    this.buildForm();
  }
  public ngOnInit() {
   this.isEditing= this._CityService.getIsEditing();
    if (this.isEditing == true) {
      this.setForupdateCityVal();
    }
    this.GetCountryName();
  }

  backCityListForm() {
    debugger;
    this.isEditing = false;
    this.cityValue = {}
    this.CityModel = {}
    this._router.navigate(['/city'])
  

  }
  setForupdateCityVal() {
    debugger;
    this.CityModel.CountryId = this.cityValue.Country.CountryId;
    this.GetStateName( this.cityValue.Country.CountryId);
    this.CityModel.CityName = this.cityValue.CityName;
    this.CityModel.StateId = this.cityValue.State.StateId;
    this.CityModel.StateName = this.cityValue.State.StateName;
    this.CityModel.CityId = this.cityValue.CityId;
  }
  // updateCityVal() {
  //   debugger;
  //   if (this.cityValue == 0) {
  //     this.isEditing = false;
  //   }
  //   else {
  //     this.isEditing = true;
  //     this.CityModel.CountryId = this.cityValue.Country.CountryId;
  //     this.CityModel.CityName = this.cityValue.CityName;
  //     this.CityModel.StateId = this.cityValue.State.StateId;
  //     this.CityModel.CityId = this.cityValue.CityId;
  //   }
  // }

  public buildForm() {
    this.signUpForm = this.form.group({
      CountryName: ['', [Validators.required]],
      StateName: ['', [Validators.required]],
      CityName: ['', [Validators.required]]

    });
    console.log(this.signUpForm)
  }

  GetCountryName() {
    debugger;
    this._CountryService.GetCountryList().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.CountryIdName =JSON.parse(data._body)
        console.log(this.CountryIdName, 'CountryName')
      }
    }
    )
  }
  GetStateName(value) {
    debugger;
    this._StateService.GetStateNameByCountryId(value).subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.StateIdName = JSON.parse(data._body)
        console.log(this.StateIdName, 'StateName')
      }
    }
    )
  }



  SaveCity() {
    debugger
    if (this.isEditing == true) {
      const city = new City();
      city.CityId = this.CityModel.CityId;
      city.CountryId = this.CityModel.CountryId;
      city.StateId = this.CityModel.StateId;
      city.CityName = this.CityModel.CityName;
      city.StateName=this.CityModel.StateName;
      this._CityService.updateCityDetail(city).subscribe((data: any) => {
        if (data) {
          alert("updated");
          this.isEditing = false;
          this.cityValue = []
          this.CityModel = []
        }
      })
    }
    if (this.isEditing == false) {
      debugger;
      const city = new City();
      city.CountryId = this.CityModel.CountryId;
      city.StateId = this.CityModel.StateId;
      city.CityName = this.CityModel.CityName;
      this._CityService.saveCityDetail(city).subscribe((res: any) => {
        
        if (res) {
          alert("Success");
          this.CityModel = []
        }
      });
      console.log(city);
    }
  }



}
