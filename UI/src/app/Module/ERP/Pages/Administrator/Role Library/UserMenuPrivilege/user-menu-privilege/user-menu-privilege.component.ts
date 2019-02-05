import { Component, OnInit } from '@angular/core';
import { RoleServicesService } from '../../../../../Services/Administrator/RoleLibrary/RoleService';
import { NavBarMenuService } from '../../../../../Shared/NavBar/nav-bar-menu.service';
import { NavItem } from '../../../../../../../main-board/main-board.component';
import { Router } from '@angular/router';
import { HeaderStorageService } from '../../../../../../../header-storage.service';

@Component({
  selector: 'app-user-menu-privilege',
  templateUrl: './user-menu-privilege.component.html',
  styleUrls: ['./user-menu-privilege.component.css']
})
export class UserMenuPrivilegeComponent implements OnInit {
  RoleIdName: any = []
  UserMenuList: any = [];
  UserId: any;
  navItems: NavItem[] = [];
  constructor(private _RoleService: RoleServicesService, private _NavbarMenuService: NavBarMenuService, private _router: Router, private _headerStorage: HeaderStorageService, ) { }
  GetRoleName() {
    this._RoleService.listRoleDetails().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.RoleIdName = data;
        console.log(this.RoleIdName, 'RoleName')
      }
    }
    )
  }
  ngOnInit() {
    // this.GetRoleName();
    this.getUsermenu();
  }
  getUsermenu() {
    this.UserId = this._headerStorage.getUserId();
    if (this.UserId) {
      this._NavbarMenuService.getMenuesForNavbarbyUserid(this.UserId).subscribe((response: any) => {
        debugger;
        this.navItems = JSON.parse(response._body);
      })

    } else {
      alert("user is not set")
      this._router.navigate[('/login')];
    }

  }
}
