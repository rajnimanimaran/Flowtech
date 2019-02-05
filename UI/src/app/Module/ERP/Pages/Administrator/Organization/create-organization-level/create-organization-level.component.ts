import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizationlevelService } from '../../../../Services/Administrator/Organization/Organizationlevelservice';
import { OrganizationLevel } from '../../../../Models/Administrator/Organization/Organizationmodel';
import { Router } from '@angular/router';
//import { OrganizationLevel } from '../../../../Models/Organization/Organizationmodel';


@Component({
  selector   : 'app-create-organization-level',
  templateUrl: './create-organization-level.component.html',
  styleUrls  : ['./create-organization-level.component.css']
})
export class CreateOrganizationLevelComponent implements OnInit {

  public signUpForm: FormGroup;
  isEditing=false;
  orgValue:any;
  organizationlevel: {};
      
  
  constructor(public form: FormBuilder,
    private _OrganizationLevel:OrganizationlevelService,private _router:Router) {
      this.orgValue = this._OrganizationLevel.getorgVal();
    }  
    backOrgListForm(){
      debugger;
      this.isEditing = false;
      this.organizationlevel = {}
      this.model = {}
      this._router.navigate(['/organization'])
    }
  public buildForm() {
    this.signUpForm = this.form.group({
      OrganizationLevelCode: ['', [Validators.required]],
      NameofOrganization   : ['', [Validators.required]],
      Parent      : ['', [Validators.required]]
    });
console.log(this.signUpForm)
  }

  public ngOnInit() {
    
    this.buildForm();
    this.GetOrganizationLevelName();
    // this.updateorg();
  this.isEditing=this._OrganizationLevel.getIsEditing();
  if(this.isEditing==true){
    this.setForupdateOrgLevel();
  }
  }
  model                  :any = []

  OrganizationlevelArray:any  = []

  setForupdateOrgLevel(){
    this.model.LevelName = this.orgValue.LevelName;
    this.model.Code = this.orgValue.Code;
    this.model.OrganizationLevelId=this.orgValue.OrganizationLevelId;
    this.model.Parent=this.orgValue.Parent;
  }
// updateorg(){
//   debugger;
//   if (this.orgValue == 0) {
//     this.isEditing = false;
//   }
//   else {
//     this.isEditing            = true;
//     this.model.LevelName = this.orgValue.LevelName;
//     this.model.Code = this.orgValue.Code;
//     console.log(this.orgValue,"this.orgValue")
   
//   }
// }
  saveOrganizationLevel()
  {
    debugger;
    if(this.isEditing==true){
      const organizationlevel           = new OrganizationLevel();
      organizationlevel.LevelName = this.model.LevelName;
      organizationlevel.OrganizationLevelId=this.model.OrganizationLevelId;
      organizationlevel.Code      = this.model.Code;
      organizationlevel.Parent    =this.model.Parent;
      organizationlevel.ParentName    =this.model.ParentName;
this._OrganizationLevel.updateOrganizationLevel(organizationlevel).subscribe((res: any) => {
  if (res) { this.OrganizationlevelArray = [] } });
  alert("updated")
console.log(organizationlevel);
}
    if(this.isEditing==false)
{    debugger;
    const organizationlevel           = new OrganizationLevel();
    organizationlevel.OrganizationLevelId=this.model.OrganizationLevelId;
          organizationlevel.LevelName = this.model.LevelName;
          organizationlevel.Code      = this.model.Code;
          organizationlevel.Parent    =this.model.Parent;
          
    this._OrganizationLevel.saveOrganizationLevel(organizationlevel).subscribe((res: any) => {
      if (res) { this.OrganizationlevelArray = [] } });
      alert("Success")
    console.log(organizationlevel);
  }}
  OrganizationlevelIdName:any = []
  GetOrganizationLevelName() {     
    this._OrganizationLevel.listOrganizationLevel().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
      this.OrganizationlevelIdName = JSON.parse(data._body);
        console.log(this.OrganizationlevelIdName, 'OrganizationlevelIdName')
      }
    }
    )
  }

}


