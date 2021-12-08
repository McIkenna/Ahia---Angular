import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {

  faStar = faStar;

  @Input() rating: number = 0;
  cropWidth: number = 91;
  @Output() ratingClicked: EventEmitter<string> = 
      new EventEmitter<string>();

  ngOnChanges(): void {
      this.cropWidth = this.rating * 91/5;
  }

  onClick(): void{
      this.ratingClicked.emit(`The rating ${this.rating}`)
  }
}
