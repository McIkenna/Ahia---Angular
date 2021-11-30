import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  products: ProductResponseModel[] = [];

  private order_url =  `${baseUrl}/orderItem`;

  constructor(private _http: HttpClient) { }
    getSingleOrder(orderId: string){
      return this._http.get<ProductResponseModel[]>(`${this.order_url}/orderItem/${orderId}`).toPromise();
    }
}

interface ProductResponseModel{
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: any
}