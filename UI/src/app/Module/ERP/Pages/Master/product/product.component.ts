import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product, UOMMaster } from '../../../Models/Master/Product/product';
import { environment } from '../../../../../../environments/environment';
import { ProductService } from '../../../Services/Master/product.service';
// import { ProductService } from '../../Services/Master/product.service';
// import { environment } from '../../../../../environments/environment';
// import { Product, UOMMaster} from '../../Models/Master/Product/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public show: boolean = false;
  isEditing: boolean = false;

  // listarea: any = [];
  // dataSource = new MatTableDataSource<Element>(this.listarea);
  selection = new SelectionModel<Element>(true, []);
  public ProductForm: FormGroup;
  API_URL: string;
  model: Product = new Product();
  product: Product[] = [];
  UOMData: UOMMaster[] = [];



  constructor(public form: FormBuilder, public _dialog: MatDialog, private _http: HttpClient, private _ProductService: ProductService) {
    this.API_URL = environment.apiUrl;
  }

  dataSource = new MatTableDataSource();
  displayedColumns = ['SNo', 'ProductCode', 'ProductName', 'UOM', 'Splitable', 'Stock', 'ReOrderlevel', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  saveProduct() {
    debugger;
    if (this.isEditing === false) {
      this._ProductService.insertProduct(this.model).subscribe(response => {
        if (response) {
          alert("sucessfuly saved");
          this.ngOnInit();
          this.Cancel();
        }
      });
    }
    else {
      this._ProductService.updateProduct(this.model).subscribe(response => {
        if (response) {
          alert("updated sucessfully");
          this.ngOnInit();
          this.Cancel();
        }
      })
    }
    this.getProduct()
  }

  updateProducts(element, isEditing) {
    this.isEditing = isEditing;
    this.show = !this.show;
    this.model = element;
  }

  deleteProducts(element) {

    debugger;
    if (confirm("Are you sure?")) {
      this._ProductService.deleteProduct(element.prdID).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.ngOnInit();
        }
      });
    }

  }

  getProduct() {
    debugger
    this._ProductService.getProduct().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.product = response;
        this.dataSource = new MatTableDataSource(this.product);
        console.log(this.dataSource);
      }
    });
  }

  ngOnInit() {
    // this.buildForm();
    this.getProduct();
    this.getUOMMaster();

  }

  getUOMMaster() {
    debugger
    this._ProductService.getUOMMaster().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.UOMData = response;
      }
    });
  }       

  addArea() {
    this.show = !this.show;
    this.model.prdCode = "";
    this.model.prdName = "";
    this.model.UOMID = 0;
    this.model.splitable = false;
    this.model.stock = 0;
    this.model.re_Orderlevel = 0;
    this.model.HSNCode = "";
    this.model.sell_price = 0;
    this.model.cost_price = 0;
  }

  Cancel() {
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
      ProductCode: ['', [Validators.required]],
      ProductName: ['', [Validators.required]],
      UOM: ['', [Validators.required]],
      Splitable: ['', [Validators.required]],
      Stock: ['', [Validators.required]],
      ReOrderlevel: ['', [Validators.required]],

    });
    console.log(this.ProductForm)
  }
}


