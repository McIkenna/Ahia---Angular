import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './category/category/category.component';
import { ProductComponent } from './product/product/product.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header/header.component';
import { HomeComponent } from './home/home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail/product-detail.component';
import { FooterComponent } from './footer/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderComponent } from './order/order/order.component';
import { FormsModule } from '@angular/forms';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { RatingComponent } from './product/rating/rating.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { WishlistComponent } from './wishlist/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    ProductComponent,
    ProductDetailComponent,
    AddCategoryComponent,
    AddProductComponent,
    RatingComponent,
    CartItemComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    NgbModule, 
    HttpClientModule, 
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
