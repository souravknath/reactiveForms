import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SknTraderService {
  myData: any;

  constructor(private httpClient: HttpClient) { }
  
  getGainer():Observable<any> {
    return this.httpClient.get('/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json');
    // return this.httpClient.get('/assets/data.json')
  }
  getLoser() {
    let source = new EventSource('/api/chart-databyindex?index=YESBANKEQN');
    source.addEventListener('message', message => {
        // this.myData = JSON.parse(message.data);        
    });
    console.log(this.myData);
    
    //return this.httpClient.get('/live_market/dynaContent/live_analysis/losers/niftyLosers1.json');
    // return this.httpClient.get('/assets/data.json')
  }
  getData(id){
    const params = new HttpParams().set('index', id+"EQN")
    return this.httpClient.get('/api/chart-databyindex',{params})
    // return this.httpClient.get('/assets/chart.json',{params})
  }
}
