import { Component, OnInit, ViewChild } from '@angular/core';
import { BOM_master } from '../../../Models/Master/BOm_master/Bom_master';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BOMMasterService } from '../../../Services/Master/bom-master.service';

import { ProductMaster, UOMMaster } from '../../../Models/Master/Product/product';
import { ProductService } from '../../../Services/Master/product.service';
import { StockRawMaterialService } from '../../../Services/Master/stock-raw-material.service';
import { rmName } from '../../../Models/Master/StockRawMaterial/stockrawmaterial';

@Component({
  selector: 'app-bom-master',
  templateUrl: './bom-master.component.html',
  styleUrls: ['./bom-master.component.css']
})
export class BOMMasterComponent implements OnInit {
  model: BOM_master = new BOM_master();
  public show: boolean = false;
  isEditing: boolean;
  listarea: any = [];
  API_URL: string;
  bommaster: BOM_master[] = [];
  selection = new SelectionModel<Element>(true, []);
  public AreaForm: FormGroup;
  productData: ProductMaster[] = [];
  Name:rmName[]=[];
  UOMData: UOMMaster[] = [];
 
  constructor(public form: FormBuilder, private _http: HttpClient, private _BOMMasterService: BOMMasterService,private _ProductService: ProductService,private _stockRawMaterialService: StockRawMaterialService) {
    this.isEditing = false;
    this.API_URL = environment.apiUrl;
  }

  dataSource = new MatTableDataSource();
  displayedColumns = ['SNo', 'BOMCode', 'BOMName', 'Product','RawMaterialName','UOM','Quantity', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveBOMMaster() {
    debugger;
    if (this.isEditing === false) {
      debugger;
      this._BOMMasterService.insertBOMMaster(this.model).subscribe(response => {
        if (response) {
          alert("sucessfuly saved");
          this.ngOnInit();
          this.Cancel();
        }
      });
    }
    else {
      this._BOMMasterService.updateBOMMaster(this.model).subscribe(response => {
        if (response) {
          alert("updated sucessfully");
          this.ngOnInit();
          this.Cancel();
        }
      })
    }
    this.getBOMMaster()
  }

  updateBOMMaster(element) {
    debugger;
    this.isEditing = true;
    this.show = !this.show;
    this.model = element;
  }

  deleteBOMMAster(element) {
    // const Id = new Product();
    // Id.prdID = element.Id;
    debugger;
    if (confirm("Are you sure?")) {
      this._BOMMasterService.deleteBOMMaster(element.BOMID).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.ngOnInit();
        }
      });
    }

  }
  getBOMMaster() {
    debugger
    this._BOMMasterService.getBOMMaster().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.bommaster = response

        this.dataSource = new MatTableDataSource(this.bommaster);
        console.log(this.dataSource);
      }
    })
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
 


  ngOnInit() {
    this.getBOMMaster();
    this.getProductMaster();
    this. getRMName();
     this.getUOMMaster();
  }

  
  addBOMMaster() {
    this.isEditing = false;
    this.show = !this.show;
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
    this.AreaForm = this.form.group({
      BOMCode: ['', [Validators.required]],
      BOMName: ['', [Validators.required]],
      // UOM: ['', [Validators.required]],
      prdID: ['', [Validators.required]],
      // ReOrderlevel: ['', [Validators.required]],


    });
    
  }

}
