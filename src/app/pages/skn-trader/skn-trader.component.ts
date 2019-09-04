import { Component, OnInit } from '@angular/core';
import { SknTraderService } from 'src/app/services/skn-trader.service';
import { Observable, interval } from 'rxjs';
@Component({
  selector: 'app-skn-trader',
  templateUrl: './skn-trader.component.html',
  styleUrls: ['./skn-trader.component.css']
})
export class SknTraderComponent implements OnInit {
  ganerList: Object;
  chartData: any;
  resistance = [];
  support = [];
  data: any[];
  rate: number;
  loserList: Object;
  stockName: any;
  count: Date;
  stockList: any;
  StockListDetails: any;

  constructor(public skntraderService: SknTraderService) { }

  async ngOnInit() {
    this.StockListDetails = []
    // interval(2000 * 50).subscribe(async x => {
      this.StockListDetails = []
      await this.skntraderService.getGainer().subscribe((res) => {
        this.count = new Date()
        this.ganerList = res
        this.stockList = res.data;
        this.stockList.forEach(element => {
          console.log(element.symbol);
          console.log(element.open);
          console.log(element.open);
          let signal = this.calculation(element.open, element.ltP)
          this.StockListDetails.push({ "symbol": element.symbol, "open": element.open, "high": element.high, "low": element.low, "ltP": element.ltP, "previousClose": element.previousClose, "target1": signal[0].lineValue, "target2": signal[1].lineValue, "target3": signal[2].lineValue, "signal": signal[0].label })
        });
      });
    // });
    console.log(this.StockListDetails);

    //this.skntraderService.getLoser()
    // this.skntraderService.getLoser().subscribe((res) => {
    //   this.loserList = res
    // });

  }
  clickToStock(id,openPrice) {
    this.stockName = id;
    this.skntraderService.getData(id).subscribe(async (res) => {

      //https://www.charanwings.com/gann-intraday-calculator
      // https://beta.nseindia.com/api/chart-databyindex?index=ZEELEQN
      //https://observablehq.com/@d3/line-chart-with-tooltip
      this.chartData = res["grapthData"]
      this.data = []
      this.rate = openPrice;
      let today = new Date()
      await this.chartData.forEach((d, k) => {
        var dateVal = new Date(d[0])
        var date = new Date(d[0]).getHours() + ":" + new Date(d[0]).getMinutes() + ":" + new Date(d[0]).getSeconds()
        //if (date == "15:0:0"||date == "15:0:15"||date == "15:0:17"||date=="15:0:01") {
        // if (date == "14:45:0") {
        //   this.rate = d[1];
        // }
        let dataValue = new Date(d[0]).getHours() + new Date(d[0]).getMinutes() + new Date(d[0]).getSeconds()
        // this.data.push({ date: Math.round( d[0]), value: d[1] })
        this.data.push([dateVal, d[1]])
      });
      this.gann()
    });
  }
  gann() {
    let rate = this.rate;
    let substractNumber = 1;
    let squreVal = Math.floor(Math.sqrt(rate));
    let i;
    this.resistance = [], this.support = []
    for (squreVal > 1 && (substractNumber = squreVal - 1), i = 1; i <= 25; i++) {
      let matchVal = Math.floor(100 * Math.pow(substractNumber + .125 * (i - 1), 2)) / 100
      if (matchVal < rate) {
        this.resistance.push({ lineValue: matchVal, label: "Ressitance-" + matchVal })
        if (this.resistance.length > 3) {
          this.resistance.splice(0, 1)
        }
      }
      if (matchVal > rate) {
        this.support.push({ lineValue: matchVal, label: "Support-" + matchVal })
        if (this.support.length > 3) {
          this.support.pop()
        }
      }

      //console.log(Math.floor(100 * Math.pow(substractNumber + .125 * (i - 1), 2)) / 100)
    }

    this.resistance.push({ lineValue: this.rate, label: "Open Price-" + this.rate })
    // let squreFloorVal = Math.floor(100 * Math.pow(substractNumber + .125 * (i - 1), 2)) / 100
    console.log(this.rate + "---nath")
    // var l = Math.floor((Math.sqrt(rate) - Math.floor(Math.sqrt(rate))) / .125) + 1;
    // console.log(l + "---soura")
  }
  calculation(openPrice, currentPrice) {
    let ltp1 = []
    let ltp2 = []
    let rate = openPrice;
    let substractNumber = 1;
    let squreVal = Math.floor(Math.sqrt(rate));
    if (isNaN(squreVal)) {
      return "none"
    }
    let i;
    this.resistance = [], this.support = []
    for (squreVal > 1 && (substractNumber = squreVal - 1), i = 1; i <= 25; i++) {
      let matchVal = Math.floor(100 * Math.pow(substractNumber + .125 * (i - 1), 2)) / 100
      if (matchVal < rate) {
        ltp1.push({ lineValue: matchVal, label: "sell" })
        if (ltp1.length > 3) {
          ltp1.splice(0, 1)
        }
      }
      if (matchVal > rate) {
        ltp2.push({ lineValue: matchVal, label: "buy" })
        if (ltp2.length > 3) {
          ltp2.pop()
        }
      }
    }
    if (currentPrice > openPrice) {
      return ltp2
    } else {
      return ltp1.reverse()
    }
  }
}
