import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CompanyInitiationService } from '../../../../Services/Administrator/Organization/companyIntiationService';
import { Department } from '../../../../Models/HumanResource/Department/DepartmentModel';
import { DepartmentServicesService } from '../../../../Services/HumanResource/DepartmentService';
import { Router } from '@angular/router';
import { HeaderStorageService } from '../../../../../../header-storage.service';

@Component({
  selector   : 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls  : ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  public signUpForm: FormGroup;
  isEditing = false;
  DepartmentDetails: any=[];
  ListDepartment: any=[];
  userCompanyId: number;
 
  ListCompany: any;
  ListcompanyDetails: any;
      
  
  constructor(public form: FormBuilder,private _CompanyName:CompanyInitiationService,
  private _departmentService:DepartmentServicesService,private _router:Router,
  private _headerService:HeaderStorageService) {
    this.DepartmentDetails = this._departmentService.getDepartmentVal();
  }  
  public ngOnInit() {
    this.isEditing = this._departmentService.getIsEditing()
    this.buildForm();
    // this.companyDetailsIdandName();
    this.viewDepartmentDetails();
    this.viewCompanyDetails();
    if(this.isEditing==true){
      this.setUpdateValueForDepartment();
      
    }
  
  }
  setUpdateValueForDepartment(){
    debugger;
    this.departmentModel.DepartmentName = this.DepartmentDetails.DepartmentName;
    this.departmentModel.DepartmentCode = this.DepartmentDetails.DepartmentCode;
    this.departmentModel.CompanyId      = this.DepartmentDetails.CompanyId;
    this.departmentModel.ParentId       = this.DepartmentDetails.ParentId;
    this.departmentModel.DepartmentId   = this.DepartmentDetails.DepartmentId;
    this.departmentModel.ParentName   = this.DepartmentDetails.ParentName;
  }
  backDepartmentListForm() {
    debugger;
    this.isEditing = false;
    this.departmentModel = {}
    this.DepartmentDetails = {}
    this._router.navigate(['/department'])
  }

  ListCompanyIntiation:  any = []
// companyDetailsIdandName(){
//   debugger
//   this.ListcompanyDetails=this._headerService.getCompanyName();
//    this.ListCompany=JSON.parse(this.ListcompanyDetails)
// }
  viewCompanyDetails(){
    debugger;
this._CompanyName.listCompanyInitiation().subscribe((data:any) => { 
  if(data)
  this.ListCompany = JSON.parse(data._body);
  console.log(this.ListCompany,"ListCompanyIntiation")
})
  }
  viewDepartmentDetails() {
    debugger;
    
    this.userCompanyId= this._headerService.getCompanyId()
    this._departmentService.listDepartmentDetails(this.userCompanyId).subscribe((data: any) => {
      debugger;
      if (data)
        this.ListDepartment      = JSON.parse(data._body);
      console.log(this.ListDepartment, "Parentdepartment")
      
    })
  }
 
departmentModel:any = []


  SaveDepartmentDetails() {
    debugger;
     if(this.isEditing==true){
     debugger;
      const department                = new Department ();
      department.DepartmentId = this.departmentModel.DepartmentId;
            department.DepartmentCode = this.departmentModel.DepartmentCode;
            department.CompanyId      = this.departmentModel.CompanyId;
            department.ParentId       = this.departmentModel.ParentId;
            department.DepartmentName  = this.departmentModel.DepartmentName;
            department.DepartmentId   = this.departmentModel.DepartmentId;
            department.IsActive   = true;
this._departmentService.updateDepartmentDetail(department).subscribe((res: any) => {
  if (res) {
    debugger;
    alert("updated");
    this.isEditing         = false;
    this.DepartmentDetails = []
     this.departmentModel   = []
  }
});

    }
if(this.isEditing==false){
    debugger
    const department                = new Department ();
          department.DepartmentName = this.departmentModel.DepartmentName;
          
          department.DepartmentCode = this.departmentModel.DepartmentCode;
          department.CompanyId      = this.departmentModel.CompanyId;
          department.ParentId       = this.departmentModel.ParentId
          
    this._departmentService.saveDepartmentDetail(department).subscribe((res: any) => {
      if (res) {
        alert("Saved");
        this.departmentModel = []
      }
    });
    console.log(department);
  }
}
  public buildForm() {
    this.signUpForm = this.form.group({
      DepartmentName   : ['', [Validators.required]],
      CompanyId: ['', [Validators.required]],
      DepartmentCode     : ['', [Validators.required]],
     ParentId    : ['', [Validators.required]],
     });
     
console.log(this.signUpForm)
  }


}
