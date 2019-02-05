import { HostBinding, Component, OnInit, Inject } from "@angular/core";
import { OverlayContainer } from "@angular/cdk/overlay";
import { MatDialog } from "@angular/material";
import { HeaderStorageService } from "../header-storage.service";
import { NavBarMenuService } from "../Module/ERP/Shared/NavBar/nav-bar-menu.service";
import { Router } from "@angular/router";

@Component({
  selector   : 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls  : ['./main-board.component.css']
})
export class MainBoardComponent implements OnInit {
  groupList      : any[] = [];
  getList        : any;
  subGroupList   : any[] = [];
  SubSubGroupList: any[] = [];
  menuList       : any[] = [];
  userName       : string;
  navItems       : NavItem[] = [];
  UserId: any;

  constructor(private _NavbarMenuService : NavBarMenuService,private _router:Router,private _headerStorage:HeaderStorageService,public _overlayContainer: OverlayContainer,public dialog: MatDialog) {}

  @HostBinding("class")
  componentCssClass;
  onSetTheme(theme) {
    this._overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

  ngOnInit() {
this.UserId=this._headerStorage.getUserId();
if(this.UserId){
  this._NavbarMenuService.getMenuesForNavbarbyUserid(this.UserId).subscribe((response:any)=>{
debugger;
    this.navItems=JSON.parse( response._body) 
  })

}else{ 
  alert("user is not set")
  this._router.navigate[('/login')];
}

  }
}

export interface NavItem {
  Menu_Id    : number;
  displayName: string;
  route?     : string;
  children?  : NavItem[];
}
