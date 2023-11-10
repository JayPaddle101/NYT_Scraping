// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function (){

    // Example usage
    console.log(appleScHitsData);
    console.log(metaMetaverseHitsData);

    // Assuming you have already parsed the JSON data and it looks like this
    var appleScHitsData = { "date": "2023-06", "hits": 10 };
    var metaMetaverseHitsData = { "date": "2021-10", "hits": 25 };

    // Prepare the data
    var data = [
    { company: "Apple", hits: appleScHitsData.hits },
    { company: "Facebook", hits: metaMetaverseHitsData.hits }
    ];

    // Setup SVG canvas and margins
    var svg = d3.select("svg"),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    // Create the axes
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.3),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Find the maximum number of hits and add 5
    var maxHits = d3.max(data, function(d) { return d.hits; }) + 5;

    // Set the domains for the axes
    x.domain(data.map(function(d) { return d.company; }));
    y.domain([0, maxHits]);

    // Draw the bars
    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.company); })
    .attr("y", function(d) { return y(d.hits); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.hits); });

    // Draw the x-axis
    g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // Draw the y-axis
    g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left)
    .attr("x", -height / 2) // This positions the title in the middle of the axis
    .attr("dy", "1em") // Adjust this for proper spacing
    .attr("text-anchor", "middle")
    .text("Number of Hits")
    .style("font-size", "15px") // Adjust font size as needed
    .style("font-family", "'Dosis', sans-serif")
    .style("fill", "#333"); // Adjust text color as needed

    // Add style for the bars
    d3.selectAll(".bar")
    .style("fill", function(d) { return d.company === "Apple" ? "#4285F4" : "#32a852"; }); 

})