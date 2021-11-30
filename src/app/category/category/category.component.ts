import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetailComponent } from 'src/app/product-detail/product-detail/product-detail.component';
import { Product } from 'src/app/product/product';
import { ProductCategoryComponent } from 'src/app/product/product-category/product-category.component';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [ProductCategoryComponent]
  
})
export class CategoryComponent implements OnInit {

  
  category: Category[] = [];

  filteredProducts: Product[] = [];

  constructor(private categoryService : CategoryService, public prodComp: ProductCategoryComponent, private router : Router) { 
  
  }

  ngOnInit(): void {
    this.getCategorys();
  }

 private getCategorys(){
    this.categoryService.getAllCategory().subscribe(data => {this.category = data})
  }

  deleteCategory(id:string){
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.getCategorys()
    });
  }
}