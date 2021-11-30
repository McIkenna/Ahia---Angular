import { Component, OnInit } from '@angular/core';
import { faAngleDown, faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faHeart = faHeart;
  faCartPlus = faCartPlus;
  faAngleDown = faAngleDown;

  constructor() { }

  ngOnInit(): void {
  }

}
