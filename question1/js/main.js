$(document).ready(function(){
    $("#search").submit(function(event){
        event.preventDefault();
        var name = $(".form-control").val();
        var url="https://api.angel.co/1/search?query="+name+"&type=User";

        $.ajax({
            type: "GET",
            url: url,
            dataType: 'jsonp',
            success: function(data)
            {
                var len = Object.keys(data).length;
                var users = new Array();

                if(len> 5) {
                    for( i = 0; i < 5; i++) {
                        users.push(data[i].name.toUpperCase())
                    }
                }else {
                    for(i = 0; i < len; i++){
                        users.push(data[i].name.toUpperCase())

                    }
                }
                console.log(users);
                var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                console.log("HERE");
                var output = []
                for(i=0;i < 26; i++){
                    output.push({ x:str[i],y:0})
                }
                output.push({x:"Other",y:0})
                

                for(i=0;i< 5;i++){
                    var name = users[i]
                    console.log(name)
                    for(j=0;j<name.length;j++){
                        if(str.indexOf(name[j]) == -1){
                            output[26].y += 1
                        }else {
                            output[str.indexOf(name[j])].y += 1
                        }
                    }
                }
                
                var jsonobj = JSON.stringify(output)
                
                var margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1)
                    .domain(data.map(function(d) {return d.x;}));


                var y = d3.scale.linear()
                    .range([height, 0])
                    .domain([0, d3.max(data, function(d) { return d.y; })]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(1);

                var svg = d3.select("body").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
                svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

                  svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                    .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 6)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text("Frequency");

                  svg.selectAll(".bar")
                      .data(output)
                    .enter().append("rect")
                      .attr("class", "bar")
                      .attr("x", function(d) { 
                        return x(d.x); })
                      .attr("width", x.rangeBand())
                      .attr("y", function(d) { 
                        console.log(d.y)
                        return d.y; })
                      .attr("height", function(d) { return d.y; });

                

                function type(d) {
                  d.frequency = +d.frequency;
                  return d;
                }
                        }
                    });
                    
        });
});