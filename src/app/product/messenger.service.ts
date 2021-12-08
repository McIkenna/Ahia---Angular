import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()
  constructor() { }

  sendMsg(product: Product){
    this.subject.next(product) //Triggering an evnt
  }
  getMsg(){
    return this.subject.asObservable()
  }
}
