import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: IProduct[];
  constructor() {
    this.products = [
      {
        title: 'Apple',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 180
      },
      {
        title: 'Orange',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 67
      },
      {
        title: 'Mango',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 120
      },
      {
        title: 'Graph',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 60
      },
      {
        title: 'Pineapple',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 80
      },
      {
        title: 'Banana',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 45
      }
    ];
  }

  ngOnInit() {
  }

}
