import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BOMDetailsService {
  constructor(private _http: HttpClient) { }
  insertBOM_Details(data): Observable<any> {
    const dataUrl = API_URL + "BOM_Details/Create";
    return this._http.post<any>(dataUrl, data)
  }
  updateBOM_Details(data): Observable<any> {
    const dataUrl = API_URL + "BOM_Details/Modify";
    return this._http.put<any>(dataUrl, data)
  }
  deleteBOM_Details(Id): Observable<any> {
    const dataUrl = API_URL + "BOM_Details/Delete/" + Id;
    return this._http.delete<any>(dataUrl, Id)
  }
  getBOM_Details(): Observable<any> {
    const dataUrl = API_URL + "BOM_Details/AllBOM_Details";
    return this._http.get<any>(dataUrl)
  }
  // getdeleteProduct():Observable<any>{
  //   const dataUrl = API_URL + "";
  //   return this._http.get<any>(dataUrl)
  // }

  // getUOMMaster(): Observable<any> {
  //   const dataUrl = API_URL + "BOM_Details/GetUOMMaster";
  //   return this._http.get<any>(dataUrl)

  // }
}
