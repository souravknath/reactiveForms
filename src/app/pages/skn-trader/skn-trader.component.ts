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
        // var date = new Date(d[0])
        var date = new Date(d[0]).getHours() + ":" + new Date(d[0]).getMinutes() + ":" + new Date(d[0]).getSeconds()
        if (date == "15:0:0") {
          this.rate = d[1];
        }
        let dataValue =new Date(d[0]).getHours() + new Date(d[0]).getMinutes()+new Date(d[0]).getSeconds()
        this.data.push({ date: Math.round( d[0]), value: d[1] })
      });
      this.gann()
      this.createChart()

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
        this.resistance.push(matchVal)
      } else {
        this.support.push(matchVal)
      }
      //console.log(Math.floor(100 * Math.pow(substractNumber + .125 * (i - 1), 2)) / 100)
    }
    // let squreFloorVal = Math.floor(100 * Math.pow(substractNumber + .125 * (i - 1), 2)) / 100
    console.log(this.rate + "---nath")
    // var l = Math.floor((Math.sqrt(rate) - Math.floor(Math.sqrt(rate))) / .125) + 1;
    // console.log(l + "---soura")
  }
  createChart() {

    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 1000 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(this.data, function (d) { return d.date; }))
      .range([0, width]);
      
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([d3.min(this.data, function (d) { return d.value; }), d3.max(this.data, function (d) { return d.value; })])
      .range([height,0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(Number(d["date"])) })
        .y(function (d) { return y(d["value"]) })
      )
  }
}
