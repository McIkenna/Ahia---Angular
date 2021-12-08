import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  product: Product | undefined;
  imageChanged : boolean = true;
  @ViewChild('mainImage') image1 : any;
  @ViewChild('extraImage') extra1 : any;
  @ViewChild('mainImageThumb') image2 :any; 
  

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService) { }



  ngOnInit(): void {
    const isPresent = this.activatedRoute.snapshot.paramMap.get('prodId');
    if(isPresent){
      this.activatedRoute.paramMap.subscribe(
        params =>{
          const id = params.get('prodId') || "";
          this.getProductById(id);
        }
      )
    }

  }

  onBack():void{
    history.back()
  }

  getProductById(id: string){
    this.productService.getSingleProduct(id).subscribe(
      data => {this.product = data;})
  }

  getItem(stuff: any){
    console.log(stuff);
  }
   
  
// const imgs = document.querySelectorAll('.img-big-wrap a');
// const imgBtns = [... this.imgs];
// const imgId : number = 1;

// imgBtns.forEach((imgItem) => {
//     imgItem.addEventListener('click', (event: any) => {
//         event.preventDefault();
//         imgId = imgItem.dataset.id;
//         slideImage();
//     });
// });

// function slideImage(){
//     const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

//     document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
// }

// window.addEventListener('resize', slideImage);


changeImage(id: number){
let mainImage = document.getElementById('mainImage')!
 const thumbImages = document.getElementsByClassName('item-thumb'); 
 mainImage.innerHTML = thumbImages[id].innerHTML;

}

}
