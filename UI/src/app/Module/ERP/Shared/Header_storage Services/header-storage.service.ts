import { Injectable } from '@angular/core';

@Injectable()
export class HeaderStorageService {
  isEditing: boolean;

  constructor() { }

setisEditing(value:boolean){
this.isEditing=value
}
getisEditing(){
  return this.isEditing
}
}
