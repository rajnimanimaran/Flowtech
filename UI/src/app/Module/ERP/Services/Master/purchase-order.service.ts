import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GetID } from '../../Models/Master/purchase-order/purchase-order';


const API_URL = environment.apiUrl;
//Getmodel:GetID = new GetID();
//model[id] : GetID = [];

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private _http: HttpClient) { }
  insertPurchaseOrder(data): Observable<any> {
    const dataUrl = API_URL + "PO/Create";
    return this._http.post<any>(dataUrl, data)
  }
  updatePurchaseOrder(data): Observable<any> {
    const dataUrl = API_URL + "PO/Modify";
    return this._http.put<any>(dataUrl, data)
  }
  // deletePurchaseMaster(Getmodel): Observable<any> {
  //   const dataUrl = API_URL + "PurchaseOrder/Delete/" +Getmodel;
  //   return this._http.delete<any>(dataUrl,Getmodel)
  // }
  // deletePurchaseDetails(ID): Observable<any> {
  //   const dataUrl = API_URL + "PurchaseOrder/Deletes/" + ID;
  //   return this._http.delete<any>(dataUrl, ID)
  // }
  getPurchaseOrder(): Observable<any> {
    debugger;
    const dataUrl = API_URL + "PO/AllPO";
    return this._http.get<any>(dataUrl)
  }

  getSupplierName(): Observable<any> {
debugger;    
    const dataUrl = API_URL + "PO/AllSupplierName";
    return this._http.get<any>(dataUrl)
  }
  
  

  getPODetails(id): Observable<any> {
    const dataUrl = API_URL + "PO/GetPoDetails?PurchaseID=" + id;
    return this._http.get<any>(dataUrl)
  }
}
