import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class QualitycontrolService {

  constructor(private _http: HttpClient) { }
  insertQuality(data): Observable<any> {
    const dataUrl = API_URL + "Quality/Create";
    return this._http.post<any>(dataUrl, data)
  }
  updateQuality(data): Observable<any> {
    const dataUrl = API_URL + "Quality/Modify";
    return this._http.put<any>(dataUrl, data)
  }
  deleteQuality(Id): Observable<any> {
    const dataUrl = API_URL + "Quality/Delete/" + Id;
    return this._http.delete<any>(dataUrl, Id)
  }
  getQuality(): Observable<any> {
    const dataUrl = API_URL + "Quality/Allquality";
    return this._http.get<any>(dataUrl)
  }
  
getdropdown(): Observable<any>{
const dataUrl = API_URL + "Quality/Productquality";
return this._http.get<any>(dataUrl)
}


}
