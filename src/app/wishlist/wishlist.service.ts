import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wish_url = `${baseUrl}/wish`;
  constructor(private http: HttpClient) { }

  addToWishlist(productId: string){
    return this.http.post(`${this.wish_url}/${productId}`, {id: productId})

  }
  removeFromWishlist(productId: string){
  return this.http.delete(`${this.wish_url}/${productId}`)
  }

  getWishlist(){

  }
}
