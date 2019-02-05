import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StockRawMaterialService {

  constructor(private _http: HttpClient) { }
  insertstockRawMaterial(data):Observable<any>{
    const dataUrl = API_URL +"RawMaterialStock/Create";
    return this._http.post<any>(dataUrl,data)
  }
  updatestockRawMaterial(data):Observable<any>{
    const dataUrl = API_URL + "RawMaterialStock/Modify";
    return this._http.put<any>(dataUrl,data)
  }
  deletestockRawMaterial(Id):Observable<any>{
  const dataUrl = API_URL + "RawMaterialStock/Delete/"+Id;
    return this._http.delete<any>(dataUrl,Id)
  }
  getstockRawMaterial():Observable<any>{
    const dataUrl = API_URL + "RawMaterialStock/AllRmsk";
    return this._http.get<any>(dataUrl)
  }
  getrmName():Observable<any>{
    const dataUrl = API_URL + "RawMaterialStock/AllRmName";
    return this._http.get<any>(dataUrl)
  }
 
}
