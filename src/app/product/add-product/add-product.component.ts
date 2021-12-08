import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  product: Product = new Product();
  mainImagePreview: any;
  mainFile : File | any;
  extraFiles : File | any = [];
  extraImagePreview : any= [];
  categoryId : string = '';
  itemSize = [
    "S","M","L","XL","XXL","Generic","None"
  ];
  selectedItem : string = "";

  constructor(private _productService: ProductService, private _router : Router, private _http: HttpClient, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
const isprodId = this._activatedRoute.snapshot.paramMap.has('prodId');
if(isprodId){
      this._activatedRoute.paramMap.subscribe(
        params =>{
          const catId = params.get('catId') || "";
          const prodId = params.get('prodId') || "";
          this.categoryId = catId;
          this.getProductById(prodId);
        }
          )
  }else{
    const catId = this._activatedRoute.snapshot.paramMap.get('catId') || "";
    this.categoryId = catId;
  }
     
  }


  saveProduct(){
    const uploadFile = new FormData();
    uploadFile.append('file', this.mainFile, this.mainFile.name);
    uploadFile.append('id', this.product.id)
    for(const file of this.extraFiles ){
      uploadFile.append('files', file, file.name)
    }
    uploadFile.append('categoryId', this.categoryId)
    uploadFile.append('productName', this.product.productName)
    uploadFile.append('brand', this.product.brand)
    uploadFile.append('productSummary', this.product.productSummary)
    uploadFile.append('productDescription', this.product.productDescription)
    uploadFile.append('itemSize', this.selectedItem)
    uploadFile.append('price', this.product.price)
    uploadFile.append('countInStock', this.product.countInStock)
    uploadFile.append('rating', this.product.rating)
    uploadFile.append('numOfReviews', this.product.numOfReviews)
  
    this._productService.saveProduct(uploadFile, this.categoryId).subscribe(
       data => {
         this._router.navigateByUrl('');
       }
     )
  }

  onChangeMain(event:any):void{
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0]
      const reader = new FileReader();
      reader.onload = event => this.mainImagePreview = reader.result;
      reader.readAsDataURL(file)
      this.mainFile = file
    }
  }

  onSelectExtras(event:any):void{
    if(event.target.files && event.target.files[0]){
      let numOfImages = 4;
      for(let i=0; i<numOfImages; i++){
        this.extraFiles[i] = event.target.files[i]
        const reader = new FileReader();
      reader.onload = event => this.extraImagePreview[i] = reader.result;
      reader.readAsDataURL(this.extraFiles[i])
      }
    }
  }

  getProductById(id:string){
    this._productService.getSingleProduct(id).subscribe(
      data => this.product = data
    )
  }
}
