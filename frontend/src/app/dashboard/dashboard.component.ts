import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from '../services/signal-r.service';
interface IProduct {
  title: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  products: IProduct[];
  latestProducts: IProduct[];

  constructor(public signalRService: SignalRService, private http: HttpClient, private title: Title) {
    this.title.setTitle('Keep Note - Dashboard');
    this.products = [
      {
        title: 'Apple',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 99
      },
      {
        title: 'Orange',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 99
      },
      {
        title: 'Mango',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 99
      },
      {
        title: 'Graph',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 99
      },
      {
        title: 'Pineapple',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 99
      },
      {
        title: 'Banana',
        description: `Some quick example text to build on the card title and make up the bulk of the card\'s content.`,
        image: 'https://dummyimage.com/600x400/55595c/fff',
        price: 99
      },
    ];
  }
}
