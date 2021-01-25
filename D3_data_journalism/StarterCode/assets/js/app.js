// @TODO: YOUR CODE HERE!
// Name: Shanil Lobanwala
// Date: Jan 23, 2020
// Project Name: D3-Challenge
// File: Main logic/app.js

//---------------------------------------------------------------------------------------------------------------------
// Create the svg dimensions and margins
var widthPreMargins = 960;

var heightPreMargins = 500;

var svgMargins = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var widthPostMargins = widthPreMargins - svgMargins.left - svgMargins.right;

var heightPostMargins = heightPreMargins - svgMargins.top - svgMargins.bottom;

// Put it all together/ wrap it up to hold the chart and fix the corners with the margin
//var svgWrapper = d3.select("#scatter").append("svg").attr("width", widthPreMargins).attr("height", heightPreMargins);
var svgWrapper = d3.select("#scatter").append("svg").attr("width", widthPreMargins).attr("height", heightPreMargins).append("g").attr("transform", "translate(" + svgMargins.left + "," + svgMargins.top + ")");

// svg group to smash together the different elements
//var svgChartGroup = svgWrapper.append("g").attr("transform", `translate(${svgMargins.left}, ${svgMargins.top})`);
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
  console.log(data);
  // All the data in nice objects
  // console.log(data);

  // Start manipulating the chart with the data.
  // create the x linearscales and y linearscales
  // var xLinScale = d3.scaleLinear().domain([8, d3.max(data, function(d){
  //   return +d.poverty;
  // })]).range([0, widthPostMargins]);
  //
  //
  // var yLinScale = d3.scaleLinear().domain([2, d3.max(data, function(d){
  //   return +d.healthcare;
  // })]).range([heightPostMargins, 0]);

  var xLinScale = d3.scaleLinear()
    .domain([8, d3.max(data,function(d){
    return +d.poverty;
    })])
    .range([0, widthPostMargins]);

  var yLinScale = d3.scaleLinear()
    .domain([2, d3.max(data,function(d){
    return +d.healthcare;
    })])
    .range([heightPostMargins, 0]);

  // We need the xy axis aka bottom and left using the linear scales ^^^
  var bottomAxis = d3.axisBottom(xLinScale);
  var leftAxis = d3.axisLeft(yLinScale);


  // Scale it by domain
  // xMin = d3.min(data, function(data) {
  //   return +data.poverty * 0.95;
  // });
  //
  // xMax = d3.min(data, function(data) {
  //   return +data.poverty * 1.05;
  // });
  //
  // yMin = d3.min(data, function(data) {
  //   return +data.healthcare * 0.98;
  // });
  //
  // yMax = d3.min(data, function(data) {
  //   return +data.healthcare * 1.02;
  // });

  // xLinScale.domain([xMin, yMax]);
  // yLinScale.domain([yMin, xMax]);

  // Set up toolTip
  var svgToolTip = d3.tip().attr("class", "tooltip").offset([80, -60]).html(function(data) {
    var stateName = data.state;
    var pov = +data.poverty;
    var hc = +data.healthcare;
    return(
      stateName+ '<br> Poverty: ' + pov + '% <br> healthcare: ' + hc + '%'
    );
  });

  // Call the toolTip that we just set up
  svgChartGroup.call(svgToolTip);
  // append the axises to our svgChartGroup
  // svgChartGroup.append("g").attr("transform", `translate(0, ${heightPostMargins})`).call(xAxis);
  // svgChartGroup.append("g").call(yAxis);

  // Add the data to the chart, make them circles as in the prompt
  svgChartGroup.selectAll("circle").data(data).enter().append("circle")
  .attr("cx", function(data, index){
    return xLinScale(data.poverty);
  })
  .attr("cy", function(data, index){
    return yLinScale(data.healthcare);
  }).attr("r", "15").attr("fill", "blue")
  .on("mouseover", function(data) {
    svgToolTip.show(data, this);
  })
  .on("mouseout", function(data, index) {
    svgToolTip.hide(data, this);
  });

  // Display the state abbreviations on the points
  // svgChartGroup.selectAll("text").data(data).enter().append("text")
  // .attr("x", (d,i) => xLinScale(d.poverty))
  // .attr("y", d => (yLinScale(d.healthcare-0.28)))
  // .classed("stateText", true)
  // .text(d => d.abbr)
  // .on("mouseover", function(d) {
  //   toolTip.show(d);
  // })
  // .on("mouseout", function(d, i) {
  //   toolTip.hide(d);
  // });
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

  svgChartGroup.append("g").attr("transform", `translate(0, ${heightPostMargins})`).call(bottomAxis);

  svgChartGroup.append("g").call(leftAxis);

  // Append y axis label
  svgChartGroup.append("text").attr("transform", "rotate(-90)").attr("y", 0-svgMargins.left).attr("x", 0-heightPostMargins/2).attr("dy", "1em").attr("class", "axis-text").text("Healthcare (%)");
  // Append x axis
  svgChartGroup.append("text").attr("transform", "translate(" + widthPostMargins / 2 + " ," + (heightPostMargins + svgMargins.top + 30) + ")").attr("class", "axis-text").text("Poverty (%)");



  // x labels
  // svgChartGroup.append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("y", 0 - widthPostMargins.left)
  //   .attr("x", 0 - heightPostMargins / 2)
  //   .attr("dy", "1em")
  //   .classed("aText", true)
  //   .attr("data-axis-name", "healthcare")
  //   .text("Lacks Healthcare(%)");
  //
  //   // y labels
  //   svgChartGroup.append("text")
  //   .attr("transform", "translate(" + widthPostMargins / 2 + " ," + (heightPostMargins + svgMargins.top + 20) + ")")
  //   .attr("data-axis-name", "poverty")
  //   .classed("aText", true)
  //   .text("In Poverty (%)");
  //
  //
  //
  // // ToolTip
  // var toolTip = d3.tip().attr("class", "tooltip").offset([-10, 30]).html(function(d) {
  //   return (`${d.abbr}<br>Healthcare (%): ${d.healthcare}%<br>Poverty: ${d.poverty}`);
  // });
  //
  //
  // // Integrate ToolTip into chart
  // svgChartGroup.call(toolTip);
  //
  // // Event listener for display and hide of ToolTip
  // chartData.on("mouseover", function(d) {
  //   toolTip.show(d);
  // })
  // .on("mouseout", function(d, i){
  //   toolTip.hide(d);
  // });

});
