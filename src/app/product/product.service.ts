import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private prod_url = `${baseUrl}/product`;
  constructor(private _http: HttpClient) { }

  getAllProducts() : Observable<Product[]>{
    return this._http.get<Product[]>(`${this.prod_url}/all`)
  }

  /*GET Single Product*/
  getSingleProduct(id: string): Observable<Product>{
    return this._http.get<Product>(`${this.prod_url}/prod/${id}`)
  }

  /* Get Product from One Category */
  // getProductFromCategory(catId:string) : Observable<Product[]>{
  //   return this._http.get<Product[]>(`${this.prod_url}/prods/${catId}`)
  // }
}
