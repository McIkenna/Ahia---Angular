import { Product } from "../product/product";

export interface CartServer{
    total: number;
    data: [{
        product: Product,
        numInCart: number
    }]
}


export interface CartPublic {

    total: number;
    prodData: [{
        id: string,
        inCart: number
    }]
}
