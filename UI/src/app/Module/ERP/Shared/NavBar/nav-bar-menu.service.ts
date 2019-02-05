import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from '../../../../../environments/environment';
import { HeaderStorageService } from '../../../../header-storage.service';
const API_URL = environment.apiUrl;

@Injectable()
export class NavBarMenuService {

  constructor(private _headerStorage:HeaderStorageService,private _http: Http) { }

  getMenuesForNavbarbyUserid(element): Observable<any>{
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.get(API_URL + 'UserMenuMapping/GetMenuMappingByUserId/'+ element, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError);
  }
    handleError(error: Response) {
      return Observable.throw(error);
    }
}
