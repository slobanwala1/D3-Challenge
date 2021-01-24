// @TODO: YOUR CODE HERE!
// Name: Shanil Lobanwala
// Date: Jan 23, 2020
// Project Name: D3-Challenge
// File: Main logic/app.js


// Read csv in
d3.csv("assets/data/data.csv", function(data){

  // Convert poverty value and healthcare to int instead of string aka = +(string)
  data.poverty = +data.poverty;
  data.healthcare = +data.healthcare;
  return data;
}).then(function(data){
  // All the data in nice objects
  // console.log(data);
})

// Create the svg
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
