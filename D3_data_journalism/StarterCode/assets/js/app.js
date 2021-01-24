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
  console.log(data.poverty);
  return data;
}).then(function(data){
  // All the data in nice objects
  // console.log(data);
})



// Scalable Vector Graphics setup(svg)
var svgWidth = 700;

var svgHeight = 400;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left:50
};

var width = svgWidth - margin.left - margin.right;
