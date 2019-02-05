import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup ,FormControl} from '@angular/forms';
import { RoleServicesService } from '../../../../../Services/Administrator/RoleLibrary/RoleService';
import { Role } from '../../../../../Models/Administrator/RoleLibrary/Role';
import { OrganizationlevelService } from '../../../../../Services/Administrator/Organization/Organizationlevelservice';
import { Router } from '@angular/router';

@Component({
  selector   : 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls  : ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  public signUpForm: FormGroup;
  isEditing=false;
  rolevalue: any={};
      
  
  constructor(public form: FormBuilder,private _RoleService:RoleServicesService,
  private _organizationlevel:OrganizationlevelService,private _router:Router) {
    this.rolevalue = this._RoleService.getRoleVal();
  }  

  Rolemodel :any = []
  RoleArray:any  = []

  backRoleListForm() {
    debugger;
    this.isEditing = false;
    this.rolevalue = {}
    this.Rolemodel = {}
    this._router.navigate(['/role'])
  }

 
  public buildForm() {
    this.signUpForm = this.form.group({
      RoleName          : ['', [Validators.required]],
      Organizationlevels: ['', [Validators.required]]
      
    });
console.log(this.signUpForm)
  }
  
  SaveRole() {
    if(this.isEditing==false){
    const role                     = new Role ();
          role.RoleName            = this.Rolemodel.RoleName;
          role.OrganizationLevelId = this.Rolemodel.OrganizationLevelId;
    this._RoleService.saveRoleDetail(role).subscribe((res: any) => {
      if (res) {

   
        alert("Saved")
      }
    });
    console.log(role);
  }
  if(this.isEditing==true){
    debugger;
    const role                     = new Role ();
    role.RoleName            = this.Rolemodel.RoleName;
    role.OrganizationLevelId = this.Rolemodel.OrganizationLevelId;
    role.RoleId=this.rolevalue.RoleId;
    this._RoleService.modifyRoleDetail(role).subscribe((res: any) => {
      if (res) {

        alert("Updated")
      }
    });
  }
}
  
  organizationlevelIdName:any=[]

  GetorganizationlevelName() {
    debugger;
    this._organizationlevel.listOrganizationLevel().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
      this.organizationlevelIdName = JSON.parse(data._body);
        console.log(this.organizationlevelIdName, 'organizationlevelName')
      }
    }
    )
  }

  public ngOnInit() {
    this.buildForm();
    this.GetorganizationlevelName();
    this.isEditing = this._RoleService.getIsEditing()
    if (this.isEditing == true) {
       this.setForupdateRole();
    }
   
  }
  setForupdateRole(){
  
  this.Rolemodel.RoleName = this.rolevalue.RoleName;
  this.Rolemodel.OrganizationLevelId = this.rolevalue.OrganizationLevelId;

}

}

