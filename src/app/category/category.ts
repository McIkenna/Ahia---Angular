import { Product } from "../product/product";

export class Category {
     id : string;
    categoryName : string;
    categoryDescription : string;
    categoryImage : any;
    //product : Product

    constructor(){
        this.id = "";
        this.categoryName = "";
        this.categoryDescription = "";
        this.categoryImage = [];
        //this.product = []
    }
}
