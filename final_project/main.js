// get the content of the csv 
d3.csv("data.csv", function(data) {
    data.forEach(function(d) {
        d.size = +d.Frequency;
    });
    
  //sorts the array by the most repeated word
  jsu.sortBy(data, { prop: "size", desc: true });
  var w = 1024, h = 512,
    maxFont = 96,
    maxSize = data[0].size || 1,
    sizeOffset = maxFont / maxSize;

  var fill = d3.scale.category20b(),
    layout = d3.layout.cloud()
    .size([w, h])
    .words(data)
    .spiral("rectangular")
    .rotate(function () { return (~~(Math.random() * 2) * -30) || 60; })
    //.text(function (d) { return d.text; })
    .font("Impact")
    .fontSize(function (d) {
        return Math.max(20, Math.min(d.size * sizeOffset, maxFont));
    })
    .on("end", onDraw);
  layout.start();

  //callback fired when all words have been placed
  function onDraw() {
      var svg = d3.select("#tag-cloud-wrapper").append("svg").attr({ width: w, height: h, "id": "svg-node" }),
          vis = svg.append("g").attr("transform", "translate(" + [w >> 1, (h >> 1) - 10] + ")scale(2)");
      var text = vis.selectAll("text").data(data);
      text.enter().append("text")
          .style("font-family", function (d) { return d.font; })
          .style("font-size", function (d) { return d.size + "px"; })
          .style("fill", function (d, i) { return fill(i); })
          .style({ cursor: "pointer", opacity: 1e-6 })
          .attr("text-anchor", "middle")
          .attr("transform", function (d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function (d) { return d.text; })
          .on("click", function (d) {
              //[this] is the <text> element of svg
              var show = !this.classList.contains("current");
              toogleFade.apply(this, [show, d]);
          })
          .transition()
              .duration(1000)
              .style("opacity", 1);
      vis.transition()
          .delay(450)
          .duration(750)
          .attr("transform", "translate(" + [w >> 1, (h >> 1) + 10] + ")scale(1)");
  }//end onDraw
  
  //determines wheter to show or hide the elements in svg
  function toogleFade(show, d) {
    var element = d3.select(this),
        svg = d3.select("#svg-node"),
        time1 = 700,
        time2 = 1000;
    show = !!show;
    element.attr({ "class": show ? "current" : null, "data-role": "animation" })
      .transition()
      .duration(time1)
      .attr("transform", "translate(" + [d.x, d.y] + ")rotate(" + (show ? 0 : d.rotate) + ")scale(" + (+!show || 3) + ")")
      .each("end", function() { 
        show && setTimeout(function() { 
          alert("tag: " + d.text);
        }, time2 - time1);
      });
    svg.selectAll("text:not([data-role='animation'])")
      .transition()
      .duration(time2)
      .style("opacity", +!show)
      .style("visibility", show ? "hidden" : "visible")
      .each("end", function() { element.attr("data-role", null); });
  }//end toogleFade
  
});