import { Component, OnInit } from '@angular/core';
import readXlsxFile from 'read-excel-file'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  categoryList : any = [];
  categoryNames : any = [];
  productList : any = [];
  productCode : any = [];
  fileUploded = true;
  duplicateCode = false;
  inputfile : any;

  constructor(private router : Router,
              public http : HttpClient) { }

  ngOnInit() {
    this.getCategoryList();
    this.getProductList();
  }

  readFileData(){

    this.inputfile = document.getElementById('inputXLFile');
    if(this.inputfile.files.length){
      readXlsxFile(this.inputfile.files[0]).then((rows) => {

        for(let i=0;i<rows.length;i++){
          let index = this.categoryNames.indexOf(rows[i][3].toLowerCase());
          let code = this.productCode.indexOf(rows[i][2].toString());

          if(code < 0){
            let productdata = {};
            if(index >= 0){
              productdata = {
                name : rows[i][0],
                description : rows[i][1],
                uniquecode : rows[i][2],
                catagory_id : this.categoryList[index]._id
              };
              this.addProductData(productdata);
            }else{
              this.http.post('http://localhost:3000/productCategories/',{'name':rows[i][3].toLowerCase()})
              .subscribe(
                (res) => {
                  let resdata : any = [];
                  resdata = res;
                  productdata = {
                    name : rows[i][0],
                    description : rows[i][1],
                    uniquecode : rows[i][2],
                    catagory_id : resdata._id
                  };
                  this.addProductData(productdata);
                  this.getCategoryList();
              });
            }
          }
          else{
            this.duplicateCode = true;
          }
        }
      })
    }else{
      this.fileUploded = false;
    }
  }

  addProductData(product){
    this.http.post('http://localhost:3000/addproduct/',product)
    .subscribe(
      (res) => {
        this.router.navigate(['/productlist']);
    });
  }

  getProductList(){
    this.http.get('http://localhost:3000/product/')
    .subscribe(
      (res) => {
        this.productList = res;
        this.productCode = this.productList.map((item) => {return item.uniquecode});
    });
  }

  getCategoryList(){
    this.http.get('http://localhost:3000/productCategories/')
    .subscribe(
      (res) => {
        this.categoryList = res;
        this.categoryNames = this.categoryList.map((item) => {return item.name});
    });
  }

}
