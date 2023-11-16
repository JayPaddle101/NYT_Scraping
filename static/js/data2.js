// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {

  console.log(genericHitsData);
  
  const aboutLink = document.getElementById('about-link');
  const aboutModal = document.getElementById('about-modal');
  const closeModal = document.getElementById('close-modal');

  aboutLink.addEventListener('click', (e) => {
      //e.preventDefault();
      aboutModal.style.display = 'block'; // Show the modal
  });

  closeModal.addEventListener('click', () => {
      aboutModal.style.display = 'none'; // Hide the modal when close button is clicked
  });
    
    // Parse the month and year into a date
    var parseDate = d3.timeParse("%Y-%m");
  
    // Convert the month and year into a JavaScript date
    var data = genericHitsData.map(function (d) {
      return {
        date: parseDate(d.fields.year + '-' + ("0" + d.fields.month).slice(-2)),
        hits: d.fields.hits
      };
    });
  
    // Sort by date
    data.sort(function(a, b) { return d3.ascending(a.date, b.date); });
  
    // Setup SVG canvas and margins
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
  
    // Define the scales for the x and y axes
    var x = d3.scaleTime().rangeRound([0, width]),
        y = d3.scaleLinear().rangeRound([height, 0]);
  
    // Create the axes
    var g = svg.append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    // Find the maximum number of hits and add 5
    var maxHits = d3.max(data, function (d) { return d.hits; }) + 5;
  
    // Set the domains for the axes
    x.domain(d3.extent(data, function (d) { return d.date; }));
    y.domain([0, maxHits]);
  
    // Define the line
    var line = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.hits); });
  
    // Draw the line
    g.append("path")
      .datum(data)
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
        .call(d3.axisBottom(x));
  
    // Define the maximum y-value rounded up to the nearest 5
    var maxYValue = Math.ceil(maxHits / 5) * 5;
    // Generate an array of tick values at intervals of 5
    var yTickValues = d3.range(0, maxYValue + 1, 5);
  
    // Draw the y-axis with specified tick values
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).tickValues(yTickValues))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Hits");
  
    // Select the tooltip div
    var tooltip = d3.select("#tooltip");
  
    // Define the mouseover and mouseout functions
    function mouseover(event, d) {
      // Select the current dot and change its color
      d3.select(this)
      .transition()
      .duration(100) // Short duration for smooth color transition
      .style("fill", "orange"); // Change to the desired color for hover
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html("Month: " + (d.date.getMonth() + 1) + "<br/>Hits: " + d.hits)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 28) + "px");
    }
  
    function mouseout() {
      // Revert the dot color back to the original
      d3.select(this)
      .transition()
      .duration(100) // Short duration for smooth color transition
      .style("fill", "#4285F4"); // Change back to the original color
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    }
  
    // Draw the scatter plot points with mouseover and mouseout events
    g.selectAll(".dot")
    .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", function (d) { return x(d.date); })
      .attr("cy", function (d) { return y(d.hits); })
      .style("fill", "#4285F4")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);
  
    // Add the x-axis title
    svg.append("text")             
      .attr("transform",
          "translate(" + (width/2 + margin.left) + " ," + 
          (height + margin.top + 40) + ")")
      .style("text-anchor", "middle")
      .attr("class", "axis-title")
      .text("Months and Years");
  
    // Add the y-axis title
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "axis-title")
      .attr("y", 0 + margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "-1.6em")
      .style("text-anchor", "middle")
      .text("NYT Hits for Apple and Spatial Computer");
  
  
  });
     
  
  