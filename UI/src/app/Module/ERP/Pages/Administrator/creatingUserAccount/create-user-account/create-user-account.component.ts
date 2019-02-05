import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DepartmentServicesService } from '../../../../Services/HumanResource/DepartmentService';
import { RoleServicesService } from '../../../../Services/Administrator/RoleLibrary/RoleService';
import { UserAccount } from '../../../../Models/Administrator/UserAccount/userAccount';
import { UserAccountService } from '../../../../Services/Administrator/UserAcccount/UserAccountService';
import { Router } from '@angular/router';
import { DesignationServicesService } from '../../../../Services/HumanResource/DesignationService';
import { CompanyInitiationService } from '../../../../Services/Administrator/Organization/companyIntiationService';
import { HeaderStorageService } from '../../../../../../header-storage.service';
import { EmployeeServicesService } from '../../../../Services/HumanResource/EmployeeService';


@Component({
  selector: 'app-create-user-account',
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.css']
})
export class CreateUserAccountComponent implements OnInit {

  public signUpForm: FormGroup;
  user: any = [];
  isEditing=false;
  userDetails: any;
  ListDesignation: any;
  userCompanyId: any;
  ListEmployee: any;
  ListEmployees: any;


  constructor(public form: FormBuilder,private _CompanyName:CompanyInitiationService, private _departmentService: DepartmentServicesService,
    private _listRoleservice: RoleServicesService,private _designationservice:DesignationServicesService,
    private _headerService:HeaderStorageService, private _userService: UserAccountService,private _router:Router,
    private _employeeService:EmployeeServicesService) {    
    }

  ListRole: any = []
  public ngOnInit() {
    this.userDetails=this._userService.getUserVal();
    this.isEditing=this._userService.getIsEditing();
    this.buildForm();
    this.viewCompanyDetails();
    // this.viewDepartmentDetailsByCompanyId()
    // this.viewEmployeeByCompanyId() 
    // this.viewDepartmentDetails();
    this.viewRoleName();
    if(this.isEditing==true){
      debugger;
      this.setUpdateValueForUser();
    }
  
  }
  setUpdateValueForUser(){
    debugger;
    this.user.FirstName = this.userDetails.FirstName;
    this.user.LastName = this.userDetails.LastName;
    this.user.Username = this.userDetails.Username;
    this.user.PassWord = this.userDetails.PassWord;
    this.user.ConfirmPassWord  = this.userDetails.ConfirmPassWord;
    this.user.EmailId=this.userDetails.EmailId;
    this.user.CompanyId=this.userDetails.Company.CompanyId;
    this.viewDepartmentDetails(this.user.CompanyId);
    this.user.DepartmentId=this.userDetails.DepartmentId;
    this.viewDesignationByDeptId(this.user.DepartmentId)
    this.user.DesignationId=this.userDetails.DesignationId;
    this.viewEmployeeByDesignationId( this.user.DesignationId)
    this.user.RefId=this.userDetails.RefId;
    this.user.RoleId=this.userDetails.Role.RoleId;
   
    this.user.UserId=this.userDetails.UserId;

  }
  backUserListForm() {
    debugger;
    this.isEditing = false;
    this.user = {}
    this.userDetails = {}
    this._router.navigate(['createUser'])
  }

  
  signUp() {
debugger;
if(this.isEditing==true){
  const userModel = new UserAccount();
  userModel.FirstName = this.user.FirstName;
  userModel.LastName = this.user.LastName;
  userModel.UserName = this.user.Username;
  userModel.PassWord = this.user.PassWord;
  userModel.ConfirmPassWord = this.user.ConfirmPassWord;
  userModel.UserId=this.user.UserId;
  userModel.EmailId = this.user.EmailId
  userModel.DepartmentId = this.user.DepartmentId
  userModel.DesignationId = this.user.DesignationId
  userModel.RefId =          this.user.EmployeeId
  userModel.RoleId =          this.user.RoleId
  userModel.CompanyId=         this.user.CompanyId
  // userModel.CreatedBy=this.user.CreatedBy

  this._userService.updateUserDetail(userModel).subscribe((res: any) => {
    if (res) {


      alert("Saved")
    }
  });
  console.log(userModel);

}
if(this.isEditing==false){
    const userModel = new UserAccount();
    userModel.FirstName = this.user.FirstName;
    userModel.LastName = this.user.LastName;
    userModel.UserName = this.user.Username;
    userModel.PassWord = this.user.PassWord;
    userModel.ConfirmPassWord = this.user.ConfirmPassWord;
    userModel.EmailId = this.user.EmailId
    userModel.DepartmentId =   this.user.DepartmentId     
    userModel.DesignationId =   this.user.DesignationId     
    userModel.RefId =            this.user.EmployeeId    
    userModel.RoleId =            this.user.RoleId   
    userModel.CompanyId=           this.user.CompanyId    
      
    this._userService.saveUserAccount(userModel).subscribe((res: any) => {
      if (res) {


        alert("Saved")
      }
    });
    console.log(userModel);
  }
  }
  ListCompanyIntiation:  any = []

  viewCompanyDetails(){
    debugger;
this._CompanyName.listCompanyInitiation().subscribe((data:any) => { 
  if(data)
  this.ListCompanyIntiation = JSON.parse(data._body);
  console.log(this.ListCompanyIntiation,"ListCompanyIntiation")
})
  }

  ListDepartment: any = []
  viewDepartmentDetails(element) {
    debugger;
    // this.userCompanyId= this._headerService.getCompanyId()
    this._departmentService.listDepartmentDetails(element).subscribe((data: any) => {
      debugger;
      if (data)
        this.ListDepartment = JSON.parse(data._body);
      console.log(this.ListDepartment, "ListDepartment")

    })
  }
  viewEmployeeByCompanyId() {
    debugger;
    
    this.userCompanyId= this._headerService.getCompanyId()
    this._employeeService.listEmployeeByCompanyId(this.userCompanyId).subscribe((data: any) => {
      debugger;
      if (data)
        this.ListEmployee     = JSON.parse(data._body);
      console.log(this.ListEmployee, "ListEmployee")
      
    })
  }
  viewEmployeeByDesignationId(element) {
    debugger;
    
    // this.userCompanyId= this._headerService.getCompanyId()
    this._employeeService.listEmployeeByDesignationId(element).subscribe((data: any) => {
      debugger;
      if (data)
        this.ListEmployees     = JSON.parse(data._body);
      console.log(this.ListEmployees, "ListEmployees")
      
    })
  }
  viewRoleName() {
    debugger;
    this._listRoleservice.listRoleDetails().subscribe((data: any) => {
      debugger;
      if (data)
        this.ListRole = JSON.parse(data._body);

      console.log(this.ListRole, "RoleName")

    })
  }

  viewDesignationByDeptId(element) {
    debugger;
    
    this._designationservice.listDesignationDetailsByDeptId(element).subscribe((data: any) => {
      debugger;
      if (data)
        this.ListDesignation     = JSON.parse(data._body);
      console.log(this.ListDesignation, "Desgn")
      
    })
  }

  checkUserName(name){
    debugger
    this._userService.CheckUserName(name).subscribe((data: any) => {
      debugger;
      if (data)
     alert("USerName Already Exists")
      
    })
  }

  checkEmailId(mailid){
    debugger
    this._userService.CheckEmailId(mailid).subscribe((data: any) => {
      debugger;
      if (data)
     alert("EmailID Already Exists")
      
    })
  }
  public buildForm() {
    this.signUpForm = this.form.group({
      Department: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      PassWord: ['', [Validators.required]],
      ConfirmPassWord: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      EmailId: ['', [Validators.required]],
      RoleName: ['', [Validators.required]],
      UserId: ['', [Validators.required]],
      RoleId: ['', [Validators.required]],
      CompanyId: ['', [Validators.required]],
      DepartmentId: ['', [Validators.required]],
      DesignationId: ['', [Validators.required]],
      RefId: ['', [Validators.required]],


    });
    console.log(this.signUpForm)
  }



}

