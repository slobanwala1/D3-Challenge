// @TODO: YOUR CODE HERE!
// Name: Shanil Lobanwala
// Date: Jan 23, 2020
// Project Name: D3-Challenge
// File: Main logic/app.js

//---------------------------------------------------------------------------------------------------------------------
// Create the svg dimensions and margins
var widthPreMargins = 800;

var heightPreMargins = 500;

var svgMargins = {
  top: 30,
  right: 35,
  bottom: 85,
  left: 55
};

var widthPostMargins = widthPreMargins - svgMargins.left - svgMargins.right;

var heightPostMargins = heightPreMargins - svgMargins.top - svgMargins.bottom;

// Put it all together/ wrap it up to hold the chart and fix the corners with the margin
var svgWrapper = d3.select("#scatter").append("svg").attr("width", widthPreMargins).attr("height", heightPreMargins);

// svg group to smash together the different elements
var svgChartGroup = svgWrapper.append("g").attr("transform", `translate(${svgMargins.left}, ${svgMargins.top})`);
//---------------------------------------------------------------------------------------------------------------------
// Read csv in
d3.csv("assets/data/data.csv", function(data){

  // Convert poverty value and healthcare to int instead of string aka = +(string)
  data.poverty = +data.poverty;
  data.healthcare = +data.healthcare;
  return data;
}).then(function(data){
  // All the data in nice objects
  // console.log(data);

  // Start manipulating the chart with the data.
  // create the x linearscales and y linearscales
  var xLinScale = d3.scaleLinear().domain([9, d3.max(data, function(d){
    return +d.poverty;
  })]).range([0, widthPostMargins]);


  var yLinScale = d3.scaleLinear().domain([3, d3.max(data, function(d){
    return +d.healthcare;
  })]).range([heightPostMargins, 0]);

  // We need the xy axis aka bottom and left using the linear scales ^^^
  var xAxis = d3.axisBottom(xLinScale);
  var yAxis = d3.axisLeft(yLinScale);

  // append the axises to our svgChartGroup
  svgChartGroup.append("g").attr("transform", `translate(0, ${heightPostMargins})`).call(xAxis);
  svgChartGroup.append("g").call(yAxis);
})
