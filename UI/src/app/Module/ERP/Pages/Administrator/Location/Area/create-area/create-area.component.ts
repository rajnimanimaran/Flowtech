import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { CountryServicesService } from '../../../../../Services/Administrator/Location/CountryService';
import { StateServicesService } from '../../../../../Services/Administrator/Location/State.service';
import { CityServicesService } from '../../../../../Services/Administrator/Location/CityService';
import { Area } from '../../../../../Models/Administrator/Location/Area';
import { AreaServicesService } from '../../../../../Services/Administrator/Location/Area.service';
import { Router } from '@angular/router';

@Component({
  selector   : 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrls  : ['./create-area.component.css']
})
export class CreateAreaComponent implements OnInit {
  isEditing:boolean=false;
  constructor(public form: FormBuilder,private _CountryService:CountryServicesService,
    private _StateService: StateServicesService, private _CityService: CityServicesService,
    private _AreaService : AreaServicesService,private _router: Router
   ) {
    this.AreaValue = this._AreaService.getAreaVal();
    this.buildForm();
   }
   AreaValue:any = {}
  public signUpForm: FormGroup;
      
  
  public ngOnInit() {
    // this.updateAreaVal();
    debugger;
    this.GetCountryName();
    // this.GetStateName();
this.isEditing=this._AreaService.getIsEditing();
if(this.isEditing==true){
  this.setUpdateValueForArea();
}
  }
  

 setUpdateValueForArea(){
   debugger;
  this.AreaModel.CountryId = this.AreaValue.Country.CountryId;
  this.GetStateName(this.AreaModel.CountryId);
  this.AreaModel.StateId   = this.AreaValue.State.StateId;
  this.GetCityName(this.AreaModel.StateId);
  this.AreaModel.CityId    = this.AreaValue.City.CityId;
  this.AreaModel.AreaId    = this.AreaValue.AreaId;
  this.AreaModel.AreaName  = this.AreaValue.AreaName;
  this.AreaModel.Pincode   = this.AreaValue.Pincode;
 }
 backAreaListForm(){
  debugger;
  this.isEditing = false;
  this.AreaValue = {}
  this.AreaModel = {}
  this._router.navigate(['/area'])


 }
 
  CountryIdName:any  = []
  StateIdName   :any = []
  GetCountryName() {
    debugger;
    this._CountryService.GetCountryList().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
      this.CountryIdName = JSON.parse(data._body);
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
      this.StateIdName = JSON.parse(data._body);
        console.log(this.StateIdName, 'StateName')
      }
    }
    )
  }
  CityIdName:any = []
  GetCityName(value) {
    debugger;
    this._CityService.listCityDetailsByStateId(value).subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
      this.CityIdName = JSON.parse(data._body);
        console.log(this.CityIdName, 'CityName')
      }
    }
    )
  }
  AreaModel:any = []
 

saveAreaDetails(){
  debugger;
  if(this.isEditing == true){
    const area           = new Area();
          area.AreaId    = this.AreaModel.AreaId
          area.CountryId = this.AreaModel.CountryId;
          area.StateId   = this.AreaModel.StateId;
          area.CityId    = this.AreaModel.CityId;
          area.AreaName  = this.AreaModel.AreaName;
          area.Pincode   = this.AreaModel.Pincode;
    this._AreaService.updateAreaDetail(area).subscribe((data:any) =>{
      if(data){
        alert("updated");
        this.isEditing = false;
        this.AreaValue = []
        this.AreaModel = []
      }
    }

    )
  }if(this.isEditing == false){
    debugger;
  const area           = new Area();
        area.CountryId = this.AreaModel.CountryId;
        area.StateId   = this.AreaModel.StateId;
        area.CityId    = this.AreaModel.CityId;
        area.AreaName  = this.AreaModel.AreaName;
        area.Pincode   = this.AreaModel.Pincode;
  this._AreaService.saveAreaDetail(area).subscribe((res: any) => {
    if (res) {
      alert("saved success");
      this.AreaModel = []
    }
  });
  console.log(area);
}}

  public buildForm() {
    this.signUpForm = this.form.group({
      CountryName: ['', [Validators.required]],
      StateName  : ['', [Validators.required]],
      CityName   : ['', [Validators.required]],
      AreaName   : ['', [Validators.required]],
      AreaCode   : ['', [Validators.required]],
      Pincode    : ['', [Validators.required]]
    });
console.log(this.signUpForm)
  }


}