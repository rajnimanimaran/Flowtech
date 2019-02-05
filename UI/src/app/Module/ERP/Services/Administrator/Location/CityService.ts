import { Injectable, ApplicationInitStatus } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'  
import 'rxjs/Rx';   
import { environment } from '../../../../../../environments/environment';
import { City } from '../../../Models/Administrator/Location/City';
import { Http,Headers } from '@angular/http';
import { HeaderStorageService } from '../../../../../header-storage.service';

const API_URL = environment.apiUrl;

@Injectable()
export class CityServicesService {
  CityValue:any = []
  isEditing: boolean;
  constructor(private _http: Http,private _headerStorage:HeaderStorageService) { }
  
  setIsEditing(value:boolean){
    this.isEditing=value
    }
    getIsEditing(){
      return this.isEditing;
      }
  saveCityDetail(element){
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.post(API_URL+'City/Create', element,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  removeCity(id){   
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const city        = new City
          city.CityId = id
    const dataUrl     = API_URL+'City/Delete/'+id.CityId;
    return this._http.delete(dataUrl,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }

  listCityDetails():Observable<any>{
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'City/AllCity';
  return this._http.get(dataUrl,{headers:headers})
  }
  
  
  listCityDetailsByStateId(Id):Observable<any>{
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'City/GetCityByStateId/'+Id;
  return this._http.get(dataUrl,{headers:headers})
  }
  handleError(error: Response) {
    return Observable.throw(error);
  }
  updateCityDetail(element){
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.put(API_URL+'City/Modify', element,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  setCityVal(element:any=[]){
    debugger
    this.CityValue = element
  }
  getCityVal(){
    debugger
    return this.CityValue;
  }

}
