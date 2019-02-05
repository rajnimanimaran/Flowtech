import { Injectable, ApplicationInitStatus } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'  
import 'rxjs/Rx';   
import { environment } from '../../../../../../environments/environment';
import { Area } from '../../../Models/Administrator/Location/Area';
import { Http , Headers} from '@angular/http';
import { HeaderStorageService } from '../../../../../header-storage.service';

const API_URL = environment.apiUrl;

@Injectable()
export class AreaServicesService {
  AreaValue:any = []
  isEditing: boolean;
  constructor(private _http: Http,private _headerStorage:HeaderStorageService) { }
  setIsEditing(value:boolean){
    this.isEditing=value
    }
    getIsEditing(){
      return this.isEditing;
      }
  saveAreaDetail(element){
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.post(API_URL+'Area/Create', element,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }

    
  listAreaDetailsByCityId(Id):Observable<any>{
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'Area/GetAreaByCityId/'+Id;
  return this._http.get(dataUrl,{headers:headers})
  }
  removeArea(id){   
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const area        = new Area
          area.AreaId = id
    const dataUrl     = API_URL+'Area/Delete/'+id.AreaId;
    return this._http.delete(dataUrl,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  

  listAreaDetails():Observable<any>{
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
  const dataUrl = API_URL+'Area/AllArea';
  return this._http.get(dataUrl,{headers:headers})
  }
  handleError(error: Response) {
    return Observable.throw(error);
  }
  updateAreaDetail(element){
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.put(API_URL+'Area/Modify', element,{headers:headers}).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  setAreaVal(element:any=[]){
    debugger
    this.AreaValue = element
  }
  getAreaVal(){
    debugger
    return this.AreaValue;
  }

}
