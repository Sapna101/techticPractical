import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  productList : any = [];
  productSearchList : any = [];
  categoryList : any = [];
  searchBy;

  constructor(private router : Router,
              public http : HttpClient) { }

  ngOnInit() {
    this.getProductList();
    this.getCategoryList();
  }

  searchByQuery(){
    this.searchBy = this.searchBy.toLowerCase();
    this.productSearchList = this.productList.filter((item) =>{
      return item.name == this.searchBy || this.categoryList[item.catagory_id] == this.searchBy;
    });
    if(!this.searchBy){
      this.productSearchList = this.productList;
    }
  }

  getProductList(){
    this.http.get('http://localhost:3000/product/')
    .subscribe(
      (res) => {
        this.productList = res;
        this.productSearchList = res;
    });
  }

  getCategoryList(){
    this.http.get('http://localhost:3000/productCategories/')
    .subscribe(
      (res) => {
        this.categoryList = res;
        let resobj = this.categoryList.reduce((o, key) => Object.assign(o, {[key._id]: key.name}), {});
        this.categoryList = resobj;
    });
  }

}
