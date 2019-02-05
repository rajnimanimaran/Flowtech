import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WorkOrderMasterService {

  constructor(private _http: HttpClient) { }
  
  insertWorkOrder(data): Observable<any> {
    const dataUrl = API_URL + "WorkOrderMaster/Create";
    return this._http.post<any>(dataUrl, data)
  }
  updateWorkOrder(data): Observable<any> {
    const dataUrl = API_URL + "WorkOrderMaster/Modify";
    return this._http.put<any>(dataUrl, data)
  }
  deleteWorkOrder(Id): Observable<any> {
    const dataUrl = API_URL + "WorkOrderMaster/Delete/" + Id;
    return this._http.delete<any>(dataUrl, Id)
  }
  getWorkOrder(): Observable<any> {
    const dataUrl = API_URL + "WorkOrderMaster/AllWorkOrder";
    return this._http.get<any>(dataUrl)
  }
  
  getSubContract(): Observable<any> {
    const dataUrl = API_URL + "WorkOrderMaster/GetWorkOrderMaster";
    return this._http.get<any>(dataUrl)
  }
}

