import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrls: ['./table-add.component.css']
})
export class TableAddComponent implements OnInit {

  edit: any;
  public ShowEditRow:boolean = false;
  public buttonName:any = 'edit';

  //for table
  displayedColumns = ['firstname', 'lastname', 'product', 'available','shipdate', 'quantity', 'price', 'action'];
  
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort; 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // menu prevent from closing
  handleClick(event) {
    event.stopPropagation();
  }

  constructor() { }

  //for make screen as fullscreen
  screenfullClicked = false; 
  onClick() {
    this.screenfullClicked= !this.screenfullClicked;
  }

  ngOnInit() {
  }

  //for adding a new Row
  addRow() {  
    this.dataSource.data.push({
      firstname: "shan",
      lastname: "Product Zero",
      product: "Black Tea",
      available: "yes",
      shipdate: 22032018,
      quantity: 20,
      price: 2593,
    });
    this.dataSource.filter = "";
  }

  //for Deleteing a Row
  deleteRow(e){  
    let index:number = this.dataSource.data.findIndex(x => x.firstname === e);
    this.dataSource.data.splice(index,1);
    console.log(this.dataSource);
    console.log(e);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

}



//for table
export interface Element {
  firstname: string;
  lastname: string; 
  product: string;
  available: string;
  shipdate: number;
  quantity: number;
  price: number;
} 
const ELEMENT_DATA: Element[] = [
  {firstname: 'Shan', lastname: 'Product one', product: 'Black Tea', available: 'yes', shipdate: 22032018, quantity: 22, price: 1203},
  {firstname: 'John', lastname: 'Product Two', product: 'Black Tea', available: 'no', shipdate: 22052018, quantity: 12, price: 1253},
  {firstname: 'Sham', lastname: 'Product Three', product: 'Black Tea', available: 'Yes', shipdate: 22052018, quantity: 12, price: 1253},
  {firstname: 'Regina', lastname: 'Product Four', product: 'Black Tea', available: 'no', shipdate: 22052018, quantity: 12, price: 1253},
  {firstname: 'Shim', lastname: 'Product Five', product: 'Black Tea', available: 'Yes', shipdate: 22052018, quantity: 12, price: 1253},
  {firstname: 'Arun', lastname: 'Product Six', product: 'Black Tea', available: 'no', shipdate: 22052018, quantity: 12, price: 1253},
  {firstname: 'Ravi', lastname: 'Product Seven', product: 'Black Tea', available: 'Yes', shipdate: 22052018, quantity: 12, price: 1253},
  {firstname: 'Sundar', lastname: 'Product Eight', product: 'Black Tea', available: 'Yes', shipdate: 22052018, quantity: 12, price: 1253} 
];
