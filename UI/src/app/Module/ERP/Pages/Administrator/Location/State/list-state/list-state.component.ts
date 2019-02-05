import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { StateServicesService } from '../../../../../Services/Administrator/Location/State.service';
import { CountryEntity } from '../../../../../Models/Administrator/Location/Countrymodel';
import { State } from '../../../../../Models/Administrator/Location/State';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-state',
  templateUrl: './list-state.component.html',
  styleUrls: ['./list-state.component.css']
})
export class ListStateComponent implements OnInit {

  public ShowEditRow: boolean = false;
  public buttonName: any = 'edit';

  //for table
  displayedColumns = ['SNo', 'StateName', 'CountryName', 'action'];
  liststate: any = [];
  dataSource = new MatTableDataSource<Element>(this.liststate);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  stateVal: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();         // Remove whitespace
    filterValue = filterValue.toLowerCase();  // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // menu prevent from closing
  handleClick(event) {
    event.stopPropagation();
  }

  constructor(private _ListStateService: StateServicesService, private _router: Router) { }

  //for make screen as fullscreen
  screenfullClicked = false;
  onClick() {
    this.screenfullClicked = !this.screenfullClicked;
  }

  ngOnInit() {
    this.viewStateDetails();
  }

  AddStatedetails(value) {
    debugger;
    this._ListStateService.setIsEditing(value);
    // this.countryVal = [];
    this._router.navigate(["AddState"])

  }

  viewStateDetails() {
    debugger;
    this._ListStateService.listStateDetails().subscribe((data: any) => {
      debugger;
      if (data)
        this.liststate = JSON.parse(data._body)
      this.dataSource = new MatTableDataSource<Element>(this.liststate);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.liststate, "liststate")
    })
  }
  editState(value, element) {
    debugger;
    this.stateVal = element.StateId;
    this._ListStateService.setStateVal(element);
    this._ListStateService.setIsEditing(value);
    this._router.navigate(["AddState"])
  }

  RemoveState(element) {
    debugger;
    const state = new State();
    state.StateId = element.StateId;
    this._ListStateService.removeState(state).subscribe(response => {
      debugger;
      this.liststate = response['result'];
      alert("Deleted Successfully")
      this.viewStateDetails();
      this.dataSource = new MatTableDataSource(this.liststate);
      this.dataSource.sort = this.sort;
      console.log(this.liststate);
    });
  }

}


//for table
export interface Element {
  SNo: number;
  StateName: string;
  CountryName: string;
}

