// @TODO: YOUR CODE HERE!
// Name: Shanil Lobanwala
// Date: Jan 23, 2020
// Project Name: D3-Challenge
// File: Main logic/app.js

//---------------------------------------------------------------------------------------------------------------------
// Create the svg dimensions and margins
var widthPreMargins = 1200;

var heightPreMargins = 800;

var svgMargins = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var widthPostMargins = widthPreMargins - svgMargins.left - svgMargins.right;

var heightPostMargins = heightPreMargins - svgMargins.top - svgMargins.bottom;

// Put it all together/ wrap it up to hold the chart and fix the corners with the margin
var svgWrapper = d3.select("#scatter").append("svg").attr("width", widthPreMargins).attr("height", heightPreMargins).append("g").attr("transform", "translate(" + svgMargins.left + "," + svgMargins.top + ")");

// svg group to smash together the different elements
var svgChartGroup = svgWrapper.append("g");

d3.select("#scatter").append("div").attr("class", "tooltip").style("opacity", 0);
//---------------------------------------------------------------------------------------------------------------------
// Read csv in
d3.csv("assets/data/data.csv", function(healthData){

  // Convert poverty value and healthcare to int instead of string aka = +(string)
  healthData.poverty = +healthData.poverty;
  healthData.healthcare = +healthData.healthcare;
  return healthData;
}).then(function(data){
  // Check loaded data
  // console.log(data);

  // Set the linear scales so that the circles are displayed properly
  var xLinScale = d3.scaleLinear()
    .domain([8, d3.max(data,function(d){
    return +d.poverty;
    })])
    .range([0, widthPostMargins]);

  var yLinScale = d3.scaleLinear()
    .domain([0, d3.max(data,function(d){
    return +d.healthcare;
    })])
    .range([heightPostMargins, 0]);


  // The bottoms of the axis's
  var bottomAxis = d3.axisBottom(xLinScale);
  var leftAxis = d3.axisLeft(yLinScale);

  // Set up toolTip
  var svgToolTip = d3.tip().attr("class", "d3-tip").offset([80, -60]).html(function(data) {
    var stateName = data.state;
    var pov = +data.poverty;
    var hc = +data.healthcare;
    return(
      stateName+ '<br> Poverty: ' + pov + '% <br> healthcare: ' + hc + '%'
    );
  });

  // Call the toolTip that we just set up
  svgChartGroup.call(svgToolTip);

  // Add the data to the chart, make them circles as in the prompt, add in the mouse events
  svgChartGroup.selectAll("circle").data(data).enter().append("circle")
  .attr("cx", function(data, index){
    return xLinScale(data.poverty);
  })
  .attr("cy", function(data, index){
    return yLinScale(data.healthcare);
  }).attr("r", "15").attr("fill", "lightblue")
  .on("mouseover", function(data) {
    svgToolTip.show(data, this);
  })
  .on("mouseout", function(data, index) {
    svgToolTip.hide(data, this);
  });

  svgChartGroup.append("text").style("text-anchor", "middle").style("font-size", "12px").selectAll("tspan").data(data).enter().append("tspan")
  .attr("x", function(data) {
    return xLinScale(data.poverty-0);
  })
  .attr("y", function(data) {
    return yLinScale(data.healthcare - 0.2);
  })
  .text(function(data) {
    return data.abbr;
  })

  // Append the x and y axis's to the chart
  svgChartGroup.append("g").classed("x-axis", true).attr("transform", `translate(0, ${heightPostMargins})`).call(bottomAxis);

  svgChartGroup.append("g").call(leftAxis);

  // Append y axis label
  svgChartGroup.append("text").attr("transform", "rotate(-90)").attr("y", 0-svgMargins.left).attr("x", 0-heightPostMargins/2).attr("dy", "1em").attr("class", "axis-text").text("Healthcare (%)");
  // Append x axis label
  svgChartGroup.append("text").attr("transform", "translate(" + widthPostMargins / 2 + " ," + (heightPostMargins + svgMargins.top + 30) + ")").attr("class", "axis-text").text("Poverty (%)");

});
