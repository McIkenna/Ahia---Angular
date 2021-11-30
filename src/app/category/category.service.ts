import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { baseUrl } from '../baseUrl';
import { Category } from './category';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  private cat_url = `${baseUrl}/category`;
  constructor(private _http : HttpClient) { }

  getAllCategory() : Observable<Category[]>{
    return this._http.get<Category[]>(`${this.cat_url}/all`);
  }
  saveCategory(category: FormData){
  return this._http.post(`${this.cat_url}`, category)
  }
  deleteCategory(id: string): Observable<any>{
    return this._http.delete(`${this.cat_url}/${id}`, {responseType: 'text'});
  }

  getbyCategoryId(id: string): Observable<Category>{
  return this._http.get<Category>(`${this.cat_url}/${id}`).pipe(
    tap(data => console.log('All', JSON.stringify(data)),
  catchError(this.handleError))
  );
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
