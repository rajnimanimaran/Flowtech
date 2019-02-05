import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { environment } from '../../../../../environments/environment';

import { Http, Headers } from '@angular/http';
import { HeaderStorageService } from '../../../../header-storage.service';


const API_URL = environment.apiUrl;

@Injectable()
export class DepartmentServicesService {
  DepartmentDetails: any;
  isEditing: any;

  constructor(private _http: Http, private _headerStorage: HeaderStorageService) { }
  setIsEditing(value: boolean) {
    this.isEditing = value
  }
  getIsEditing() {
    return this.isEditing;
  }
  saveDepartmentDetail(element) {
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.post(API_URL + 'Department/Create', element, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  updateDepartmentDetail(element) {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.put(API_URL + 'Department/Modify', element, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  deleteDepartmentDetail(id) {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL + 'Department/Delete/' + id;
    return this._http.delete(dataUrl, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }

  listDepartmentDetails(element): Observable<any> {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL + 'Department/AllDepartments/'+element;
    return this._http.get(dataUrl, { headers: headers })
  }
  listDepartmentDetailsByCompanyId(id): Observable<any> {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL + 'Department/AllDepartments' + id;
    return this._http.get(dataUrl, { headers: headers })
  }

  listParentDepartmentDetails(): Observable<any> {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL + 'Department/GetDepOfParentCompanies';
    return this._http.get(dataUrl, { headers: headers })
  }

  // listParentDepartmentDetails(): Observable<any> {
  //   debugger;
  //   const headers = new Headers();
  //   headers.append('Token', this._headerStorage.getToken());
  //   const dataUrl = API_URL + 'Department/GetDepartmentId';
  //   return this._http.get(dataUrl, { headers: headers })
  // }


  setDepartmentVal(value: any = []) {
    this.DepartmentDetails = value;
  }
  getDepartmentVal() {
    debugger;
    return this.DepartmentDetails;
  }

  handleError(error: Response) {
    return Observable.throw(error);
  }


}
