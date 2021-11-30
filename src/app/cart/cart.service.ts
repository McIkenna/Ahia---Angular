import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { baseUrl } from '../baseUrl';
import { OrderService } from '../order/order.service';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { CartPublic, CartServer } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartServerUrl = `${baseUrl}/orderItem`;


  //Data variable to store the cart information on the client's local storage;
  private cartDataClient: CartPublic = {
    total: 0,
    prodData: [{
        id: '',
        inCart: 0
    }]
  }

  //Data variable to store the cart information on the server;
  private cartDataServer: CartServer = {
    total:0,
    data: [{
      product: undefined,
      numInCart: 0,
    }]
  }

  /* OBSERVABLE FOR TH COMPONENTS TO SUBSCRIBE*/
  cartTotal = new BehaviorSubject<number>(0);
  cartDataObs = new BehaviorSubject<CartServer>(this.cartDataServer);
  

  constructor(private _http: HttpClient, 
            private _productService: ProductService, 
            private orderService: OrderService,
            private router: Router) { 
              this.cartTotal.next(this.cartDataServer.total);
              this.cartDataObs.next(this.cartDataServer);

              //Get the information from local storage
              let info : CartPublic = JSON.parse(localStorage.getItem('cart'));

              //Check if the info variable is null or has some data in it

              if(info != null && info != undefined && info.prodData[0].inCart != 0){
                //Local storage is not empy and has some information
                this.cartDataClient = info;

                //loop through each entry to put it in the cartDataServer object;
                this.cartDataClient.prodData.forEach(p => {
                  this._productService.getSingleProduct(p.id).subscribe((actualProductInfo: Product) => {
                    if(this.cartDataServer.data[0].numInCart == 0){
                      this.cartDataServer.data[0].numInCart = p.inCart;
                      this.cartDataServer.data[0].product = actualProductInfo;

                      //TODO Create CalculateTotal Function and replace it here
                      this.cartDataClient.total = this.cartDataServer.total;
                      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

                    }else{

                      //CartCataServer already has some entry in it
                      this.cartDataServer.data.push({
                        numInCart: p.inCart,
                        product: actualProductInfo
                      });
                        //TODO Create CalculateTotal function and replace it here
                        this.cartDataClient.total = this.cartDataServer.total;
                        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
                    }
                    this.cartDataObs.next({... this.cartDataServer});
                  
                })
              });
            }

  
}

addProducttoCart(id: string, quantity?:number){

  this._productService.getSingleProduct(id).subscribe(prod => {

  //1. If the cart is empty
  if(this.cartDataServer.data[0].product == undefined){
    this.cartDataServer.data[0].product = prod;
    this.cartDataServer.data[0].numInCart = quantity != undefined ? quantity : 1;
// TODO CALCULATE TOTAL AMOUNT
    this.cartDataClient.prodData[0].inCart = this.cartDataServer.data[0].numInCart;
    this.cartDataClient.prodData[0].id = prod.id;
    this.cartDataClient.total = this.cartDataServer.total;
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    this.cartDataObs.next({...this.cartDataServer})
  }
  else {
    let index = this.cartDataServer.data.findIndex(p => p.product.id == prod.id); // -1 or a positive value

    // a. if that item is already in the cart => index is positive value

    if(index != -1){
      if(quantity != undefined && quantity <= prod.countInStock){
        this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.countInStock ? quantity : prod.countInStock;

      }else{
        this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.countInStock ? this.cartDataServer.data[index];
      }

      this.cartDataClient.prodData[index].inCart = this.cartDataServer.data[index].numInCart;
      //TODO DISPLAY A TOAST NOTIFICATION
      //End of IF
    }
    else {
      this.cartDataServer.data.push({
        numInCart: 1,
        product: prod
      });
      this.cartDataClient.prodData.push({
        inCart: 1,
        id: prod.id
      });

      //TODO TOAST N

      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartDataObs.next({...this.cartDataServer});
      //END OF ELSE

    }
  }
  // b. if that item is not in the cart

  })

}

updateCartItems(index: number, increase : boolean){
  let data = this.cartDataServer.data[index];

  if(increase){
    data.numInCart < data.product.countInStock ? data.numInCart++ : data.product.countInStock;
    this.cartDataClient.prodData[index].inCart = data.numInCart;
  //TODO CALCULATE TOTAL AMOUN  
    this.cartDataClient.total = this.cartDataServer.total;
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    this.cartDataObs.next({...this.cartDataServer});

  } else {
    data.numInCart--;

    if(data.numInCart < 1){
      //TODO DELETE THE PRODUCT FROM CART
      this.cartDataObs.next({...this.cartDataServer});

    }else {
      this.cartDataObs.next({...this.cartDataServer});
      this.cartDataClient.prodData[index].inCart = data.numInCart;
      //TODO CALCULATE TOTAL AMOUN  
    this.cartDataClient.total = this.cartDataServer.total;
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    }
  }
}

deleteProductFromCart(index: number){
  if(window.confirm('This will delete the item')){
    this.cartDataServer.data.splice(index, 1);
    this.cartDataClient.total = this.cartDataServer.total;

    if(this.cartDataClient.total == 0){
      this.cartDataClient = {total: 0, prodData:[{inCart: 0, id: ''}]};
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    }else{
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    }

    if(this.cartDataServer.total == 0){
      this.cartDataServer = {
        total: 0, data:[{numInCart: 0, product: undefined}]
      };
      this.cartDataObs.next({...this.cartDataServer});
    }else{
      this.cartDataObs.next({...this.cartDataServer});
    }
  }else{
    //IF THE USER CLICKS THE CANCEL BUTTON
    return;
  }
}

private calculateTotal(){
  let Total = 0;
  this.cartDataServer.data.forEach(p => {
    const {numInCart} = p;
    const {price} = p.product;

    Total += numInCart *  price;
  });
  this.cartDataServer.total = Total;
  this.cartTotal.next(this.cartDataServer.total);
}

checkOutFromCart(userId: string){
  
  if(this.makePayment()){
    
  }
}

private resetServerData(){
  this.cartDataServer = {
    total : 0,
    data: [{
      numInCart: 0,
      product: undefined
    }]
  };
  this.cartDataObs.next({...this.cartDataServer});
}

makePayment(){
  setTimeout(() => {
   return true;
  }, 3000)
}
}

