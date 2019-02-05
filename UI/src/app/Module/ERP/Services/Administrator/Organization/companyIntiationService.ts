import { Injectable, ApplicationInitStatus } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'  
import 'rxjs/Rx';   
import { environment } from '../../../../../../environments/environment';
import { OrganizationLevel } from '../../../Models/Administrator/Organization/Organizationmodel';
import { Http, Headers } from '@angular/http';
import { HeaderStorageService } from '../../../../../header-storage.service';

const API_URL = environment.apiUrl;

@Injectable()
export class CompanyInitiationService {
  compValue: any;
  isEditing: any;

  constructor(private _http: Http,private _headerStorage:HeaderStorageService) { }

  setIsEditing(value:boolean){
    this.isEditing=value
    }
    getIsEditing(){
      return this.isEditing;
      }
  saveCompanyInitiation(element){
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.post(API_URL+'Company/Create', element,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }

  updateCompany(element){
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.put(API_URL+'Company/Modify', element,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }

  listCompanyInitiation():Observable<any>{
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'Company/AllCompany';
  return this._http.get(dataUrl,{headers:headers})
  }
  
  listNatureOfBusiness():Observable<any>{
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'Company/AllNatureOfBusiness';
  return this._http.get(dataUrl,{headers:headers})
  }
  
  OrganizationTypes():Observable<any>{
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'Company/AllOwnerShip';
  return this._http.get(dataUrl,{headers:headers})
  }


  setcompVal(element:any=[]){
    debugger
    this.compValue = element
  }
  getcompVal(){
    debugger
    return this.compValue;
  }

  handleError(error: Response) {
    return Observable.throw(error);
  }


}
