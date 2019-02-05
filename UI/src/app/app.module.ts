import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule, MatInputModule, MatTabsModule, MatTabGroup, MatFormFieldControl } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule, MatNativeDateModule } from "@angular/material";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';

import {MatRadioModule} from '@angular/material/radio';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableAddComponent } from './table-add/table-add.component';
import { TableEditComponent } from './table-edit/table-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { MainBoardComponent } from './main-board/main-board.component';

import { UngridListComponent } from './ungrid-list/ungrid-list.component';
import { TableRowEditComponent } from './table-row-edit/table-row-edit.component';
import { CreateUserAccountComponent } from './Module/ERP/Pages/Administrator/creatingUserAccount/create-user-account/create-user-account.component';
import { ListOfUserAccountComponent } from './Module/ERP/Pages/Administrator/creatingUserAccount/list-of-user-account/list-of-user-account.component';
import { ListOfOrganizationLevelComponent } from './Module/ERP/Pages/Administrator/Organization/list-of-organization-level/list-of-organization-level.component';
import { CreateOrganizationLevelComponent } from './Module/ERP/Pages/Administrator/Organization/create-organization-level/create-organization-level.component';
import { ListAreaComponent } from './Module/ERP/Pages/Administrator/Location/Area/list-area/list-area.component';
import { CreateAreaComponent } from './Module/ERP/Pages/Administrator/Location/Area/create-area/create-area.component';
import { ListCityComponent } from './Module/ERP/Pages/Administrator/Location/City/list-city/list-city.component';
import { CreateCityComponent } from './Module/ERP/Pages/Administrator/Location/City/create-city/create-city.component';
import { ListCountryComponent } from './Module/ERP/Pages/Administrator/Location/Country/list-country/list-country.component';
import { CreateCountryComponent } from './Module/ERP/Pages/Administrator/Location/Country/create-country/create-country.component';
import { ListStateComponent } from './Module/ERP/Pages/Administrator/Location/State/list-state/list-state.component';
import { CreateStateComponent } from './Module/ERP/Pages/Administrator/Location/State/create-state/create-state.component';
import { ListOfRoleComponent } from './Module/ERP/Pages/Administrator/Role Library/CreateOfRole/list-of-role/list-of-role.component';
import { CreateRoleComponent } from './Module/ERP/Pages/Administrator/Role Library/CreateOfRole/create-role/create-role.component';
import { RoleMenuPrivilegeComponent } from './Module/ERP/Pages/Administrator/Role Library/RoleMenuPrivilege/role-menu-privilege/role-menu-privilege.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ListOfCompanyComponent } from './Module/ERP/Pages/Administrator/Organization/companyIntiation/list-of-company/list-of-company.component';
import { CreatecompanyIntiationComponent } from './Module/ERP/Pages/Administrator/Organization/companyIntiation/createcompany-intiation/createcompany-intiation.component';
import { UserMenuPrivilegeComponent } from './Module/ERP/Pages/Administrator/Role Library/UserMenuPrivilege/user-menu-privilege/user-menu-privilege.component';
import { DesignationListComponent } from './Module/ERP/Pages/HumanResource/Designation/designation-list/designation-list.component';
import { AddDesignationComponent } from './Module/ERP/Pages/HumanResource/Designation/add-designation/add-designation.component';
import { AddDepartmentComponent } from './Module/ERP/Pages/HumanResource/Department/add-department/add-department.component';
import { EmployeeListComponent } from './Module/ERP/Pages/HumanResource/Employee/employee-list/employee-list.component';
import { DepartmentListComponent } from './Module/ERP/Pages/HumanResource/Department/department-list/department-list.component';
import { AddEmployeeComponent } from './Module/ERP/Pages/HumanResource/Employee/add-employee/add-employee.component';
import { ChildMenuItemsComponent } from './child-menu-items/child-menu-items.component';
import { LoginComponent } from './Module/ERP/Pages/Common/Login/login/login.component';
// import {  OnlyNumber } from './Module/ERP/Shared/Directives/NumbresOnly/numbers-only.directive';
import { AuthGuard } from './Module/ERP/Shared/Directives/AuthGuard/AuthGuard';
import { StateServicesService } from './Module/ERP/Services/Administrator/Location/State.service';
import { CountryServicesService } from './Module/ERP/Services/Administrator/Location/CountryService';
import { CityServicesService } from './Module/ERP/Services/Administrator/Location/CityService';
import { AreaServicesService } from './Module/ERP/Services/Administrator/Location/Area.service';
import { OrganizationlevelService } from './Module/ERP/Services/Administrator/Organization/Organizationlevelservice';
import { CompanyInitiationService } from './Module/ERP/Services/Administrator/Organization/companyIntiationService';
import { RoleServicesService } from './Module/ERP/Services/Administrator/RoleLibrary/RoleService';
import { DepartmentServicesService } from './Module/ERP/Services/HumanResource/DepartmentService';
import { DesignationServicesService } from './Module/ERP/Services/HumanResource/DesignationService';
import { EmployeeServicesService } from './Module/ERP/Services/HumanResource/EmployeeService';
import { HeaderStorageService } from './header-storage.service';
import { LoginService } from './login.service';
import { NavBarMenuService } from './Module/ERP/Shared/NavBar/nav-bar-menu.service';
import { HttpModule } from '@angular/http';
import { UserAccountService } from './Module/ERP/Services/Administrator/UserAcccount/UserAccountService';
import { RoleMenuChildComponent } from './Module/ERP/Pages/Administrator/Role Library/RoleMenuPrivilege/role-menu-child/role-menu-child.component';
import { UserMenuChildComponent } from './Module/ERP/Pages/Administrator/Role Library/UserMenuPrivilege/user-menu-child/user-menu-child.component';
// import { AppDateAdapterDirective } from './Module/ERP/Directives/app-date-adapter.directive';
import { DateAdapter, NativeDateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from './Module/ERP/Directives/app-date-adapter.directive';
// import { ProductComponent } from './Module/ERP/Pages/product/product.component';
import { RawMaterialComponent } from './Module/ERP/Pages/Master/raw-material/raw-material.component';
import { StockProductComponent } from './Module/ERP/Pages/Master/stock-product/stock-product.component';
import { StockRawmaterialComponent } from './Module/ERP/Pages/Master/stock-rawmaterial/stock-rawmaterial.component';
import { UOMComponent } from './Module/ERP/Pages/Master/uom/uom.component';
import { ProductComponent } from './Module/ERP/Pages/Master/product/product.component';
import { CustomerComponent } from './Module/ERP/Pages/Master/customer/customer.component';
import { WorkOrderMasterComponent } from './Module/ERP/Pages/Master/work-order-master/work-order-master.component';

import { CustomerService } from './Module/ERP/Services/Master/customer.service';
import { ProductService } from './Module/ERP/Services/Master/product.service';
import { RawMaterialService } from './Module/ERP/Services/Master/raw-material.service';

import { StockProductService } from './Module/ERP/Services/Master/stock-product.service';
import { StockRawMaterialService } from './Module/ERP/Services/Master/stock-raw-material.service';
import { UOMService } from './Module/ERP/Services/Master/uom.service';
import { WorkOrderMasterService } from './Module/ERP/Services/Master/work-order-master.service';
import { SubContractComponent } from './Module/ERP/Pages/Master/sub-contract/sub-contract.component';
import { SubContractService } from './Module/ERP/Services/Master/sub-contract.service';
import { QualitycontrolComponent } from './Module/ERP/Pages/Master/qualitycontrol/qualitycontrol.component';
import { QualityAuditComponent } from './Module/ERP/Pages/Master/quality-audit/quality-audit.component';
import { PurchaseOrdermainComponent } from './Module/ERP/Pages/purchase-ordermain/purchase-ordermain.component';

import { BOMMasterComponent } from './Module/ERP/Pages/Master/bom-master/bom-master.component';
import { BOMDetailsComponent } from './Module/ERP/Pages/Master/bom-details/bom-details.component';
import { SalesSupplierPopupComponent } from './Module/ERP/Pages/Master/sales-pop-up/sales-supplier-popup/sales-supplier-popup.component';
import { SalesProductPopupComponent } from './Module/ERP/Pages/Master/sales-pop-up/sales-product-popup/sales-product-popup.component';
import { SupplierComponent } from './Module/ERP/Pages/Master/supplier/supplier.component';
import { PurchaseOrderService } from './Module/ERP/Services/Master/purchase-order.service';
import { SupplierPopUpComponent } from './Module/ERP/Pages/Master/Purchase-popup/supplier-pop-up/supplier-pop-up.component';
import { SalesOrdermainComponent } from './Module/ERP/Pages/sales-ordermain/sales-ordermain.component';
import { SalesOrderMasterService } from './Module/ERP/Services/Master/sales-order-master.service';

@NgModule({
  declarations: [
    AppComponent,
   
    DashboardComponent,
    TableAddComponent,
    TableEditComponent,
    MainBoardComponent,
    
    UngridListComponent,
    TableRowEditComponent,
    DesignationListComponent,
    AddDesignationComponent,
    AddDepartmentComponent,
    DepartmentListComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    CreateUserAccountComponent,
    ListOfUserAccountComponent,
    ListOfOrganizationLevelComponent,
    CreateOrganizationLevelComponent,
    ListAreaComponent,
    CreateAreaComponent,
    ListCityComponent,
    CreateCityComponent,
    ListCountryComponent,
    CreateCountryComponent,
    ListStateComponent,
    CreateStateComponent,
    ListOfRoleComponent,
    CreateRoleComponent,
    RoleMenuPrivilegeComponent,
    ListOfCompanyComponent,
    CreatecompanyIntiationComponent,
    UserMenuPrivilegeComponent,
    ChildMenuItemsComponent,
    LoginComponent,
    RoleMenuChildComponent,
    UserMenuChildComponent,
    ProductComponent,
    RawMaterialComponent,
    StockProductComponent,
    StockRawmaterialComponent,
    UOMComponent,
    CustomerComponent ,
    WorkOrderMasterComponent,
  
    SubContractComponent,
    QualitycontrolComponent,
    QualityAuditComponent,
    PurchaseOrdermainComponent,
    
    BOMMasterComponent,
    BOMDetailsComponent,
    SalesSupplierPopupComponent,
    SalesProductPopupComponent,
    SupplierComponent,
    SupplierPopUpComponent,
    SalesOrdermainComponent
    

    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,HttpClientModule,HttpModule,
    MatTableModule,
    MatCheckboxModule,MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    
    MatButtonModule,ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    SatPopoverModule,
    FormsModule,
    MatCardModule,
    MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatTooltipModule,
    MatSelectModule,
    OverlayModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [
    NavBarMenuService,
    AuthGuard,LoginService,
    CountryServicesService,
    StateServicesService,
    CityServicesService,
    AreaServicesService,
    OrganizationlevelService,
    CompanyInitiationService,
    RoleServicesService,
    DepartmentServicesService,
    DesignationServicesService,
    EmployeeServicesService,
    UserAccountService,
    HeaderStorageService,
    CustomerService,
    ProductService,
    RawMaterialService,
  
    
    StockProductService,
    StockRawMaterialService,
    UOMService,
    WorkOrderMasterService,
    SubContractService,
    PurchaseOrderService,
    SalesOrderMasterService,
    // SalesFormService,
  { provide: MAT_DATE_LOCALE, useValue: "en-us" },
  { provide: DateAdapter, useClass: AppDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }],
  entryComponents: [SupplierPopUpComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
