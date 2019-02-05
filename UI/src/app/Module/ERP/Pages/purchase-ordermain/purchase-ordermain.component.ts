import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PurchaseOrder, getSupplierName } from '../../Models/Master/purchase-order/purchase-order';
import { PurchaseOrderService } from '../../Services/Master/purchase-order.service';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { UOMMaster } from '../../Models/Master/Product/product';
import { ProductService } from '../../Services/Master/product.service';
import { rmName } from '../../Models/Master/StockRawMaterial/stockrawmaterial';
import { StockRawMaterialService } from '../../Services/Master/stock-raw-material.service';

import { DatePipe } from '@angular/common';     
//import { RawMaterialPopUpComponent } from '../Master/Purchase-popup/raw-material-pop-up/raw-material-pop-up.component';

@Component({
  selector: 'app-purchase-ordermain',
  templateUrl: './purchase-ordermain.component.html',
  styleUrls: ['./purchase-ordermain.component.css'],
  providers: [DatePipe]
})
export class PurchaseOrdermainComponent implements OnInit {
  show = false;
  model: any = {};
  model1: any = {};
  displayedgridcolumnsgrid = ['SNo', 'Code', 'SName', 'PurchaseDate', 'ExpectDeliveryDate', 'RMName', 'Quantity', 'T_Amount', 'action']
  displayedColumns = ['SNo', 'RMID', 'quantity', 'UOM', 'GSTNO', 'Rate', 'Tax', 'Amount', 'TAmount', 'action'];
  OrderFormDetail: any = [];
  dataSource = new MatTableDataSource<Element>(this.OrderFormDetail);
  isEditing: boolean;
  index: any;
  editflag: boolean;
  UOMData: UOMMaster[] = [];
  Name: rmName[] = [];
  getpurchaseData: any = [];
  getpurchase = new MatTableDataSource<Element>(this.getpurchaseData);
  SupplierName: getSupplierName[] = [];
  value: any;


  constructor(private http: HttpClient,
    private _PurchaseOrderService: PurchaseOrderService,
    private _ProductService: ProductService,
    private _stockRawMaterialService: StockRawMaterialService,
    private _datePipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getUOMMaster();
    this.getRMName();
    this.getPurchaseOrderDetails();
    this.getSupplierName();
  }

  getUOMMaster() {

    this._ProductService.getUOMMaster().subscribe(response => {
      response['result'];
      if (response) {
        debugger;
        this.UOMData = response;
        console.log(this.UOMData);
      }
    });
  }

  getRMName() {

    this._stockRawMaterialService.getrmName().subscribe(response => {
      response['result'];
      if (response) {
        this.Name = response;
        console.log(this.Name);
      }
    });
  }

  getSupplierName() {
debugger
// var x=10;
    this._PurchaseOrderService.getSupplierName().subscribe(response => {
      response['result'];
      if (response) {
        debugger;
        this.SupplierName = response;
        console.log(this.SupplierName);
      }
    });
  }

  // deletePurchaseOrder(data) {
  //   // const Id = new Product();
  //   // Id.prdID = element.Id;
  //   
  //   if (confirm("Are you sure?")) {
  //     this._PurchaseOrderService.deletePurchaseMaster(data.PurchaseID,data.ID).subscribe((response: any) => {
  //     //  this._PurchaseOrderService.deletePurchaseMaster(data.ID).subscribe((response: any) => {
  //       
  //       if (response) {
  //         alert("successfully deleted");
  //         this.ngOnInit();
  //       }
  //     });
  //   }
  //   // if (confirm("Are you sure?")) {
  //   //   this._PurchaseOrderService.deletePurchaseDetails(data.PurchaseID).subscribe((response: any) => {
  //   //     
  //   //     if (response) {
  //   //       alert("successfully deleted");
  //   //       this.ngOnInit();
  //   //     }de
  //   //   });
  //   // }


  // }


  addFieldValue(model1) {

    // model1.ProductName = model1.ProductNameId.ProductName;
    // model1.ProductNameId = model1.ProductNameId.ProductNameId;
    //model1.UOMID = model1.ProductSizeId.UOMID;
    model1.GSTNo = parseInt(model1.GSTNo);
    model1.Quantity = parseInt(model1.Quantity);
    model1.Rate = parseFloat(model1.Rate);
    model1.Tax = parseFloat(model1.Tax);
    model1.Amount = (parseInt(model1.Quantity) * parseFloat(model1.Rate));
    model1.Amount = parseFloat(model1.Amount);
    model1.TotalAmount = (parseFloat(model1.Amount) * (parseFloat(model1.Tax) / 100)) + parseFloat(model1.Amount)
    model1.T_Amount = parseFloat(model1.TotalAmount);
    this.setProductAndUOMName(model1);
  }

  setProductAndUOMName(model1) {
    debugger;
    if (this.isEditing == true) {
      for (var i in this.UOMData) {
        if (this.UOMData[i].UOMID == model1.UOMID) {
          model1.UOMName = this.UOMData[i].UOMName;
        }
      } for (var x in this.Name) {
        if (this.Name[x].RMID == model1.RMID) {
          model1.RMName = this.Name[x].RMName;
        }
      }
      if (this.index != undefined) {
        this.OrderFormDetail[this.index] = model1;
      } else {
        this.OrderFormDetail.push(model1);
      }
    } else {
      // this.OrderFormDetail.push(model1);
      for (var i in this.UOMData) {
        if (this.UOMData[i].UOMID == model1.UOMID) {
          model1.UOMName = (this.UOMData[i].UOMName);
        }
      } for (var x in this.Name) {
        if (this.Name[x].RMID == model1.RMID) {
          model1.RMName = (this.Name[x].RMName);
        }
      }
      this.OrderFormDetail.push(model1);
    }
    this.model1 = {};
    this.dataSource = new MatTableDataSource(this.OrderFormDetail);
    console.log(this.dataSource)
    // this.isEditing = false;
    // this.editflag = false;
  }


  saveOrderForm() {

    const orderForm = new PurchaseOrder();
    const arrOrderFormDetail = [];
    for (var start in this.OrderFormDetail) {
      if (this.OrderFormDetail[start].Quantity != undefined) {
        arrOrderFormDetail.push(this.OrderFormDetail[start]);
      }
    }
    orderForm.PurchaseID = this.model.PurchaseID;
    orderForm.Code = this.model.Code;
    orderForm.SupplierID = this.model.SID;
    orderForm.PurchaseDate = new Date(this._datePipe.transform(this.model.PurchaseDate, 'yyyy-MM-dd'));
    orderForm.ExpectDeliveryDate = new Date(this._datePipe.transform(this.model.ExpectDeliveryDate, 'yyyy-MM-dd'));


    if (this.value && this.isEditing == true) {
      orderForm.ID = this.value.ID;
      orderForm.OrderDetails = JSON.stringify(this.OrderFormDetail);
      this._PurchaseOrderService.updatePurchaseOrder(orderForm).subscribe(response => {
        if (response) {
          this.model = {};
          this.model1 = {};
          this.OrderFormDetail = [];
          this.dataSource = new MatTableDataSource(this.OrderFormDetail);
          this.getPurchaseOrderDetails();
          this.show = !this.show;
        } else {
          alert("not saved please try to refresh and add again")
        }
      });
    } else {
      orderForm.OrderDetails = JSON.stringify(arrOrderFormDetail);
      this._PurchaseOrderService.insertPurchaseOrder(orderForm).subscribe(response => {
        if (response) {
          this.model = {};
          this.model1 = {};
          this.OrderFormDetail = [];
          this.dataSource = new MatTableDataSource(this.OrderFormDetail);
          this.getPurchaseOrderDetails();
          this.show = !this.show;
        } else {
          alert("not saved please try to refresh and add again")
        }
      });
    }
  }

  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  userCompanyId: number;


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
  }

  handleClick(event) {
    event.stopPropagation();
  }

  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }

  AddproductCategorydetails() {
    //this.categoryModel = {};
    this.show = true;
    this.isEditing = false
  }
  backproductCategoryListForm() {
    this.show = false;
  }

  updatePurchaseDetails(element, isEditing, index) {
    debugger;
    this.isEditing = isEditing;
    this.model1 = element;
    this.index = index;
    // this.editflag = true;
    console.log(element, this.model);
  }

  updatePurchaseDetailsgrid(value) {
    debugger
    this.getSupplierName();
    this.show = true;
    this.value = value;
    this.isEditing = true;
    this.getPODetails(value.PurchaseID);
  }

  getPODetails(POId) {
    this._PurchaseOrderService.getPODetails(POId).subscribe(response => {
      response['result'];
      debugger;
      if (response) {
        const data = response;
        this.model = data.PurchaseOrder;
        this.dataSource = data.PurchaseOrderDetails;
        this.OrderFormDetail = this.dataSource;
      }
    });
  }


  deletePurchaseDetails(index) {

    this.OrderFormDetail.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.OrderFormDetail);
  }

  getPurchaseOrderDetails() {

    this._PurchaseOrderService.getPurchaseOrder().subscribe(response => {
      response['result'];

      if (response) {
        this.getpurchaseData = response;
        this.getpurchase  = new MatTableDataSource(this.getpurchaseData);
        console.log("prdMaster", this.getpurchase)
      }
    });
  }

  convertToInt(val) {
    if (!isNaN(val) && (val != undefined) && (val != ''))
      return parseInt(val);
    else { return 0 }
  }
  //convert to float
  convertToFloat(val) {
    if (!isNaN(val) && (val != undefined) && (val != ''))
      return parseFloat(val);
    else { return 0 }
  }

  getTotal = function () {
    var total = 0;
    for (var i in this.OrderFormDetail) {
      if (this.OrderFormDetail[i].Quantity) {
        total += (this.OrderFormDetail[i].Quantity * 1);
      }
    }
    if (!isNaN(total) && (total != undefined))
      return total;
    else { return 0 }
  }
  eventkeypress() {
    this.keyPressQty(event);
  }

  keyPressQty(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  getAmount = function () {
    var total = 0;
    for (var i in this.OrderFormDetail) {
      if (this.OrderFormDetail[i].Quantity && this.OrderFormDetail[i].Rate) {
        total += (this.OrderFormDetail[i].Quantity * this.OrderFormDetail[i].Rate);
      }
    }
    if (!isNaN(total) && (total != undefined))
      return total;
    else { return 0 }
  }

  getTotalAmount = function () {
    var total = 0;
    for (var i in this.OrderFormDetail) {
      if (this.OrderFormDetail[i].Quantity && this.OrderFormDetail[i].Rate) {
        total += (((this.OrderFormDetail[i].Quantity * this.OrderFormDetail[i].Rate)) * 1) +
          ((this.OrderFormDetail[i].Quantity * this.OrderFormDetail[i].Rate) * (this.OrderFormDetail[i].Tax / 100 * 1));
      }
    }
    if (!isNaN(total) && (total != undefined))
      return total;
    else { return 0 }
  }
  getGrandtotal() {
    return this.OrderFormDetail.map(t => t.TotalAmount).reduce((acc, value) => acc + value, 0);
  }


  private newAttribute: any = {};

  onlyNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onlyCharacter(event: any) {
    const pattern = /[a-zA-Z\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}


