import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CompanyInitiationService } from '../../../../Services/Administrator/Organization/companyIntiationService';
import { DepartmentServicesService } from '../../../../Services/HumanResource/DepartmentService';
import { Designation } from '../../../../Models/HumanResource/Designation/DesignationModel';
import { DesignationServicesService } from '../../../../Services/HumanResource/DesignationService';
import { Router } from '@angular/router';
import { HeaderStorageService } from '../../../../../../header-storage.service';

@Component({
  selector   : 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls  : ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {

  public signUpForm   : FormGroup;
         DesignDetails: any;
  isEditing = false;
  ListDesignation: any=[];
  userCompanyId: any;
      
  
  constructor(public form: FormBuilder,private _CompanyName:CompanyInitiationService,
  private _departmentService:DepartmentServicesService,
  private _headerService:HeaderStorageService,private _designationservice:DesignationServicesService,private _router:Router) {
    this.DesignDetails = this._designationservice.getDesignVal();
  }  

  public ngOnInit() {
    this.isEditing=this._designationservice.getIsEditing();
    this.buildForm();
    this.viewCompanyDetails();
    this.viewdepartmentDetails();
    this.viewDesignationDetails();
if(this.isEditing==true){
this.setUpdateValueForDesignation();
}
  }
  setUpdateValueForDesignation(){
    debugger;
    this.designationtModel.DesignationName = this.DesignDetails.DesignationName;
    this.designationtModel.DesignationCode = this.DesignDetails.DesignationCode;
    this.designationtModel.CompanyId       = this.DesignDetails.CompanyId;
    this.designationtModel.DepartmentId    = this.DesignDetails.DepartmentId;
    this.designationtModel.DesignationId   = this.DesignDetails.DesignationId;
    this.designationtModel.Superior        = this.DesignDetails.Superior
  }
  ListCompanyIntiation:any = []
  viewCompanyDetails(){
    debugger;
this._CompanyName.listCompanyInitiation().subscribe((data:any) => { 
  if(data)
  this.ListCompanyIntiation =  JSON.parse(data._body);
  console.log(this.ListCompanyIntiation,"ListCompanyIntiation")
})
  }

  ListdepartmentDetails:any = []
  viewdepartmentDetails(){
    debugger;
    this.userCompanyId= this._headerService.getCompanyId()
    this._departmentService.listDepartmentDetails(this.userCompanyId).subscribe((data: any) => {
  if(data)
  this.ListdepartmentDetails =  JSON.parse(data._body);
  console.log(this.ListdepartmentDetails,"ListdepartmentDetails")
})
  }

  backDesignationListForm() {
    debugger;
    this.isEditing = false;
    this.designationtModel = {}
    this.DesignDetails = {}
    this._router.navigate(['/designation'])
  }
  designationtModel:any = []

 
  SaveDesignationDetails() {
    debugger;
    if(this.isEditing==true){
      const designation                 = new Designation ();
      designation.DesignationId = this.designationtModel.DesignationId;
            designation.DesignationName = this.designationtModel.DesignationName;
            designation.DesignationCode = this.designationtModel.DesignationCode;
            designation.CompanyId       = this.designationtModel.CompanyId;
            designation.DepartmentId    = this.designationtModel.DepartmentId;
            designation.Superior        = this.designationtModel.Superior
         
      this._designationservice.updateDepartmentDetail(designation).subscribe((res: any) => {
        if (res) {
          alert("Updated");
          this.designationtModel = []
        }
      });
      console.log(designation);
    }
    
    if(this.isEditing==false){
    const designation                 = new Designation ();
          designation.DesignationName = this.designationtModel.DesignationName;
          designation.DesignationCode = this.designationtModel.DesignationCode;
          designation.CompanyId       = this.designationtModel.CompanyId;
          designation.DepartmentId    = this.designationtModel.DepartmentId;
          designation.IsActive        = true
          designation.Superior        = this.designationtModel.Superior
    this._designationservice.saveDesignationDetail(designation).subscribe((res: any) => {
      if (res) {
        this.designationtModel = []
      }
    });
    console.log(designation);
  }
}
viewDesignationDetails() { 
  this.userCompanyId= this._headerService.getCompanyId()
  this._designationservice.listDesignationDetails(this.userCompanyId).subscribe((data: any) => {
    debugger;
    if (data)
      this.ListDesignation      =  JSON.parse(data._body);   
  })
}
public buildForm() {
  this.signUpForm = this.form.group({
    NameoftheCompany   : ['', [Validators.required]],
    NameoftheDepartment: ['', [Validators.required]],
    DesignationName    : ['', [Validators.required]],
    DesignationCode    : ['', [Validators.required]],
    Superior       : ['', [Validators.required]]
  });
console.log(this.signUpForm)
}

}


