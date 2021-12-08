import { Component, Input, OnInit } from '@angular/core';
import { faAngleDown, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faHeart = faHeart;
  faAngleDown = faAngleDown;
  @Input() totalQuantity: any;

  constructor() { }

  ngOnInit(): void {
  }

}
