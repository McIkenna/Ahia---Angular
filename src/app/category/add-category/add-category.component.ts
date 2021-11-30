import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { baseUrl } from 'src/app/baseUrl';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = new Category();
  imagePreview: any;
  selectedFile: File | any;
  constructor(private categoryService : CategoryService, private router : Router, private _http : HttpClient,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    const isPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isPresent){
      const id:string = this._activatedRoute.snapshot.paramMap.get('id') || "";
      this.categoryService.getbyCategoryId(id).subscribe(
        data => this.category = data
      )
    }
  }

  saveCategory(){
    const uploadFile = new FormData();
   uploadFile.append('file', this.selectedFile, this.selectedFile.name);
   uploadFile.append('id', this.category.id)
   uploadFile.append('categoryName', this.category.categoryName)
   uploadFile.append('categoryDescription', this.category.categoryDescription)
  //  this._http.post(`${this.cat_url}`, uploadFile).subscribe(data => {
  //   console.log('response', data)
  //  this.router.navigateByUrl('');
  //  })
   this.categoryService.saveCategory(uploadFile).subscribe(
      data => {
        this.router.navigateByUrl('');
      }
    )
  }

  handleImage(event: any) : void{
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0]

      const reader = new FileReader();
      reader.onload = event => this.imagePreview = reader.result;
      reader.readAsDataURL(file)
      this.selectedFile = file
    }
  }

}
