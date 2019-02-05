import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { environment } from '../../../../../../environments/environment';
import { UOMService } from '../../../Services/Master/uom.service';
import { HttpClient } from '@angular/common/http';
import { UOM } from '../../../Models/Master/UOM/UOM';


@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.css']
})
export class UOMComponent implements OnInit {
  
  public show: boolean = false;
  isEditing: boolean=false;
  selection = new SelectionModel<Element>(true, []);
  public ProductForm: FormGroup;
  API_URL: string;
  model:UOM = new UOM();
  uom: UOM[] = [];
  

  constructor(public form: FormBuilder,public _dialog: MatDialog,private _http: HttpClient,private _uomService: UOMService) {
    this. API_URL =environment.apiUrl;
   }

  dataSource = new MatTableDataSource();
  displayedColumns = ['SNo','UOMCode', 'UOMName', 'Multifier','BaseUnit','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveUOM(){
    debugger;
    if (this.isEditing===false) {
      this._uomService.insert(this.model).subscribe(response =>{
        if(response){
          alert("sucessfuly saved");
          this.ngOnInit();
          this.Cancel();
        }
      });
    }
    else{
      this._uomService.update(this.model).subscribe(response =>{
        if(response){
          alert("updated sucessfully");
          this.ngOnInit();
          this.Cancel();
        }
      })
    }
  this.getUOM();
  }

  updateUOM(element,isEditing){
    this.isEditing = isEditing;
    this.show=!this.show;
    this.model = element;
  }

  deleteUOM(element) {
    // const Id = new Product();
    // Id.prdID = element.Id;
    debugger;
    if (confirm("Are you sure?")) {
      this._uomService.delete(element.UOMID).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.ngOnInit();
        }
      });
    }

  }
  getUOM(){
    debugger
    this._uomService.get().subscribe(response =>{
      debugger
      response['result'];
      if(response){
      this.uom =response
     
      this.dataSource = new MatTableDataSource(this.uom);
      console.log(this.dataSource);
}    })
  }
  ngOnInit() {
 this.getUOM();
  }
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
    this.ProductForm = this.form.group({
      UOMCode: ['', [Validators.required]],
      UOMName: ['', [Validators.required]],
      Multifier: ['', [Validators.required]],
      BaseUnit: ['', [Validators.required]],
});
console.log(this.ProductForm)
  }
}
