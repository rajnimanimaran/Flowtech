import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RawMaterialService } from '../../../Services/Master/raw-material.service';
import { HttpClient } from '@angular/common/http';
import { RawMaterial } from '../../../Models/Master/RawMaterial/RawMaterial';
import { environment } from '../../../../../../environments/environment';
import { ProductService } from '../../../Services/Master/product.service';
import { UOMMaster } from '../../../Models/Master/Product/product';


@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {
  model: RawMaterial = new RawMaterial();
  public show: boolean = false;
  isEditing: boolean;
  listarea: any = [];
  API_URL: string;
  rawmaterial: RawMaterial[] = [];
  selection = new SelectionModel<Element>(true, []);
  public AreaForm: FormGroup;
  UOMData: UOMMaster[] = [];
  constructor(public form: FormBuilder, private _http: HttpClient, private _RawmaterialService: RawMaterialService, private _ProductService: ProductService) {
    this.isEditing = false;
    this.API_URL = environment.apiUrl;
  }

  dataSource = new MatTableDataSource();
  displayedColumns = ['SNo', 'RawMaterialCode', 'RawMaterialName', 'UOM', 'Stock', 'ReOrderlevel', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveRawMaterial() {
    debugger;
    if (this.isEditing === false) {
      debugger;
      this._RawmaterialService.insertRawmaterial(this.model).subscribe(response => {
        if (response) {
          alert("sucessfuly saved");
          this.ngOnInit();
          this.Cancel();
        }
      });
    }
    else {
      this._RawmaterialService.updateRawmaterial(this.model).subscribe(response => {
        if (response) {
          alert("updated sucessfully");
          this.ngOnInit();
          this.Cancel();
        }
      })
    }
    this.getRawmaterial()
  }

  updateRawmaterial(element) {
    debugger;
    this.isEditing = true;
    this.show = !this.show;
    this.model = element;
  }

  deleteRawmaterial(element) {
    // const Id = new Product();
    // Id.prdID = element.Id;
    debugger;
    if (confirm("Are you sure?")) {
      this._RawmaterialService.deleteRawmaterial(element.RMID).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.ngOnInit();
        }
      });
    }

  }
  getRawmaterial() {
    debugger
    this._RawmaterialService.getRawmaterial().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.rawmaterial = response

        this.dataSource = new MatTableDataSource(this.rawmaterial);
        console.log(this.dataSource);
      }
    })
  }


  ngOnInit() {
    this.getRawmaterial();
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
  addRawMaterial() {
    this.isEditing = false;
    this.show = !this.show;
    this.model.RMCode="";
    this.model.RMName="";
    this.model.UOMID=0;
    this.model.splitable=false;
    this.model.stock=0;
    this.model.re_Orderlevel=0;
    this.model.sell_price=0;
    this.model.cost_price=0;
    
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
      RawMaterialCode: ['', [Validators.required]],
      RawMaterialName: ['', [Validators.required]],
      UOM: ['', [Validators.required]],
      Stock: ['', [Validators.required]],
      ReOrderlevel: ['', [Validators.required]],


    });
    console.log(this.AreaForm)
  }

}
