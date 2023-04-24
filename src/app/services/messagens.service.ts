import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MessagensService {
  message:string=''

  constructor() { }

  add(message: string) {
    this.message = message;
    setTimeout(this.clear.bind(this), 4000); 
  }
  
  clear() {
    this.message = '';
  }

 
}
