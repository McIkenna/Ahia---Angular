import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail/product-detail.component';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { ProductCategoryComponent } from './product/product-category/product-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent

  },
  {
    path: 'addCategory', component: AddCategoryComponent
  },
  {
    path: 'editCategory/:id', component: AddCategoryComponent
  },
  {
    path: 'product/:id', component: ProductDetailComponent
  },
  {
    path: 'category/:id', component: ProductCategoryComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
