import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StockRawMaterial, rmName } from '../../../Models/Master/StockRawMaterial/stockrawmaterial';
import { UOMMaster } from '../../../Models/Master/Product/product';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { StockProductService } from '../../../Services/Master/stock-product.service';
import { ProductService } from '../../../Services/Master/product.service';
import { environment } from '../../../../../../environments/environment';
import { StockRawMaterialService } from '../../../Services/Master/stock-raw-material.service';

@Component({
  selector: 'app-stock-rawmaterial',
  templateUrl: './stock-rawmaterial.component.html',
  styleUrls: ['./stock-rawmaterial.component.css']
})
export class StockRawmaterialComponent implements OnInit {
  public show: boolean = false;
  isEditing: boolean = false;

  // listarea: any = [];
  // dataSource = new MatTableDataSource<Element>(this.listarea);
  selection = new SelectionModel<Element>(true, []);
  public ProductForm: FormGroup;
  API_URL: string;
  model: StockRawMaterial = new StockRawMaterial();
  product: StockRawMaterial[] = [];
  UOMData: UOMMaster[] = [];
Name:rmName[]=[];


  constructor(public form: FormBuilder, public _dialog: MatDialog, private _http: HttpClient, private _stockRawMaterialService: StockRawMaterialService, private _ProductService: ProductService) {
    this.API_URL = environment.apiUrl;
  }

  dataSource = new MatTableDataSource();
  displayedColumns = ['SNo', 'RMName', 'UOMID', 'stock', 're_Orderlevel', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveProduct() {
    debugger;
    if (this.isEditing === false) {
      this._stockRawMaterialService.insertstockRawMaterial(this.model).subscribe(response => {
        if (response) {
          alert("sucessfuly saved");
          this.ngOnInit();
          this.Cancel();
        }
      });
    }
    else {
      this._stockRawMaterialService.updatestockRawMaterial(this.model).subscribe(response => {
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
      this._stockRawMaterialService.deletestockRawMaterial(element.stkRMID).subscribe((response: any) => {
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
    this._stockRawMaterialService.getstockRawMaterial().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.product = response

        this.dataSource = new MatTableDataSource(this.product);
        console.log(this.dataSource);
      }
    });
  }



  ngOnInit() {
    this.getProduct();
    this.getUOMMaster();
    this.getRMName();

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
  getRMName() {
    debugger
    this._stockRawMaterialService.getrmName().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.Name = response;
      }
    });
  }

  addArea() {
    this.show = !this.show;
    this.model.RMName="";
    this.model.UOMID=0;
    this.model.stock=0;
    this.model.re_Orderlevel=0;
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
      RMName: ['', [Validators.required]],
      UOMID: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      re_Orderlevel: ['', [Validators.required]],


    });
    console.log(this.ProductForm)
  }

}
