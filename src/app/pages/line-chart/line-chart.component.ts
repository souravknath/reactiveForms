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


  @Input("resistance") resistance;
  @Input("support") support;


  constructor(private hostRef: ElementRef) { }

  ngOnInit() {
    console.log(this.datum);
    this.createChart1()
  }
  ngOnChanges() {
    console.log(this.datum);
    this.createChart1()
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
    var xDomain = d3.extent(data, function (d) { return new Date(d.date); })
    var yDomain = d3.extent(data, function (d) { return d.value; });
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]).domain(yDomain);

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
      .domain(xDomain)
      .range([0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));





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

    svg.append("line")
      .attr('x1', x(xDomain[0]))
      .attr('y1', y(2050))
      .attr('x2', x(xDomain[1]))
      .attr('y2', y(2050))
      .style("stroke-width", 2)
      .style("stroke", "red")
      .style("fill", "none")

  }
  createChart1() {

    // var data = [];
    // var currentValue = 100;
    // var random = d3.randomNormal(0, 20.0);

    // for(var i=0; i<100; i++) {
    //     var currentDate = new Date();
    //     currentDate.setDate(currentDate.getDate() + i);

    //     data.push([currentDate, currentValue]);
    //     currentValue = currentValue + random();
    // }
    var el = this.chartContainer.nativeElement;

    var drawLineGraph = function (containerHeight, containerWidth, data, yLabel, resistance,support) {

      // let viewportWidth = $(window).width();
      // let divWidth = $(this.hostRef.nativeElement).parent().width();
      d3.select(el).selectAll("*").remove();
      var svg = d3.select(el).append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight);

      var margin = { top: 50, left: 50, right: 50, bottom: 50 };

      var height = containerHeight - margin.top - margin.bottom;
      var width = containerWidth - margin.left - margin.right;

      var xDomain = d3.extent(data, function (d) { return Number(d[0]); })
      var yDomain = d3.extent(data, function (d) { return Number(d[1]); });

      var xScale = d3.scaleTime().range([0, width]).domain(xDomain);
      var yScale = d3.scaleLinear().range([height, 0]).domain(yDomain);

      var xAxis = d3.axisBottom(xScale);
      var yAxis = d3.axisLeft(yScale);

      var line = d3.line()
        .x(function (d) { return xScale(d[0]); })
        .y(function (d) { return yScale(d[1]); });

      var area = d3.area()
        .x(function (d) { return xScale(d[0]); })
        .y0(function (d) { return yScale(d[1]); })
        .y1(height);

      var g = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      g.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', area);

      g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);

      g.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .attr('text-anchor', 'end')
        .text(yLabel);

      g.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);

      // g.selectAll('circle').data(data).enter().append('circle')
      //     .attr('cx', function(d) { return xScale(d[0]); })
      //     .attr('cy', function(d) { return yScale(d[1]); })
      //     .attr('r', 5)
      //     .attr('class', 'circle');

      // focus tracking

      var focus = g.append('g').style('display', 'none');

      focus.append('line')
        .attr('id', 'focusLineX')
        .attr('class', 'focusLine');
      focus.append('line')
        .attr('id', 'focusLineY')
        .attr('class', 'focusLine');
      focus.append('circle')
        .attr('id', 'focusCircle')
        .attr('r', 5)
        .attr('class', 'circle focusCircle');

      var bisectDate = d3.bisector(function (d) { return d[0]; }).left;

      g.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', function () { focus.style('display', null); })
        .on('mouseout', function () { focus.style('display', 'none'); })
        .on('mousemove', function () {
          var mouse = d3.mouse(this);
          var mouseDate = xScale.invert(mouse[0]);
          var i = bisectDate(data, mouseDate); // returns the index to the current data item

          var d0 = data[i - 1]
          var d1 = data[i];
          // work out which date value is closest to the mouse
          var d = Number(mouseDate) - d0[0] > d1[0] - Number(mouseDate) ? d1 : d0;

          var x = xScale(d[0]);
          var y = yScale(d[1]);

          focus.select('#focusCircle')
            .attr('cx', x)
            .attr('cy', y);
          focus.select('#focusLineX')
            .attr('x1', x).attr('y1', yScale(yDomain[0]))
            .attr('x2', x).attr('y2', yScale(yDomain[1]));
          focus.select('#focusLineY')
            .attr('x1', xScale(xDomain[0])).attr('y1', y)
            .attr('x2', xScale(xDomain[1])).attr('y2', y);
        });

      // warn line

      // if(warnLine && yDomain[0] < warnLine.lineValue && yDomain[1] > warnLine.lineValue) {
      resistance.forEach((val,key) => {
        setTimeout(() => {
          g.append('line')
          .attr('x1', xScale(xDomain[0]))
          .attr('y1', yScale(val.lineValue))
          .attr('x2', xScale(xDomain[1]))
          .attr('y2', yScale(val.lineValue))
          .attr('class', 'zeroline');
        g.append('text')
          .attr('x', xScale(xDomain[1]))
          .attr('y', yScale(val.lineValue))
          .attr('dy', '1em')
          .attr('text-anchor', 'end')
          .text(val.label)
          .attr('class', 'zerolinetext');
        }, 200);
       
      });
      console.log(resistance);
      console.log(support);
      
      support.forEach((val,key) => {
        setTimeout(() => {
        g.append('line')
          .attr('x1', xScale(xDomain[0]))
          .attr('y1', yScale(val.lineValue))
          .attr('x2', xScale(xDomain[1]))
          .attr('y2', yScale(val.lineValue))
          .attr('class', 'zeroline');
        g.append('text')
          .attr('x', xScale(xDomain[1]))
          .attr('y', yScale(val.lineValue))
          .attr('dy', '1em')
          .attr('text-anchor', 'end')
          .text(val.label)
          .attr('class', 'zerolinetext');
        },500)
      });
      // }
      // if(warnLine && yDomain[0] < warnLine.lineValue && yDomain[1] > warnLine.lineValue) {
      //     g.append('line')
      //         .attr('x1', xScale(xDomain[0]))
      //         .attr('y1', yScale(warnLine.lineValue))
      //         .attr('x2', xScale(xDomain[1]))
      //         .attr('y2', yScale(warnLine.lineValue))
      //         .attr('class', 'zeroline');
      //     g.append('text')
      //         .attr('x', xScale(xDomain[1]))
      //         .attr('y', yScale(warnLine.lineValue))
      //         .attr('dy', '1em')
      //         .attr('text-anchor', 'end')
      //         .text(warnLine.label)
      //         .attr('class', 'zerolinetext');
      // }
    };

    drawLineGraph(400, 800, this.datum, "Intensity",this.resistance, this.support);
  }
}
