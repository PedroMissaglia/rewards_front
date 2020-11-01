import { Observable } from 'rxjs';
import { HomeService } from './services/home.service';
import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products$: Observable<Product[]>;
  constructor(public homeService: HomeService) { }

  ngOnInit(): void {
    this.products$ = this.homeService.getList();
  }

}
