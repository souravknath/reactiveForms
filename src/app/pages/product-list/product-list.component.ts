import { Component, OnInit } from '@angular/core';
import { Product } from '../../interface/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList:Array<Product>=[];
  constructor() { }
  
  ngOnInit() {
    this.productList = [
      { id:1, name:"Mango",description:"The .table-bordered class adds borders to a table:",price:150,count:10},
      { id:1, name:"Orange",description:"The .table-bordered class adds borders to a table:",price:100,count:0},
      { id:1, name:"Apple",description:"The .table-bordered class adds borders to a table:",price:90,count:0},
      { id:1, name:"Mango",description:"The .table-bordered class adds borders to a table:",price:60,count:0}
    ]
  }
  substraction(item){
    this.productList[this.productList.indexOf(item)].count = item.count - 1;
  }
  addition(item){
    this.productList[this.productList.indexOf(item)].count = item.count + 1;
  }

}
