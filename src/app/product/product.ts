export class Product {
    id: string;
    brand : string;
    categoryId: string;
    productName: string;
    productSummary : string;
    productDescription: string;
    itemSize : string;
    mainImage : any;
    extraImages: [];
    price : any;
    countInStock : any;
    rating : any;
    numOfReviews : any;
    //dateCreated : Date;

    constructor(){
        this.id = "",
        this.brand = "",
        this.categoryId = "",
        this.productName = "",
        this.productSummary = "",
        this.productDescription = "",
        this.itemSize = "",
        this.mainImage = [],
        this.extraImages = [],
        this.price = null,
        this.countInStock = null,
        this.rating = null,
        this.numOfReviews = null
    }
}
