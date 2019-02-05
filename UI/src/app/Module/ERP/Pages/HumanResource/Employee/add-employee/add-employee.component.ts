import { Component, OnInit, HostListener } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { DepartmentServicesService } from '../../../../Services/HumanResource/DepartmentService';
import { DesignationServicesService } from '../../../../Services/HumanResource/DesignationService';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel, EmployeeAddress } from '../../../../Models/HumanResource/Employee/EmployeeModel';
import { Router } from '@angular/router';
import { EmployeeServicesService } from '../../../../Services/HumanResource/EmployeeService';
import { stringify } from '@angular/core/src/util';
import { HeaderStorageService } from '../../../../../../header-storage.service';
// import { OnlyNumber } from '../../../../Shared/Directives/NumbresOnly/numbers-only.directive';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})

export class AddEmployeeComponent implements OnInit {
  maxDate = new Date();
  model: any = [];
  address: any={}
  API_URL: any
  public signUpForm: FormGroup;
  public signForm: FormGroup;
  models: any;
  userCompanyId: any;
  ListDepartment: any;
  ListDesignation: any;
  isEditing: boolean = false;
  employeeDetails: any;
 
  
  constructor(public form: FormBuilder, private _departmentService: DepartmentServicesService,
    private _designationservice: DesignationServicesService, private _headerService: HeaderStorageService,
    private http: HttpClient, private _router: Router, private _employeeService: EmployeeServicesService) {
    this.API_URL = environment.apiUrl;
    this.userCompanyId= this._headerService.getCompanyId()
    this.employeeDetails = this._employeeService.getEmpVal();
 
    // this.model.DOJ = new Date().toISOString().substr(0, 10);

  }
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
 
  DepartmentName: any = []

  DesignationtName: any = []
  public ngOnInit() {
    this.isEditing = this._employeeService.getIsEditing();
    this.viewDepartmentDetails();
    if (this.isEditing == true) {
      this.setUpdateValueForEmployee();
    }
  }
  setUpdateValueForEmployee() {
    this.model.EmployeeId     =this.employeeDetails.EmployeeId;
    this.model.FirstName      =this.employeeDetails.FirstName;
    this.model.LastName       =this.employeeDetails.LastName;
    this.model.FatherName=this.employeeDetails.FatherName;
    this.model.Gender=this.employeeDetails.Gender;
    this.model.DOB=this.employeeDetails.DOB;
    this.model.DOJ=this.employeeDetails.DOJ;
    this.model.CompanyId=this.userCompanyId
    this.model.DepartmentId=this.employeeDetails.DepartmentId;
    this. viewDesignationByDeptId(this.model.DepartmentId)
    this.model.DesignationId=this.employeeDetails.DesignationId;
    this.model.MaritalStatus=this.employeeDetails.MaritalStatus;
    this.model.BloodGroup=this.employeeDetails.BloodGroup;
    this.model.ProfilePhoto=this.employeeDetails.ProfilePhoto;
    this.model.BloodGroup=this.employeeDetails.BloodGroup;
    this.address=this.employeeDetails.EmpAddress;
  }
  backtoEmployeeListForm() {
    debugger;
    this.isEditing = false;
    this.employeeDetails = {}
    this.model = {}
    this._router.navigate(['/employee'])
  }
  url = '';
  fileUpload(event) {
    debugger;

    let filelist: FileList = event.target.files;
    if (filelist.length > 0) {
      let file: File = filelist[0];
      let formData: FormData = new FormData();
      formData.append('fileAttach', file, file.name);
      this.http.post(this.API_URL + 'Employee/FileUpload', formData).subscribe(data => {
        debugger;
        data['result']
        if (data) {
          this.model.ProfilePhoto = data['result'];
          console.log(data)
        }
      });
    }
  }




  viewDepartmentDetails() {
    debugger;

    this.userCompanyId = this._headerService.getCompanyId()
    this._departmentService.listDepartmentDetails(this.userCompanyId).subscribe((data: any) => {
      debugger;
      if (data)
        this.ListDepartment = JSON.parse(data._body);
      console.log(this.ListDepartment, "Parentdepartment")

    })
  }

  viewDesignationByDeptId(element) {
    debugger;

    this._designationservice.listDesignationDetailsByDeptId(element).subscribe((data: any) => {
      debugger;
      if (data)
        this.ListDesignation = JSON.parse(data._body);
      console.log(this.ListDesignation, "Desgn")

    })
  }

  savedEmployeeDetails() {
    debugger;
  
if(this.isEditing==true){
  let employee = new EmployeeModel();
  employee.ModifiedBy= 1;
  employee.EmployeeId    =this.model.EmployeeId;
  employee.FirstName =     this.model.FirstName;
  employee.LastName =      this.model.LastName
  employee.FatherName =    this.model.FatherName
  employee.Gender =        this.model.Gender
  employee.DOB =           this.model.DOB
  employee.DOJ =           this.model.DOJ
  employee.CompanyId =     this.userCompanyId,
  employee.DepartmentId =  this.model.DepartmentId
  employee.DesignationId = this.model.DesignationId
  employee.MaritalStatus = this.model.MaritalStatus
  employee.BloodGroup =    this.model.BloodGroup
  employee.ProfilePhoto =  this.model.ProfilePhoto
  employee.BloodGroup =    this.model.BloodGroup;
   employee.EmpAddress =    this.address;
 
  // employee.EmpAddress.push(EmployeeAddress)
  this._employeeService.updateEmployeeDetail(employee).subscribe
    ((res: any) => {
      debugger;
      if (res) {
        alert("success");
        this.model = []
      }
    });
  console.log(this.model);

}
else{

    let employee = new EmployeeModel();
    employee.FirstName =     this.model.FirstName;
    employee.LastName =      this.model.LastName
    employee.FatherName =    this.model.FatherName
    employee.Gender =        this.model.Gender
    employee.DOB =           this.model.DOB
    employee.DOJ =           this.model.DOJ
    employee.CompanyId =     this.userCompanyId
    employee.DepartmentId =  this.model.DepartmentId
    employee.DesignationId = this.model.DesignationId
    employee.MaritalStatus = this.model.MaritalStatus
    employee.BloodGroup =    this.model.BloodGroup
    employee.ProfilePhoto =  this.model.ProfilePhoto
    employee.BloodGroup =    this.model.BloodGroup;
    employee.EmpAddress =    this.address;
    
   debugger;
    this._employeeService.saveEmployeeDetail(employee).subscribe
      ((res: any) => {
        debugger;
        if (res) {
          alert("success");
          this.model = []
        }
      });
    console.log(this.model);
  }}

  isPerAddressSamaeAsCommAddress(){
 
    if(this.address.IsSameAddress==true){
      this.address.CommAddress1=this.address.PerAddress1
      this.address.CommAddress2=this.address.PerAddress2
      this.address.CommAddress1=this.address.PerAddress1
      this.address.CommEmailId=this.address.PerEmailId
      this.address.CommPincode=this.address.PerPincode
      this.address.CommCountry=this.address.PerCountry
      this.address.CommState=this.address.PerState
      this.address.CommCity=this.address.PerCity
      this.address.CommArea=this.address.PerArea
      this.address.CommMobile=this.address.PerMobile
      this.address.CommLandline=this.address.PerLandline
     

    }
    else{
      this.address.CommAddress1=""
      this.address.CommAddress2=""
      this.address.CommAddress1=""
      this.address.CommEmailId=""
      this.address.CommPincode=""
      this.address.CommCountry=""
      this.address.CommState=""
      this.address.CommCity=""
      this.address.CommArea=""
      this.address.CommMobile=""
      this.address.CommLandline=""
    }
  }

  isShow: boolean;
  show() {
    if (this.model.IsSameAddress == false) {
      this.isShow = true;
    }
    else {
      this.isShow = false
    }
  }

}
