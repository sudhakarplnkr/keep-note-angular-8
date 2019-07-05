import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ChartModel } from '../model/chartmodel.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: ChartModel[];
  public bradcastedData: ChartModel[];

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chart')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  }
}
