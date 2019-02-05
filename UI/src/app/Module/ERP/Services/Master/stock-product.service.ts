import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class StockProductService {

  constructor(private _http: HttpClient) { }
  insertstockProduct(data):Observable<any>{
    debugger;
    const dataUrl = API_URL +"products/Create";
    return this._http.post<any>(dataUrl,data)
  }
  updatestockProduct(data):Observable<any>{
    const dataUrl = API_URL + "products/Modify";
    return this._http.put<any>(dataUrl,data)
  }
  deletestockProduct(Id):Observable<any>{
  const dataUrl = API_URL + "products/Delete/"+Id;
    return this._http.delete<any>(dataUrl,Id)
  }
  getstockProduct():Observable<any>{
    const dataUrl = API_URL + "products/Allproduct";
    return this._http.get<any>(dataUrl)
  }
 
}
