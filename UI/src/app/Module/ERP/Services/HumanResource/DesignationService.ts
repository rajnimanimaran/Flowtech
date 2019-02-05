import { Injectable, ApplicationInitStatus } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'  
import 'rxjs/Rx';   
import { environment } from '../../../../../environments/environment';
import { Designation } from '../../Models/HumanResource/Designation/DesignationModel';
import { HeaderStorageService } from '../../../../header-storage.service';
import { Http,Headers } from '@angular/http';
//import { environment } from '../../../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class DesignationServicesService {
  DesignationDetails: any;
  isEditing: any;

  constructor(private _http: Http, private _headerStorage: HeaderStorageService) { }
  setIsEditing(value:boolean){
    this.isEditing=value
    }
    getIsEditing(){
      return this.isEditing;
      }
  saveDesignationDetail(element){
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.post(API_URL+'Designation/Create', element,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  updateDepartmentDetail(element){
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.put(API_URL+'Designation/Modify', element,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  
  listDesignationDetailsByDeptId(element):Observable<any>{
    debugger;  
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'Designation/GetDesigByDepId/'+element ;
  return this._http.get(dataUrl,{headers:headers})
  }
  
  listDesignationDetails(element):Observable<any>{
    debugger;  
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'Designation/AllDesignations/'+element ;
  return this._http.get(dataUrl,{headers:headers})
  }
  deleteDepartmentDetail(id){
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl           = API_URL+'Designation/Delete/'+id;
    return this._http.delete(dataUrl,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  setDesignVal(value:any=[]){
    this.DesignationDetails = value;
  }
getDesignVal(){
  return this.DesignationDetails;
}



  handleError(error: Response) {
    return Observable.throw(error);
  }


}
