import { Component, OnInit } from '@angular/core';
import { RoleServicesService } from '../../../../../Services/Administrator/RoleLibrary/RoleService';
import { NavBarMenuService } from '../../../../../Shared/NavBar/nav-bar-menu.service';
import { Router } from '@angular/router';
import { HeaderStorageService } from '../../../../../../../header-storage.service';
import { NavItem } from '../../../../../../../main-board/main-board.component';

@Component({
  selector   : 'app-role-menu-privilege',
  templateUrl: './role-menu-privilege.component.html',
  styleUrls  : ['./role-menu-privilege.component.css']
})
export class RoleMenuPrivilegeComponent implements OnInit {
  RoleName:any = []
  model:any={}
  UserId: any;
  navItems       : NavItem[] = [];
  items: NavItem[]
  constructor(private _RoleService:RoleServicesService,private _NavbarMenuService : NavBarMenuService,private _router:Router,private _headerStorage:HeaderStorageService,) { }
  
  GetRoleName() {     
    this._RoleService.listRoleDetails().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
      this.RoleName = JSON.parse(data._body);
        console.log(this.RoleName, 'RoleName')
      }
    }
    )
  }
 
  ngOnInit() {
    this.GetRoleName();
    this.getRole();
  }
  getRole() {
    this.UserId=this._headerStorage.getUserId();
    if(this.UserId){
      this._NavbarMenuService.getMenuesForNavbarbyUserid(this.UserId).subscribe((response:any)=>{
    debugger;
        this.navItems=JSON.parse( response._body)   ;
      })
    
    }else{
      alert("user is not set")
      this._router.navigate[('/login')];
    }
    
      }
}
