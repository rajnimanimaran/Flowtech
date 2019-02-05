import { Injectable, ApplicationInitStatus } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { environment } from '../../../../../../environments/environment';
import { State } from '../../../Models/Administrator/Location/State';
import { Http,Headers } from '@angular/http';
import { HeaderStorageService } from '../../../../../header-storage.service';

const API_URL = environment.apiUrl;

@Injectable()
export class StateServicesService {
  StateValue: any = [];
  isEditing: boolean;

  constructor(private _http: Http,private _headerStorage:HeaderStorageService) { }

  setIsEditing(value:boolean){
    this.isEditing=value
    }
    getIsEditing(){
      return this.isEditing;
      }
  saveStateDetail(element) {
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.post(API_URL + 'State/Create', element, {headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }

  GetStateNameByCountryId(value): Observable<any> {
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL + 'State/GetStateByCountryId/'+ value;
    return this._http.get(dataUrl, {headers:headers});
  }
  listStateDetails(): Observable<any> {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL + 'State/AllState';
    return this._http.get(dataUrl, {headers:headers})
  }
  removeState(Id): Observable<any> {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const state = new State
    state.StateId = Id.StateId
    const dataUrl = API_URL + 'State/Delete/' + Id.StateId;
    return this._http.delete(dataUrl, {headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  handleError(error: Response) {
    return Observable.throw(error);
  }

  updateStateDetail(element) {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.put(API_URL + 'State/Modify', element, {headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  setStateVal(element: any = []) {
    debugger
    this.StateValue = element
  }
  getStateVal() {
    debugger
    return this.StateValue;
  }


}
