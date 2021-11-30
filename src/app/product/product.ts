export interface Product {
    id: string;
    brand : string;
    categoryId: string;
    productName: string;
    productSummary : string;
    productDescription: string;
    itemSize : string;
    mainImage : any;
     //List<Binary> extraImages = new ArrayList<>();
    price : number;
    countInStock : number;
    rating : number;
    numOfReviews : number;
    //dateCreated? : Date;
}
