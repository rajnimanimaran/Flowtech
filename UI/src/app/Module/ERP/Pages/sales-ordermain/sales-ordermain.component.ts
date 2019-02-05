import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormBuilder } from '@angular/forms';

import { environment } from '../../../../../environments/environment';

import { ProductService } from '../../Services/Master/product.service';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { UOMMaster, ProductMaster } from '../../Models/Master/Product/product';
import { SalesOrderMasterService } from '../../Services/Master/sales-order-master.service';
import { PurchaseOrderService } from '../../Services/Master/purchase-order.service';
import { SalesOrderMaster } from '../../Models/Master/SalesOrderMaster/SalesOrderMaster';
import { DatePipe } from '@angular/common';
//import { SALESFORM } from '../../Models/Master/SalesOrderMaster/SalesOrderMaster';

@Component({
  selector: 'app-sales-ordermain',
  templateUrl: './sales-ordermain.component.html',
  styleUrls: ['./sales-ordermain.component.css'],
  providers: [DatePipe]
})
export class SalesOrdermainComponent implements OnInit {

  categoryModel: any = [];
  show= false;
  model: any = {}
  field: any = [];
  isEditing: boolean;
  filePath: any;
  OrderFormDetail: any = []
  model1: any = {};
  vendornameview: any
  vendordetaildisplay: any[]
  Productnameview: any = []
  HSN_CodeDisplay: any = []
  ProductHSN_Codeview: any;
  Productsizeview: any = []
  API_URL: string;
  public edit: any;
  public ShowEditRow: boolean = false;
  public buttonName: any = 'edit';
  arrayInventry: any = [];
  AlltotalAmount: any;
  count: number;
  UOMData: UOMMaster[] = [];
  productData: ProductMaster[] = [];
  
  getSalesData: any =[];
  getsales = new MatTableDataSource<Element>(this.getSalesData);
  dataSource = new MatTableDataSource<Element>(this.OrderFormDetail);
  displayedgridcolumns=['SNo','OrderNumber','SupplierName','OrderDate','ACKDate','prdName','Quantity','T_Amount','action']
  displayedColumns = ['SNo', 'ProductName', 'quantity', 'UOM', 'GSTNO', 'Rate', 'Tax', 'Amount', 'TAmount', 'action'];
  index: any;
  editflag: boolean;
  SupplierName: any;
  value: boolean;
 
  constructor(private _http: HttpClient,
    private _ProductService: ProductService, 
     private _PurchaseOrderService: PurchaseOrderService,
     private _salesorderservice: SalesOrderMasterService,
     private _datePipe: DatePipe,
     ) { }

     ngOnInit() {
      this.getProductMaster();
      this.getUOMMaster();
      this.getSalesOrderDetails();
      
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

    getSupplierName() {
      debugger
          this._PurchaseOrderService.getSupplierName().subscribe(response => {
            response['result'];
            if (response) {
              debugger;
              this.SupplierName = response;
              console.log(this.SupplierName);
            }
          });
        }
  getProductMaster(){
          debugger;
          this._ProductService.getproductMaster().subscribe(response => {
            debugger
            response['result'];
            if (response) {
              this.productData = response;
              console.log("prdMaster",this.productData)
            }
          });
        }
    
        
        addFieldValue(model1) {
debugger;
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
            }for (var x in this.productData) {
                   if (this.productData[x].prdID == model1.prdID) {
                     model1.prdName = this.productData[x].prdName;
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
            } for (var x in this.productData) {
                  if (this.productData[x].prdID == model1.prdID) {
                    model1.prdName = this.productData[x].prdName;
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
          debugger;

          const orderForm = new SalesOrderMaster();
          const arrOrderFormDetail = [];
          for (var start in this.OrderFormDetail) {
            if (this.OrderFormDetail[start].Quantity != undefined) {
              arrOrderFormDetail.push(this.OrderFormDetail[start]);
            }
          }
          orderForm.OrderID = this.model.OrderID;
          orderForm.OrderNumber = this.model.OrderNumber;
          orderForm.CODE = this.model.CODE;
          orderForm.SupplierID = this.model.SID;
          orderForm.OrderDate = new Date(this._datePipe.transform(this.model.OrderDate, 'yyyy-MM-dd'));
          orderForm.ACKDate = new Date(this._datePipe.transform(this.model.ACKDate, 'yyyy-MM-dd'));
          orderForm.AssignedTo = this.model.AssignedTo;
      
          if (this.value && this.isEditing == true) {
           // orderForm.ID = this.value.ID;
            orderForm.OrderDetails = JSON.stringify(this.OrderFormDetail);
            this._salesorderservice.updateSalesOrder(orderForm).subscribe(response => {
              if (response) {
                this.model = {};
                this.model1 = {};
                this.OrderFormDetail = [];
                this.dataSource = new MatTableDataSource(this.OrderFormDetail);
                this.getSalesOrderDetails();
                this.show = !this.show;
              } else {
                alert("not saved please try to refresh and add again")
              }
            });
          } else {
            orderForm.OrderDetails = JSON.stringify(arrOrderFormDetail);
            this._salesorderservice.insertSalesOrder(orderForm).subscribe(response => {
              if (response) {
                this.model = {};
                this.model1 = {};
                this.OrderFormDetail = [];
                this.dataSource = new MatTableDataSource(this.OrderFormDetail);
                this.getSalesOrderDetails();
                this.show = !this.show;
              } else {
                alert("not saved please try to refresh and add again")
              }
            });
          }
        }
         


        getSalesOrderDetails(){
          debugger;
          this._salesorderservice.getSalesOrder().subscribe(response => {
            debugger
            response['result'];
            if (response) {
              debugger;
              this.getSalesData = response;
              this.getsales  = new MatTableDataSource(this.getSalesData);
              console.log("prdMaster",this.getsales)
            }
          });
        }

        getPODetails(SOId) {
          this._salesorderservice.getSalesDetails(SOId).subscribe(response => {
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
      
         
          
          
  

  // addFieldValue(model1) {
  //   debugger;
    // model1.ProductName = model1.ProductNameId.ProductName;
    // model1.ProductNameId = model1.ProductNameId.ProductNameId;
    //model1.UOMID = model1.ProductSizeId.UOMID;
    // model1.GSTNo = parseInt(model1.GSTNo);
    // model1.Quantity = parseInt(model1.Quantity);
    // model1.Rate = parseFloat(model1.Rate);
    // model1.Tax = parseFloat(model1.Tax)
    // model1.Amount = (parseInt(model1.Quantity) * parseFloat(model1.Rate));
    // model1.Amount = parseFloat(model1.Amount);
    // model1.TotalAmount = (parseFloat(model1.Amount) * (parseFloat(model1.Tax) / 100)) + parseFloat(model1.Amount)
    // model1.T_Amount = parseFloat(model1.TotalAmount);
    // this.setProductAndUOMName(model1);
    // if (this.isEditing == true) {
    //   for (var i in this.UOMData) {
    //     if (this.UOMData[i].UOMID == model1.UOMID) {
    //       model1.UOMName = this.UOMData[i].UOMName;
    //     }
    //   } for (var x in this.productData) {
    //     if (this.productData[x].prdID == model1.prdID) {
    //       model1.prdName = this.productData[x].prdName;
    //     }
    //   }
    //   this.OrderFormDetail[this.index] = model1;
    // } else {
    //   // this.OrderFormDetail.push(model1);
    //   for (var i in this.UOMData) {
    //     if (this.UOMData[i].UOMID == model1.UOMID) {
    //       model1.UOMName = (this.UOMData[i].UOMName);
    //     }
    //   } for (var x in this.productData) {
    //     if (this.productData[x].prdID == model1.prdID) {
    //       model1.prdName = (this.productData[x].prdName);
    //     }
    //   }
    //   this.OrderFormDetail.push(model1);
    // }
 // }

  // setProductAndUOMName(model1){
  //   if (this.isEditing == true) {
  //     for (var i in this.UOMData) {
  //       if (this.UOMData[i].UOMID == model1.UOMID) {
  //         model1.UOMName = this.UOMData[i].UOMName;
  //       }
  //     } for (var x in this.productData) {
  //       if (this.productData[x].prdID == model1.prdID) {
  //         model1.prdName = this.productData[x].prdName;
  //       }
  //     }
  //     this.OrderFormDetail[this.index] = model1;
  //   } else {
      // this.OrderFormDetail.push(model1);
  //     for (var i in this.UOMData) {
  //       if (this.UOMData[i].UOMID == model1.UOMID) {
  //         model1.UOMName = (this.UOMData[i].UOMName);
  //       }
  //     } for (var x in this.productData) {
  //       if (this.productData[x].prdID == model1.prdID) {
  //         model1.prdName = (this.productData[x].prdName);
  //       }
  //     }
  //     this.OrderFormDetail.push(model1);
  //   }
  //   this.model1 = {};
  //   this.dataSource = new MatTableDataSource(this.OrderFormDetail);
  //   console.log(this.dataSource)
  //   this.isEditing = false;
  //   this.editflag = false;
  // }

  // ListCategory = [];
  // isEditing: boolean = false;
  // purchaseMasterArray: any = []
  // purchaseReturnArray: any = [];
  // purRET: any = [];
  // getSales: any []=[];

  // supplierdisplay: any = []

  // suppliernameDisplay() {
  //   debugger;
  //   this.http.get(environment.apiUrl + "Supplier/AllSuppliers")
  //     .subscribe((data) => {
  //       debugger;
  //       if (data) {
  //         this.supplierdisplay = data;
  //         console.log("supplierdisplay", this.supplierdisplay)
  //       }
  //     });
  // }


 
  // saveOrderForm() {
  //   debugger
  //   this.count = 0;
  //   const arrOrderFormDetail = [];
  //   for (var start in this.OrderFormDetail) {
  //     if (this.OrderFormDetail[start].Quantity != undefined) {
  //       arrOrderFormDetail.push(this.OrderFormDetail[start]);
  //     }
  //   }
  //   const orderForm = new SALESFORM();
  //   orderForm.OrderNumber = this.model.OrderNumber;
  //   orderForm.CODE = this.model.CODE;
  //   orderForm.CustomerID = this.model.CustomerID;
  //   orderForm.OrderDate = this.model.OrderDate;
  //   orderForm.ACKDate = this.model.ACKDate;
  //   orderForm.AssignedTo = this.model.AssignedTo;
  //   orderForm.OrderTakenBy = '1001';
  //   orderForm.OrderDetails = JSON.stringify(arrOrderFormDetail)
  //   this.salesorderservice.insertSalesOrder(orderForm).subscribe(response => {
  //     if (response) {
  //       this.model = {};
  //       this.model1 = {};
  //       this.OrderFormDetail = [];
  //       this.dataSource = new MatTableDataSource(this.OrderFormDetail);
  //       this.vendordetaildisplay = [];
  //     } else {
  //       alert("not saved please try to refresh and add again")
  //     }
  //   });
  // }

  // updateSalesDetails(element, isEditing, index) {
  //   debugger;
  //   this.isEditing = isEditing;
  //   this.model1 = element;
  //   this.index = index;
  //   this.editflag = true;
  // }
  // updateSalesDetailsgrid(element)
  // {
  //   this.isEditing = true;
  //   this.model.OrderNumber = element.OrderNumber;
  //   this.model.CODE = element.CODE;
  //   this.model.CustomerID = Number(element.SID);
  //   this.model.OrderDate = element.OrderDate;
  //   this.model.ACKDate = element.ACKDate;
  //   this.model.AssignedTo = element.AssignedTo;
  //   this.model1.prdID = Number(element.prdID);
  //   this.model1.Quantity = element.Quantity;
  //   this.model1.UOMID = Number(element.UOMID);
  //   this.model1.GSTNO = element.GSTNO;
  //   this.model1.Rate = element.Rate;
  //   this.model1.Tax = element.Tax;
  //   this.model1.Amount = element.Amount;
  //   this.show =!this.show ;
  // }

  deleteSalesDetails(index){
    this.OrderFormDetail.splice(index,1);
    this.dataSource = new MatTableDataSource(this.OrderFormDetail);
  }

  // getUOMMaster(){
  //   debugger
  //   this._ProductService.getUOMMaster().subscribe(response => {
  //     debugger
  //     response['result'];
  //     if (response) {
  //       this.UOMData = response;
  //     }
  //   });
  // }
  // getProductMaster(){
  //   debugger;
  //   this._ProductService.getproductMaster().subscribe(response => {
  //     debugger
  //     response['result'];
  //     if (response) {
  //       this.productData = response;
  //       console.log("prdMaster",this.productData)
  //     }
  //   });
  // }

  // getSalesUpdate(){
  //   debugger;
  //   this.salesorderservice.getSalesUpdateGrid().subscribe(response => {
  //     debugger
  //     response['result'];
  //     if (response) {
  //       this.productData = response;
  //       console.log("prdMaster",this.productData)
  //     }
  //   });
  // }

  // getSalesOrderDetails(){
  //   debugger;
  //   this._salesorderservice.getSalesOrder().subscribe(response => {
  //     debugger
  //     response['result'];
  //     if (response) {
  //       this.getSales = response;
  //       console.log("prdMaster",this.getSales)
  //     }
  //   });
  // }



 
  // dataSource1 = new MatTableDataSource<Element>(this.OrderFormDetail);
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


  // assignBillValue() {
  //   debugger;
  //   for (var i in this.purchaseMasterArray) {
  //     if (this.model.BillNo == this.purchaseMasterArray[i].BillNo) {
  //       alert("BillNo already exists...Try to give different BillNo")
  //     }
  //   }
  // }

  initialising() {
    this.OrderFormDetail = [{ isAdd: true, isDelete: false }];
    for (var i in this.OrderFormDetail) {
      this.OrderFormDetail[i].BillNo = this.model.BillNo
    }
  }

  assignTableBillno() {

    for (var i in this.OrderFormDetail) {
      this.OrderFormDetail[i].BillNo = this.model.BillNo;
    }
  }

  // ProductNamedisplay() {
  //   this.product.getProduct().subscribe(
  //     (data) => {
  //       if (data) {                                          
  //         this.Productnameview = data;
  //       }
  //     })
  // }


  cancel() {
    this.model = {};
    this.model1 = {};
    this.OrderFormDetail = [];
    // this.dataSource1 = new MatTableDataSource(this.OrderFormDetail);
    this.vendordetaildisplay = [];
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



  editCategory(element, value) {
    //this.isEditing = element
    this.show = element;
    this.categoryModel = value;
  }
  AddproductCategorydetails() {
    this.categoryModel = {};
    this.show = true;
    //this.isEditing = false
  }
  backproductCategoryListForm() {
    this.show = false;
  }

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
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(SalesSupplierPopupComponent, {
  //     width: '250px',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
    
  //   });
  // }


}



