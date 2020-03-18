d3.csv('data1.csv').then(function(data){
    data.forEach(function(d){
        d.Country = d.Country
        d.Cases = +d.Cases
        d.Deaths = +d.Deaths
    })

    console.log(data)

        //set the dimensions and margins of the graph
    var chart_width     =   800;
    var chart_height    =   400;
    var padding         =   50;

    // append the svg object to the body of the page
    var svg = d3.select(".fixed")
        .append("svg")
        .attr("width", chart_width)
        .attr("height", chart_height)

    // Create Scales
    var x_scale         =   d3.scaleLog()
        .domain([1, d3.max(data, function(d){
            return d.Cases;
        })])
        .range([ padding, chart_width - padding * 2 ])

    var y_scale         =   d3.scaleLog()
        .domain([ 1, d3.max(data, function(d){
            return d.Deaths;
        })])
        .range([ chart_height - padding, padding ]);

    // Clip Paths
    // Clip Paths
    svg.append('clipPath')
        .attr('id','plot-area-clip-path')
        .append('rect')
        .attr('x', padding)
        .attr('y', padding)
        .attr('width', chart_width - padding * 3)
        .attr( 'height', chart_height - padding * 2)

    // Create X-Axis
    var x_axis          =   d3.axisBottom( x_scale );

    svg.append( 'g' )
        .attr( 'class', 'x-axis' )
        .attr(
            'transform',
            'translate(0,' + (chart_height - padding ) + ')'
        )
        .call( x_axis )
        .call(g => g.selectAll('.tick')
            .attr('opacity', 0))
        .call(g => g.selectAll('.domain')
            .attr('opacity', 0))

    // text label for the x axis
    svg.append("text")
        .attr('id','label-x')             
        .attr("transform",
            "translate(" + (chart_width/2) + " ," + (chart_height) + ")")
        .style("text-anchor", "middle")
        .text("Number of Deaths")
        .style('color',  'rgb(87, 87, 87)')
        .style('font-family', "'Open Sans', sans-serif")
        .style('font-weight', 300)
        .style('font-size','14px')
        .style('opacity',0)
    

    // Create Y-axis
    var y_axis          =   d3.axisLeft( y_scale )
        .ticks( 5 );

    svg.append( 'g' )
        .attr( 'class', 'y-axis' )
        .attr(
            'transform',
            'translate( ' + padding + ', 0 )'
        )
        .call( y_axis )
        .call(g => g.selectAll('.tick')
            .attr('opacity', 0))
        .call(g => g.selectAll('.domain')
            .attr('opacity', 0));

    svg.append("text")
        .attr('id','label-y')
        .attr("transform", "rotate(-90)")
        .attr("y", -5)
        .attr("x",0 - (chart_height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Casualties")
        .style('font-family', "'Open Sans', sans-serif")
        .style('font-weight', 300)
        .style('font-size','14px')
        .style('opacity',0)

    // Create Circles
    svg.append( 'g' )
        .attr('id', 'plot-area')
        .attr('clip-path', 'url(#plot-area-clip-path)')
        .selectAll('circle')
        .data( data )
        .enter()
        .append( 'circle' )
        .attr("cx", function(d) {
            return x_scale(d.Cases);
        })
        .attr("cy", -chart_height -5)
        .attr("r", 10)
        .attr('opacity', .8)
        .attr( 'fill', '#002663');



    // Create Waypoins
    var waypoint = new Waypoint({
    element: document.getElementById('div2'),
    handler: function() {
        console.log('show x-axis')
        d3.selectAll('.x-axis .tick')
            .transition()
            .duration(500)
            .attr('opacity',1)
    },
    offset: '70%'
    })

    var waypoint = new Waypoint({
        element: document.getElementById('div2'),
        handler: function() {
            console.log('show x-axis')
            d3.selectAll('.x-axis .domain')
                .transition()
                .duration(500)
                .attr('opacity',1)
        },
        offset: '70%'
        })

    var waypoint = new Waypoint({
        element: document.getElementById('div2'),
        handler: function() {
            console.log('show label x')
            d3.selectAll('#label-x')
                .transition()
                .duration(500)
                .style('opacity',1)
        },
        offset: '70%'
        })

    var waypoint = new Waypoint({
    element: document.getElementById('div3'),
    handler: function() {
        console.log('show y-axis')
        d3.selectAll('.y-axis .tick')
            .transition()
            .duration(500)
            .attr('opacity',1)
    },
    offset: '70%'
    })

    var waypoint = new Waypoint({
        element: document.getElementById('div3'),
        handler: function() {
            console.log('show label x')
            d3.selectAll('#label-y')
                .transition()
                .duration(500)
                .style('opacity',1)
        },
        offset: '70%'
        })

    var waypoint = new Waypoint({
        element: document.getElementById('div3'),
        handler: function() {
            console.log('show y-axis')
            d3.selectAll('.y-axis .domain')
                .transition()
                .duration(500)
                .attr('opacity',1)
        },
        offset: '70%'
        })

    var waypoint = new Waypoint({
    element: document.getElementById('div6'),
    handler: function() {
        console.log('show circles')
        d3.selectAll('circle')
        .transition()
        .delay(function(d,i){
            return i/data.length * 500
        })
        .duration(1300)
        .ease(d3.easeLinear)
        .attr("cy", function(d) {
            return y_scale(d.Deaths);
        })
    },
    offset: '70%'
    })
})