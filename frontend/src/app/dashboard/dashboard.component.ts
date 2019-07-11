import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from '../services/signal-r.service';
import { IProduct } from './product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  products: IProduct[];

  constructor(public signalRService: SignalRService, private http: HttpClient, private title: Title) {
    this.title.setTitle('Keep Note - Dashboard');
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
}
