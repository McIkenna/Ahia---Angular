import { Product } from "../product/product";

export class CartItem{

    id : string;
    productId : string;
    cartImage : [];
    productName : string;
    price: number;
    quantity : number;
   

constructor(id: string, product: Product, quantity = 1){
    this.id = id;
    this.productId = product.id;
    this.productName = product.productName;
    this.cartImage = product.mainImage;
    this.price = product.price;
    this.quantity = quantity

}
}
