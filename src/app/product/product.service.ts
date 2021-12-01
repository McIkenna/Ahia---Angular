import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
  getProductFromCategory(catId:string) : Observable<Product[]>{
    return this._http.get<Product[]>(`${this.prod_url}/prods/${catId}`)
  }
  /*Add Product */
  saveProduct(product : FormData, catId: string){
    return this._http.post<FormData>(`${this.prod_url}/${catId}`, product)
  }

  deleteProduct(id: string){
    return this._http.delete(`${this.prod_url}/${id}`, {responseType: 'text'});
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
        errorMessage = 'An error occurred: ${err.error.message}';

    }else {
        errorMessage = 'Server returned code: ${err.status}, error message is: ${err.message}';
    }
    console.error(errorMessage);
    return throwError(errorMessage);

}
}
