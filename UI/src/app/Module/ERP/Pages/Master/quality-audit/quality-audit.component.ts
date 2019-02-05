import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { QualityAuditModel } from '../../../Models/Master/QualityAudit/QualityAudit';
import { QualityAuditService } from '../../../Services/Master/quality-audit.service';


@Component({
  selector: 'app-quality-audit',
  templateUrl: './quality-audit.component.html',
  styleUrls: ['./quality-audit.component.css']
})
export class QualityAuditComponent implements OnInit {

  displayedColumns = ['SNo', 'QACode', 'QAName', 'ProductName','QualityName', 'action'];
  QualityAudit: QualityAuditModel[]=[];
  datasource: any;
  dataSource: MatTableDataSource<QualityAuditModel>;
  public show: boolean=false;
  model: { 
  Code:'',
  Name: ''

   };
  isEditing: boolean=false;
  Qnamevalues: any;
  Pnamevalues: any;
    
  constructor(private _Qualityservice:QualityAuditService) { }

  ngOnInit() {
    this.getQualityAudit();
    // this.getPNamedropdown();
    // this.getQNamedropdown();
  }


  handleClick(event) {
    event.stopPropagation();
  }


  getQualityAudit()
  {
    debugger;
    this._Qualityservice.getQuality().subscribe(response=>{
      response['result'];
      if(response)
      {
        this.QualityAudit=response;
        this.dataSource=new MatTableDataSource(this.QualityAudit);
        console.log(this.QualityAudit);
      }
      
    })

  }


  saveQuality() {
    debugger;
    if (this.isEditing == false) {
      // this.model=empty;
      this._Qualityservice.insertQuality(this.model).subscribe(response => {
        if (response) {
          alert("sucessfuly saved");

          this.ngOnInit();
          this.Cancel();

        }
      });
    }
    else {
      this._Qualityservice.updateQuality(this.model).subscribe(response => {
        if (response) {
          alert("updated sucessfully");


          this.ngOnInit();
           this.Cancel();


        }
      })
    }


    // this. getQuality()
  }

  Cancel() {
    debugger;
    this.show = !this.show;
    this.isEditing = false;

  }
  updateProducts(element, isEditing) {
    this.isEditing = isEditing;
    this.show = !this.show;
    this.model = element;


  }

  
  addArea() {
    this.show = !this.show;
 
    this.model = {
    Code:'',
    Name: ''


    
    }
  }
  // getQNamedropdown() {
  //   debugger;
  //   this._Qualityservice.getQNamedropdown().subscribe(response => {

  //     response['result'];
  //     if (response) {
  //       this.Qnamevalues = response;



  //       console.log(this.Qnamevalues);
  //     }
  //   })
   
  // }
  // getPNamedropdown() {
  //   debugger;
  //   this._Qualityservice.getPnamedropdown().subscribe(response => {

  //     response['result'];
  //     if (response) {
  //       this.Pnamevalues = response;



  //       console.log(this.Pnamevalues);
  //     }
  //   })
  // }



  deleteProducts(element) {
    // const Id = new Product();
    // Id.prdID = element.Id;
    debugger;
    if (confirm("Are you sure?")) {
      this._Qualityservice.deleteQualityAudit(element.ChkList).subscribe((response: any) => {
        debugger;
        if (response) {
          alert("successfully deleted");
          
           this.ngOnInit();
          // this.Cancel();

        }
      });
    }

  }

}
