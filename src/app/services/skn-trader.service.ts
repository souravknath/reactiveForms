import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SknTraderService {

  constructor(private httpClient: HttpClient) { }

  get_products() {
    // return this.httpClient.get('/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json');
    return this.httpClient.get('/assets/data.json')
  }

  getData(id){
    const params = new HttpParams().set('index', id+"EQN")
    // return this.httpClient.get('/api/chart-databyindex',{params})
    return this.httpClient.get('/assets/chart.json',{params})
  }
}
