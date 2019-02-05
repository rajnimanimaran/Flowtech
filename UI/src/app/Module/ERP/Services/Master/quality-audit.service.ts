import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class QualityAuditService {

  constructor(private _http:HttpClient) { }
  insertQuality(data): Observable<any> {
    const dataUrl = API_URL + "AuditQualitys/Create";
    return this._http.post<any>(dataUrl, data)
  }
  updateQuality(data): Observable<any> {
    const dataUrl = API_URL + "AuditQualitys/Modify";
    return this._http.put<any>(dataUrl, data)
  }

  getQuality(): Observable<any> {
    debugger;
    const dataUrl = API_URL + "AuditQualitys/Allquality";
    return this._http.get<any>(dataUrl)
  }
  // getQNamedropdown(): Observable<any>{
  //   debugger;
  //   const dataUrl = API_URL + "AuditQualitys/GetQualityName";
  //   return this._http.get<any>(dataUrl)
  //   }
  //   getPnamedropdown(): Observable<any>{
  //     debugger;
  //     const dataUrl = API_URL + "AuditQualitys/GetProductName";
  //     return this._http.get<any>(dataUrl)
  //     }
      deleteQualityAudit(Id): Observable<any> {
        const dataUrl = API_URL + "AuditQualitys/Delete/" + Id;
        return this._http.delete<any>(dataUrl, Id)
      } 

 
}
