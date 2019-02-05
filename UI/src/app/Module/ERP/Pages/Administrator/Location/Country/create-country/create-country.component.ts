import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CountryServicesService } from '../../../../../Services/Administrator/Location/CountryService';
import { CountryEntity } from '../../../../../Models/Administrator/Location/Countrymodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.css']
})
export class CreateCountryComponent implements OnInit {
  @ViewChild('CountryName') CountryName: ElementRef;
  @ViewChild('CountryCode') CountryCode: ElementRef;
  @ViewChild('CurrencyName') CurrencyName: ElementRef;
  @ViewChild('Currencysymbol') Currencysymbol: ElementRef;
  @ViewChild('CurrencyCode') CurrencyCode: ElementRef;

  public signUpForm: FormGroup;
  countryValue: any = {};
  CountryModel: any = {}
  isEditing: boolean = false;

  constructor(public form: FormBuilder, private _CountryService: CountryServicesService,
    private _router: Router) {
    this.countryValue = this._CountryService.getCountryVal();
    this.buildForm();
  }
 

  public buildForm() {
    this.signUpForm = this.form.group({
      CountryName: ['', [Validators.required]],
      CountryCode: ['', [Validators.required]],
      CurrencyName: ['', [Validators.required]],
      CurrencyCode: ['', [Validators.required]],
      CurrencySymbol: ['', [Validators.required]],
    });
    console.log(this.signUpForm)
  }
  public ngOnInit() {
    debugger;
    this.isEditing = this._CountryService.getIsEditing()
    if (this.isEditing == true) {
      this.setForupdateCountryVal();
    }
   
  }



  setForupdateCountryVal() {
    this.CountryModel.CountryName = this.countryValue.CountryName;
    this.CountryModel.CountryCode = this.countryValue.CountryCode;
  }

  backCountryListForm() {
    debugger;
    this.isEditing = false;
    this.countryValue = {}
    this.CountryModel = {}
    this._router.navigate(['/country'])
  }

  validateCountryInsert() {
    if (this.CountryModel.CountryName == undefined && this.CountryModel.CountryName == null) {
      alert('CountryName is required')
      this.CountryName.nativeElement.focus();
    }
    else if (this.CountryModel.CountryCode == undefined && this.CountryModel.CountryCode == null) {
      alert('CountryCode is required')
      this.CountryCode.nativeElement.focus();
    }
    else {
      this.CountryCreate()
    }
  }
  CountryCreate() {
    if (this.isEditing == true) {
      const Country = new CountryEntity();
      Country.CountryId = this.countryValue.CountryId;
      Country.CountryName = this.CountryModel.CountryName;
      Country.CountryCode = this.CountryModel.CountryCode;
      debugger;
      this._CountryService.updateCountryDetail(Country).subscribe((res: any) => {
        if (res) {
          debugger;
          alert("updated");
          this.isEditing = false;
          this.countryValue = {}
          this.CountryModel = {}
        }
      });
    } else {

      const Country = new CountryEntity();
      debugger;
      Country.CountryName = this.CountryModel.CountryName;
      Country.CountryCode = this.CountryModel.CountryCode;
      this._CountryService.saveCountryDetail(Country).subscribe();
      alert("saved");
      this.countryValue = []
      this.CountryModel = []
    }
  }
  

}




