import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail/product-detail.component';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ProductComponent } from './product/product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent

  },
  {
    path: 'addCategory', component: AddCategoryComponent
  },
  {
    path: 'editCategory/:catId', component: AddCategoryComponent
  },
  {
    path: 'addProduct/:catId', component: AddProductComponent
  },
  {
    path: 'editProduct/:catId/:prodId', component: AddProductComponent
  },
  {
    path: 'category/:id', component: ProductComponent
  },
  {
    path: 'product/:prodId', component: ProductDetailComponent
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
