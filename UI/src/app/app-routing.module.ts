import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableAddComponent } from './table-add/table-add.component';
import { TableEditComponent } from './table-edit/table-edit.component';
import { TableRowEditComponent } from './table-row-edit/table-row-edit.component';
import { MainBoardComponent } from './main-board/main-board.component';
import { UngridListComponent } from './ungrid-list/ungrid-list.component';
import { ListOfUserAccountComponent } from './Module/ERP/Pages/Administrator/creatingUserAccount/list-of-user-account/list-of-user-account.component';
import { CreateUserAccountComponent } from './Module/ERP/Pages/Administrator/creatingUserAccount/create-user-account/create-user-account.component';
import { ListOfOrganizationLevelComponent } from './Module/ERP/Pages/Administrator/Organization/list-of-organization-level/list-of-organization-level.component';
import { CreateOrganizationLevelComponent } from './Module/ERP/Pages/Administrator/Organization/create-organization-level/create-organization-level.component';
import { ListAreaComponent } from './Module/ERP/Pages/Administrator/Location/Area/list-area/list-area.component';
import { CreateAreaComponent } from './Module/ERP/Pages/Administrator/Location/Area/create-area/create-area.component';
import { CreateCountryComponent } from './Module/ERP/Pages/Administrator/Location/Country/create-country/create-country.component';
import { ListCountryComponent } from './Module/ERP/Pages/Administrator/Location/Country/list-country/list-country.component';
import { ListStateComponent } from './Module/ERP/Pages/Administrator/Location/State/list-state/list-state.component';
import { CreateStateComponent } from './Module/ERP/Pages/Administrator/Location/State/create-state/create-state.component';
import { CreateCityComponent } from './Module/ERP/Pages/Administrator/Location/City/create-city/create-city.component';
import { ListCityComponent } from './Module/ERP/Pages/Administrator/Location/City/list-city/list-city.component';
import { ListOfRoleComponent } from './Module/ERP/Pages/Administrator/Role Library/CreateOfRole/list-of-role/list-of-role.component';
import { CreateRoleComponent } from './Module/ERP/Pages/Administrator/Role Library/CreateOfRole/create-role/create-role.component';
import { RoleMenuPrivilegeComponent } from './Module/ERP/Pages/Administrator/Role Library/RoleMenuPrivilege/role-menu-privilege/role-menu-privilege.component';
import { ListOfCompanyComponent } from './Module/ERP/Pages/Administrator/Organization/companyIntiation/list-of-company/list-of-company.component';
import { CreatecompanyIntiationComponent } from './Module/ERP/Pages/Administrator/Organization/companyIntiation/createcompany-intiation/createcompany-intiation.component';
import { UserMenuPrivilegeComponent } from './Module/ERP/Pages/Administrator/Role Library/UserMenuPrivilege/user-menu-privilege/user-menu-privilege.component';
import { DesignationListComponent } from './Module/ERP/Pages/HumanResource/Designation/designation-list/designation-list.component';
import { AddDesignationComponent } from './Module/ERP/Pages/HumanResource/Designation/add-designation/add-designation.component';
import { DepartmentListComponent } from './Module/ERP/Pages/HumanResource/Department/department-list/department-list.component';
import { AddDepartmentComponent } from './Module/ERP/Pages/HumanResource/Department/add-department/add-department.component';
import { EmployeeListComponent } from './Module/ERP/Pages/HumanResource/Employee/employee-list/employee-list.component';
import { AddEmployeeComponent } from './Module/ERP/Pages/HumanResource/Employee/add-employee/add-employee.component';


import { LoginComponent } from './Module/ERP/Pages/Common/Login/login/login.component';
import {AuthGuard} from './Module/ERP/Shared/Directives/AuthGuard/AuthGuard';
// import { ProductComponent } from './Module/ERP/Pages/product/product.component';
import { StockProductComponent } from './Module/ERP/Pages/Master/stock-product/stock-product.component';
import { StockRawmaterialComponent } from './Module/ERP/Pages/Master/stock-rawmaterial/stock-rawmaterial.component';
import { RawMaterialComponent } from './Module/ERP/Pages/Master/raw-material/raw-material.component';
import { UOMComponent } from './Module/ERP/Pages/Master/uom/uom.component';
import { ProductComponent } from './Module/ERP/Pages/Master/product/product.component';
import { CustomerComponent } from './Module/ERP/Pages/Master/customer/customer.component';

import { WorkOrderMasterComponent } from './Module/ERP/Pages/Master/work-order-master/work-order-master.component';

import { SubContractComponent } from './Module/ERP/Pages/Master/sub-contract/sub-contract.component';
import { QualityAuditComponent } from './Module/ERP/Pages/Master/quality-audit/quality-audit.component';
import { QualitycontrolComponent } from './Module/ERP/Pages/Master/qualitycontrol/qualitycontrol.component';
import { PurchaseOrdermainComponent } from './Module/ERP/Pages/purchase-ordermain/purchase-ordermain.component';
import { SalesOrdermainComponent } from './Module/ERP/Pages/sales-ordermain/sales-ordermain.component';
import { BOMMasterComponent } from './Module/ERP/Pages/Master/bom-master/bom-master.component';
import { BOMDetailsComponent } from './Module/ERP/Pages/Master/bom-details/bom-details.component';
import { SupplierComponent } from './Module/ERP/Pages/Master/supplier/supplier.component';





const routes: Routes = [ 
  {
    path     : '',
    component: LoginComponent,
  },
  {
    path     : 'login',
    component: LoginComponent,
  },
  {
    path       : '',
    component  : MainBoardComponent,
    canActivate: [AuthGuard],
    children   : [

      {
        path     : 'View',
        pathMatch: 'full',
        component: TableAddComponent, 
      },
      {
        path     : 'designation',
        component: DesignationListComponent,
      },
      {
        path     : 'AddDesignation',
        component: AddDesignationComponent,
      },
      {
        path     : 'AddCity',
        component: CreateCityComponent,
      },
      {
        path     : 'city',
        component: ListCityComponent,
      },
      {
        path     : 'AddCountry',
        component: CreateCountryComponent,
      },
      {
        path     : 'country',
        component: ListCountryComponent,
      },
      {
        path     : 'company',
        component: ListOfCompanyComponent,
      },
      {
        path     : 'CreateCompany',
        component: CreatecompanyIntiationComponent,
      },
      {
        path     : 'roleMenuMapping',
        component: RoleMenuPrivilegeComponent,
      },
      {
        path     : 'userMenuMapping',
        component: UserMenuPrivilegeComponent,
      },
      {
        path     : 'role',
        component: ListOfRoleComponent,
      },
      {
        path     : 'AddRole',
        component: CreateRoleComponent,
      },
      {
        path     : 'area',
        component: ListAreaComponent,
      },
      {
        path     : 'AddArea',
        component: CreateAreaComponent,
      },
      {
        path     : 'AddState',
        component: CreateStateComponent,
      },
      {
        path     : 'state',
        component: ListStateComponent,
      },
      {
        path     : 'department',
        component: DepartmentListComponent,
      }, {
        path     : 'AddDepartment',
        component: AddDepartmentComponent,
      },
      {
        path     : 'employee',
        component: EmployeeListComponent,
      }, {
        path     : 'AddEmployee',
        component: AddEmployeeComponent,
      },
      {
        path     : 'organization',
        component: ListOfOrganizationLevelComponent,
      },
      {
        path     : 'AddOrganizationt',
        component: CreateOrganizationLevelComponent,
      },
      {
        path     : 'AddUserAccount',
        component: CreateUserAccountComponent,
      },
      {
        path     : 'createUser',
        component: ListOfUserAccountComponent,
      }, 
      {
        path     : 'UngridList',
        component: UngridListComponent,
      },   
         
      {
        path     : 'AddTable',
        component: TableAddComponent
      },
      {
        path     : 'EditTable',
        component: TableEditComponent
      },
      {
        path     : 'EditRow',
        component: TableRowEditComponent
      },
      {
        path     : 'product',
        component: ProductComponent
      },
      {
        path     : 'stockproduct',
        component: StockProductComponent
      },
      {
        path     : 'stockrawmaterial',
        component: StockRawmaterialComponent,
      },
      {
        path     : 'rawmaterial',
        component: RawMaterialComponent,
      },
      {
        path     : 'uom',
        component: UOMComponent,
      },
      {
        path     : 'stockproduct',
        component: StockProductComponent,
      },
      {
        path     : 'customerdetails',
        component: CustomerComponent,
      },
      // {
      //   path     : 'salesordermaster',
      //   component: SalesOrderMasterComponent,
      // },
      {
        path     : 'workordermaster',
        component: WorkOrderMasterComponent,
      },
      // {
      //   path     : 'salesorderdetails',
      //   component: SalesOrderDetailsComponent,
      // },
      {
        path     : 'subcontract',
        component: SubContractComponent,
      },
     
      {
        path     : 'subcontract',
        component: SubContractComponent,
      },
      {
        path     : 'qualitycontrol',
        component: QualitycontrolComponent,
      },
      {
        path     : 'qualityaudit',
        component: QualityAuditComponent,
      },
      {
        path     : 'bommaster',
        component: BOMMasterComponent,
      },
      {
        path     : 'bomdetails',
        component: BOMDetailsComponent,
      },
      {
        path:'purchasedetails',
        component:PurchaseOrdermainComponent
      },
      {
        path:'salesdetails',
        component:SalesOrdermainComponent
      },
      {
        path:'suppliermaster',
        component:SupplierComponent
      }
      


     

    ]
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }