import { Component, OnInit } from '@angular/core';
import { SknTraderService } from 'src/app/services/skn-trader.service';
import * as d3 from "d3";
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

  constructor(public skntraderService: SknTraderService) { }

  ngOnInit() {
    this.skntraderService.get_products().subscribe((res) => {
      this.ganerList = res
      console.log(res);
    });

  }
  clickToStock(id) {
    this.skntraderService.getData(id).subscribe(async (res) => {

      //https://www.charanwings.com/gann-intraday-calculator
      // https://beta.nseindia.com/api/chart-databyindex?index=ZEELEQN
      //https://observablehq.com/@d3/line-chart-with-tooltip
      this.chartData = res["grapthData"]
      this.data = []
      this.rate = 0;
      let today = new Date()
      await this.chartData.forEach((d, k) => {
        var dateVal = new Date(d[0])
        var date = new Date(d[0]).getHours() + ":" + new Date(d[0]).getMinutes() + ":" + new Date(d[0]).getSeconds()
        if (date == "15:0:0") {
          this.rate = d[1];
        }
        let dataValue = new Date(d[0]).getHours() + new Date(d[0]).getMinutes() + new Date(d[0]).getSeconds()
        // this.data.push({ date: Math.round( d[0]), value: d[1] })
        this.data.push([dateVal, d[1]])
      });
      this.gann()
      //this.createChart()

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
        if (this.resistance.length < 4) {
          if (this.resistance.length == 0) {
            this.resistance.push({ lineValue: matchVal, label: "Open Price" })
          } else if (this.resistance.length == 1) {
            this.resistance.push({ lineValue: matchVal, label: "Below sell" })
          } else {
            this.resistance.push({ lineValue: matchVal, label: "Support" + i })
          }
        }

      } else {
        if (this.support.length < 4) {
          if (this.support.length == 0) {
            this.support.push({ lineValue: matchVal, label: "Open Price" })
          } else if (this.support.length == 1) {
            this.support.push({ lineValue: matchVal, label: "Above buy" })
          } else {
            this.support.push({ lineValue: matchVal, label: "Ressitance" + i })
          }
        }
      }
      //console.log(Math.floor(100 * Math.pow(substractNumber + .125 * (i - 1), 2)) / 100)
    }
    // let squreFloorVal = Math.floor(100 * Math.pow(substractNumber + .125 * (i - 1), 2)) / 100
    console.log(this.rate + "---nath")
    // var l = Math.floor((Math.sqrt(rate) - Math.floor(Math.sqrt(rate))) / .125) + 1;
    // console.log(l + "---soura")
  }

}
