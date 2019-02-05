import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { CountryServicesService } from '../../../../../Services/Administrator/Location/Country/CountryService';
import { HttpClient } from '@angular/common/http';
import { State } from '../../../../../Models/Administrator/Location/State';
import { StateServicesService } from '../../../../../Services/Administrator/Location/State.service';
import { CountryServicesService } from '../../../../../Services/Administrator/Location/CountryService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit {

  public signUpForm: FormGroup;

  StateModel: any = {}
  CountryIdName: any = []
  isEditing = false;
  StateValue: any = {};

  constructor(public form: FormBuilder, private _StateService: StateServicesService,
    private _CountryService: CountryServicesService, public _router: Router
  ) {
    this.StateValue = this._StateService.getStateVal();
  }

  public buildForm() {
    this.signUpForm = this.form.group({
      CountryName: ['', [Validators.required]],
      StateName: ['', [Validators.required]]

    });
    console.log(this.signUpForm)
  }


  ngOnInit() {
    this.isEditing = this._StateService.getIsEditing()
    if (this.isEditing == true) {
      this.setForupdateStateVal();
    }
    this.buildForm();
    this.GetCountryName();
    // this.updateStateVal()
  }
  setForupdateStateVal() {
    this.StateModel.CountryId = this.StateValue.Country.CountryId;
    this.StateModel.StateName = this.StateValue.StateName;
    this.StateModel.StateId = this.StateValue.StateId;
  }

  backStateListForm() {
    debugger;
    this.isEditing = false;
    this.StateValue = {}
    this.StateModel = {}
    this._router.navigate(['/state'])
  }


  SaveState() {
    debugger;
    if (this.isEditing == true) {
      debugger;
      const state = new State();
      state.CountryId = this.StateModel.CountryId;
      state.StateName = this.StateModel.StateName;
      state.StateId = this.StateModel.StateId;
      this._StateService.updateStateDetail(state).subscribe((res: any) => {
        if (res) {
          debugger;
          alert("updated");
          this.isEditing = false;
          this.StateValue = {};
          this.StateModel = {};
        }
      });
    }
    if (this.isEditing == false) {
      debugger;
      const state = new State();
      state.CountryId = this.StateModel.CountryId;
      state.StateName = this.StateModel.StateName;
      this._StateService.saveStateDetail(state).subscribe((res: any) => {
        if (res) {

          this.StateModel = {};
          alert("saved success")
        }
      });
      console.log(state);
    }
  }


  GetCountryName() {
    this._CountryService.GetCountryList().subscribe((data: any) => {
      data['result']
      if (data) {
        this.CountryIdName = JSON.parse(data._body);
        console.log(this.CountryIdName, 'CountryName')
      }
    }
    )
  }
}
