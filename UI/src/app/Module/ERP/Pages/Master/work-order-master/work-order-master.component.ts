import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { WorkOrderMasterService } from '../../../Services/Master/work-order-master.service';
import { WorkOrderMaster, SubContract } from '../../../Models/Master/WorkOrderMaster/WorkOrderMaster';

@Component({
  selector: 'app-work-order-master',
  templateUrl: './work-order-master.component.html',
  styleUrls: ['./work-order-master.component.css']
})
export class WorkOrderMasterComponent implements OnInit {

  
  workorder: WorkOrderMaster[] = [];
  public show: boolean = false;
  isEditing: boolean=false;
  selection = new SelectionModel<Element>(true, []);
  public ProductForm: FormGroup;
  API_URL: string;
  model:WorkOrderMaster = new WorkOrderMaster();
  // work:SubContract[]=[];
  SubcontractData:SubContract[]=[];

  constructor(public form: FormBuilder,private _http: HttpClient,private _workorderservice: WorkOrderMasterService) { }

  dataSource = new MatTableDataSource();
  displayedColumns = ['SNo','WorkOrderNumber', 'Order', 'SubContract','AssignedDate','Status','ExpectedCompleteDate','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saveWorkOrder(){
    debugger;
    if (this.isEditing===false) {
      this._workorderservice.insertWorkOrder(this.model).subscribe(response =>{
        if(response){
          alert("sucessfuly saved");
          this.ngOnInit();
          this.Cancel();
        }
      });
    }
    else{
      this._workorderservice.updateWorkOrder(this.model).subscribe(response =>{
        if(response){
          alert("updated sucessfully");
          this.ngOnInit();
          this.Cancel();
        }
      })
    }
    this.getWorkOrder()
  }


  updateWorkOrders(element,isEditing){
    this.isEditing = isEditing;
    this.show=!this.show;
    this.model = element;
   
    
  }
  deleteWorkOrders(element) {
    // const Id = new Product();
    // Id.prdID = element.Id;
    debugger;
    if (confirm("Are you sure?")) {
      this._workorderservice.deleteWorkOrder(element.WOID).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.ngOnInit();
        }
      });
    }

  }

  getWorkOrder() {
    debugger;
    this._workorderservice.getWorkOrder().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.workorder = response;
        this.dataSource = new MatTableDataSource(this.workorder);
        console.log(this.dataSource);
      }
    });
  }


  // getSubContract() {
  //   debugger;
  //   this._workorderservice.getSubContract().subscribe(response => {
  //     debugger
  //     response['result'];
  //     if (response) {
  //       this.work = response;
     
  //     }
  //   });
  // }

  getSubContract(){
    debugger;
    this._workorderservice.getSubContract().subscribe(response => {
      debugger
      response['result'];
      if (response) {
        this.SubcontractData = response;
        console.log("prdMaster",this.SubcontractData)
      }
    });
  }


  ngOnInit() {
    this.getWorkOrder();
    this.getSubContract();
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
      CustomerCode: ['', [Validators.required]],
      CustomerName: ['', [Validators.required]],
      CustomerAddress: ['', [Validators.required]],
      CustomerContact: ['', [Validators.required]],
      CustomerEmail: ['', [Validators.required]],
      GSTNo: ['', [Validators.required]],

});
console.log(this.ProductForm)
  }

}
