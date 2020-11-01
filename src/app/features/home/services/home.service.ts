import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpService } from './../../../core/services/http.service';
import { Injectable } from '@angular/core';

const ENDPOINT_LIST_PRODUCTS = '/api/product/getByCategoryId?category_id=3';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpService) { }

  getList(): Observable<any> {
    return this.http.get(environment.ip_port + ENDPOINT_LIST_PRODUCTS);
  }
}
