import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges } from '@angular/core';
import * as d3 from "d3";
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input("data") datum;
  @ViewChild('lineChart') private chartContainer: ElementRef;




  constructor(private hostRef: ElementRef) { }

  ngOnInit() {
    console.log(this.datum);
    this.createChart()
  }
  ngOnChanges() {
    console.log(this.datum);
    this.createChart()
  }
  createChart() {
    var data = []
    data = this.datum
    // this.datum.forEach((d, k) => {
    //   data.push({ date: (d[0]), value: d[1] })
    // });
    let el = this.chartContainer.nativeElement;
    // let viewportWidth = $(window).width();
    // let divWidth = $(this.hostRef.nativeElement).parent().width();
    d3.select(el).selectAll("*").remove();
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // parse the date / time
    //var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
      .x(function (d) { return x(d["value"]); })
      .y(function (d) { return y(Number(d["value"])); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(el).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.date; }))
      .range([0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    var today = new Date();
    var dd = today.getDate();    //<<===== no need
    var mm = today.getMonth() + 1; //January is 0!   //<<===== no need
    var yyyy = today.getFullYear();  //<<===== no need


    svg.append("line")
      .attr("x1",1)  //<<== change your code here
      .attr("y1", 300)
      .attr("x2", 2000)  //<<== and here
      .attr("y2", 300)
      .style("stroke-width", 2)
      .style("stroke", "red")
      .style("fill", "none");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([d3.min(data, function (d) { return d.value; }), d3.max(data, function (d) { return d.value; })])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(Number(d["date"])) })
        .y(function (d) { return y(d["value"]) })
      )

  }
}
