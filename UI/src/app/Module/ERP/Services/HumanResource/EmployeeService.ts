import { Injectable, ApplicationInitStatus } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'  
import 'rxjs/Rx';   

import { environment } from '../../../../../environments/environment';
import { HeaderStorageService } from '../../../../header-storage.service';
import { Http,Headers } from '@angular/http';
//import { environment } from '../../../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class EmployeeServicesService {
  isEditing: boolean;
  employeeDetails: any;

  constructor(private _http: Http,private _headerStorage:HeaderStorageService) { }

  setIsEditing(value:boolean){
    this.isEditing=value
    }
    getIsEditing(){
      return this.isEditing;
      }
      setEmpVal(value:any=[]){
        this.employeeDetails = value;
      }
    getEmpVal(){
      return this.employeeDetails;
    }
    saveEmployeeDetail(element){
      debugger
      return this._http.post(API_URL+'Employee/Create', element).map(response => {
        return response;
      }).catch(
        this.handleError
      );
    }
    listEmployeeDetails(element):Observable<any>{
      debugger;  
      const headers = new Headers();
      headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL+'Employee/AllEmployees/'+element ;
    return this._http.get(dataUrl,{headers:headers})
    }
    updateEmployeeDetail(element){
      const headers = new Headers();
      headers.append('Token', this._headerStorage.getToken());
      return this._http.put(API_URL+'Employee/Modify', element,{headers:headers}).map(response => {
        return response;
      }).catch(
        this.handleError
      );
    }
      
  listEmployeeByCompanyId(element):Observable<any>{
    debugger;  
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'Employee/AllEmployees/'+element ;
  return this._http.get(dataUrl,{headers:headers})
  }

  listEmployeeByDesignationId(element):Observable<any>{
    debugger;  
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'Employee/AllCompanyEmployees/'+element ;
  return this._http.get(dataUrl,{headers:headers})
  }
    deleteEmployeeDetail(id){
      debugger;
      const headers = new Headers();
      headers.append('Token', this._headerStorage.getToken());
      const dataUrl           = API_URL+'Employee/Delete/'+id;
      return this._http.delete(dataUrl,{headers:headers}).map(response => {
        return response;
      }).catch(
        this.handleError
      );
    }
  handleError(error: Response) {
    return Observable.throw(error);
  }


}
