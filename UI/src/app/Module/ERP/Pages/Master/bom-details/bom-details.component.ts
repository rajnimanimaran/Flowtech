import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BOM_Details } from '../../../Models/Master/BOM_Details/BOM_Details';
import { UOMMaster } from '../../../Models/Master/Product/product';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { BOMDetailsService } from '../../../Services/Master/bom-details.service';
import { rmName } from '../../../Models/Master/StockRawMaterial/stockrawmaterial';
import { StockRawMaterialService } from '../../../Services/Master/stock-raw-material.service';

@Component({
  selector: 'app-bom-details',
  templateUrl: './bom-details.component.html',
  styleUrls: ['./bom-details.component.css']
})
export class BOMDetailsComponent implements OnInit {
  public show: boolean = false;
  isEditing: boolean=false;

  // listarea: any = [];
  // dataSource = new MatTableDataSource<Element>(this.listarea);
  selection = new SelectionModel<Element>(true, []);
  public BOM_DetailsForm: FormGroup;
  API_URL: string;
  model:BOM_Details = new BOM_Details();
  bom_details: BOM_Details[] = [];
  UOMData: UOMMaster[] = [];
  Name:rmName[]=[];
  

  constructor(public form: FormBuilder,public _dialog: MatDialog,private _http: HttpClient,private _BOMDetailsService: BOMDetailsService,private _stockRawMaterialService: StockRawMaterialService)
   { 
    this. API_URL =environment.apiUrl;
   }

   dataSource = new MatTableDataSource();
  displayedColumns = ['SNo','BOMName', 'RawMaterialName', 'UOM', 'Quantity' , 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  saveBOM_Details(){
    debugger;
    if (this.isEditing===false) {
      this._BOMDetailsService.insertBOM_Details(this.model).subscribe(response =>{
        if(response){
          alert("sucessfuly saved");
          this.ngOnInit();
          this.Cancel();
        }
      });
    }
    else{
      this._BOMDetailsService.updateBOM_Details(this.model).subscribe(response =>{
        if(response){
          alert("updated sucessfully");
          this.ngOnInit();
          this.Cancel();
        }
      })
    }
    this.getBOM_Details()
  }

  updateBOM_Details(element,isEditing){
    this.isEditing = isEditing;
    this.show=!this.show;
    this.model = element;
  }

  deleteBOM_Details(element) {
    // const Id = new Product();
    // Id.prdID = element.Id;
    debugger;
    if (confirm("Are you sure?")) {
      this._BOMDetailsService.deleteBOM_Details(element.BOMID).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.ngOnInit();
        }
      });
    }

  }

  getBOM_Details() {
    debugger
    this._BOMDetailsService.getBOM_Details().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.bom_details = response;
        this.dataSource = new MatTableDataSource(this.bom_details);
        console.log(this.dataSource);
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






  ngOnInit() {
    // this.buildForm();
    this.getBOM_Details();
    this.getRMName();
    // this.getUOMMaster();
  }

  // getUOMMaster(){
  //   debugger
  //   this._BOMDetailsService.getUOMMaster().subscribe(response => {
  //     debugger
  //     response['result'];
  //     if (response) {
  //       this.UOMData = response;
  //     }
  //   });
  // }

  addArea()
  {
    this.show = !this.show;
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
    this.BOM_DetailsForm = this.form.group({
      BOMName: ['', [Validators.required]],
      RawMaterialName: ['', [Validators.required]],
      UOM: ['', [Validators.required]],
      // Splitable: ['', [Validators.required]],
      Quantity: ['', [Validators.required]],
      // ReOrderlevel: ['', [Validators.required]],

});
console.log(this.BOM_DetailsForm)

 
  }

}
