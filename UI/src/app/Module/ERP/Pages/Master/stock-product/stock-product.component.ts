import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { StockProduct } from '../../../Models/Master/StockProduct/StockProduct';
import { HttpClient } from '@angular/common/http';
import { StockProductService } from '../../../Services/Master/stock-product.service';
import { ProductService } from '../../../Services/Master/product.service';
import { environment } from '../../../../../../environments/environment';
import { UOMMaster, ProductMaster } from '../../../Models/Master/Product/product';

@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html',
  styleUrls: ['./stock-product.component.css']
})
export class StockProductComponent implements OnInit {

  public show: boolean = false;
  isEditing: boolean;

  // listarea: any = [];
  // dataSource = new MatTableDataSource<Element>(this.listarea);
  selection = new SelectionModel<Element>(true, []);
  public ProductForm: FormGroup;
  API_URL: string;
  model:StockProduct = new StockProduct();
  product: StockProduct[] = [];
  UOMData: UOMMaster[] = [];
  productData: ProductMaster[] = [];
  

  constructor(public form: FormBuilder,public _dialog: MatDialog,private _http: HttpClient,private _stockProductService: StockProductService,private _ProductService: ProductService)
   {
    this.isEditing = false;
    this. API_URL =environment.apiUrl;
    }

  dataSource = new MatTableDataSource();
  displayedColumns = ['SNo','prdName', 'UOMID','stock','re_Orderlevel','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveProduct(){
    debugger;
    if (this.isEditing===false) {
      this._stockProductService.insertstockProduct(this.model).subscribe(response =>{
        if(response){
          alert("sucessfuly saved");
          this.ngOnInit();
          this.Cancel();
        }
      });
    }
    else {
      this._stockProductService.updatestockProduct(this.model).subscribe(response => {
        debugger;
        if (response) {
          alert("updated sucessfully");
          this.ngOnInit();
          this.Cancel();
        }
      })
    }
    this.getProduct()
  }

  updateProducts(element){
    this.isEditing = true;
    this.show=!this.show;
    this.model = element;
  }

  deleteProducts(element) {
    // const Id = new Product();
    // Id.prdID = element.Id;
    debugger;
    if (confirm("Are you sure?")) {
      this._stockProductService.deletestockProduct(element.StockID).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.ngOnInit();
        }
      });
    }

  }
  getProduct(){
    debugger
    this._stockProductService.getstockProduct().subscribe(response =>{
      debugger
      response['result'];
      if(response){
      this.product =response
     
      this.dataSource = new MatTableDataSource(this.product);
      console.log(this.dataSource);
}    })
  }



  ngOnInit() {
    this.getProduct();
    this.getUOMMaster();
    this.getProductMaster();
  }
  
  getUOMMaster(){
    debugger
    this._ProductService.getUOMMaster().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.UOMData = response;
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

  addArea()
  {
    this.isEditing = false;
    this.show = !this.show;
    this.model.prdID=0;
    this.model.UOMID=0;
    this.model.stock=0;
    this.model.re_Orderlevel=0;
  }
  Cancel(){
    this.show = !this.show;
    this.isEditing = false;
  }
  
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();         // Remove whitespace
    filterValue = filterValue.toLowerCase();  // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  handleClick(event) {
    event.stopPropagation();
  }

  public buildForm() {
    this.ProductForm = this.form.group({
      prdName: ['', [Validators.required]],
      UOMID: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      re_Orderlevel: ['', [Validators.required]],
     

});
console.log(this.ProductForm)
  }

}
