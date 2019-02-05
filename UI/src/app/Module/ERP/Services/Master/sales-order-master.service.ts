import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SalesOrderMasterService {

  constructor(private _http: HttpClient) { }
  
  insertSalesOrder(data): Observable<any> {
    const dataUrl = API_URL + "PO/Creates";
    return this._http.post<any>(dataUrl, data)
  }
  updateSalesOrder(data): Observable<any> {
    const dataUrl = API_URL + "PO/Modify";
    return this._http.put<any>(dataUrl, data)
  }
  // deleteSalesOrder(Id): Observable<any> {
  //   const dataUrl = API_URL + "SalesOrder/Delete/" + Id;
  //   return this._http.delete<any>(dataUrl, Id)
  // }
  getSalesOrder(): Observable<any> {
    const dataUrl = API_URL + "PO/AllSO";
    return this._http.get<any>(dataUrl)
  }
  // getSalesDetails(): Observable<any> {
  //   const dataUrl = API_URL + "SalesOrder/GetSoDetails";
  //   return this._http.get<any>(dataUrl)
  // }
  getSalesDetails(id): Observable<any> {
    const dataUrl = API_URL + "PO/GetSoDetails?OrderID=" + id;
    return this._http.get<any>(dataUrl)
  }
  
}
