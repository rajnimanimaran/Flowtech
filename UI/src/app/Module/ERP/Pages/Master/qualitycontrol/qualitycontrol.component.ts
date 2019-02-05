import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { Quality } from '../../../Models/Master/quality/quality';
import { QualitycontrolService } from '../../../Services/Master/qualitycontrol.service';
import { ProductService } from '../../../Services/Master/product.service';
import { ProductMaster } from '../../../Models/Master/Product/product';


@Component({
  selector: 'app-qualitycontrol',
  templateUrl: './qualitycontrol.component.html',
  styleUrls: ['./qualitycontrol.component.css']
})
export class QualitycontrolComponent implements OnInit {
  public show: boolean = false;
  isEditing: boolean = false;
  model: Quality = {
    QualCode: '',
    QualName: '',
    prdID: 0
  };
  // Quality: prod[] = [];
  selection = new SelectionModel<Element>(true, []);
  productData: ProductMaster[] = [];




  // product: prod[] = [{ PrdID: 1, prdName: 'mennappn' }, { PrdID: 2, prdName: 'vinoth' }];

  dataSource = new MatTableDataSource();
  displayedColumns = ['SNo', 'QualityCode', 'QualityName', 'ProductName', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort
  ddvalues: any = [];
  Quality: any=[];


  constructor(private _QualitycontrolService: QualitycontrolService,private _ProductService: ProductService) { }

  ngOnInit() {
    // this.product;
    this.addArea();
    this.getQuality();
    // this.getdropdown();
    // this._localStorageService.getUserId();
    // this.getUOMMaster();
  }

  handleClick(event) {
    event.stopPropagation();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();         // Remove whitespace
    filterValue = filterValue.toLowerCase();  // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  saveQuality() {
    debugger;
    if (this.isEditing == false) {
      // this.model=empty;
      this._QualitycontrolService.insertQuality(this.model).subscribe(response => {
        if (response) {
          alert("sucessfuly saved");

          this.ngOnInit();

        }
      });
    }
    else {
      this._QualitycontrolService.updateQuality(this.model).subscribe(response => {
        if (response) {
          alert("updated sucessfully");


          this.ngOnInit();
          // this.Cancel();


        }
      })
    }


    // this. getQuality()
  }
  updateProducts(element, isEditing) {
    this.isEditing = isEditing;
    this.show = !this.show;
    this.model = element;


  }
  addArea() {
    this.show = !this.show;
    this.model.QualCode = "";
    this.model.QualName = "";
    this.model = {
      QualCode: '',
      QualName: '',
      prdID: 0
    }
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


  Cancel() {
    debugger;
    this.show = !this.show;
    this.isEditing = false;

  }
  getQuality() {
    //debugger;
    this._QualitycontrolService.getQuality().subscribe(response => {
      debugger;
      response['result'];
      if (response) {
        this.Quality = response;

        this.dataSource = new MatTableDataSource(this.Quality);


        console.log(this.dataSource);

      }
    });
  }

  // getdropdown() {
  //   this._QualitycontrolService.getdropdown().subscribe(response => {

  //     response['result'];
  //     if (response) {
  //       this.ddvalues = response;



  //       console.log(this.ddvalues);
  //     }
  //   })
  // }
  deleteProducts(element) {
    // const Id = new Product();
    // Id.prdID = element.Id;
    debugger;
    if (confirm("Are you sure?")) {
      this._QualitycontrolService.deleteQuality(element.ChkID).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          this.Cancel()
          this.ngOnInit();


        }
      });
    }

  }





}
