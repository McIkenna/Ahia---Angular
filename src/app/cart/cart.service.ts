import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from './cart-item';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../baseUrl';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private cart_url = `${baseUrl}/cart`;
  getCartItems() :Observable<CartItem[]>{
    return this.http.get<CartItem[]>(`${this.cart_url}/all`)
  }

  addProductToCart(product : Product): Observable<any>{
    return this.http.post(`${this.cart_url}`, product);
  }
}
