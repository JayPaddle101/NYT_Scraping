// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {

  console.log(genericHitsData);
  
// Filter the data for the year 2020 and sort by month
var data2020 = genericHitsData
.filter(function (d) { return d.fields.year === 2021; })
.map(function (d) { return { month: d.fields.month, hits: d.fields.hits }; })
.sort(function(a, b) { return a.month - b.month; }); // Sort by month

// Setup SVG canvas and margins
var svg = d3.select("svg"),
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

// Define the scales for the x and y axes
var x = d3.scalePoint().rangeRound([0, width]).padding(0.5),
  y = d3.scaleLinear().rangeRound([height, 0]);

// Create the axes
var g = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Find the maximum number of hits and add 5
var maxHits = d3.max(data2020, function (d) { return d.hits; }) + 5;

// Set the domains for the axes
x.domain(data2020.map(function (d) { return d.month; }));
y.domain([0, maxHits]);

// Define the line
var line = d3.line()
.x(function(d) { return x(d.month); })
.y(function(d) { return y(d.hits); });

// Draw the line
g.append("path")
.datum(data2020)
.attr("fill", "none")
.attr("stroke", "steelblue")
.attr("stroke-linejoin", "round")
.attr("stroke-linecap", "round")
.attr("stroke-width", 1.5)
.attr("d", line);

// Draw the x-axis
g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickFormat(function(d) { return '2020-' + (d < 10 ? '0' : '') + d; }));

// Draw the y-axis
g.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(y).ticks(maxHits))
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .text("Hits");

// Draw the scatter plot points
g.selectAll(".dot")
.data(data2020)
.enter().append("circle")
  .attr("class", "dot")
  .attr("r", 5)
  .attr("cx", function (d) { return x(d.month); })
  .attr("cy", function (d) { return y(d.hits); })
  .style("fill", "#4285F4");

// Add the x-axis title
svg.append("text")             
.attr("transform",
    "translate(" + (width/2 + margin.left) + " ," + 
    (height + margin.top + 40) + ")") // Adjust position as needed
.style("text-anchor", "middle")
.attr("class", "axis-title")
.text("Months and Years");

// Add the y-axis title
svg.append("text")
.attr("transform", "rotate(-90)")
.attr("class", "axis-title")
.attr("y", 0 + margin.left)
.attr("x",0 - (height / 2))
.attr("dy", "-1.6em") // Adjust position as needed
.style("text-anchor", "middle")
.text("NYT Hits for Metaverse");



});
   


