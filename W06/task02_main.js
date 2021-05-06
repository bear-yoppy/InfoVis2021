d3.csv("https://bear-yoppy.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 500,
            height: 500,
            margin: {top:100, right:50, bottom:50, left:100},
            inner_margin: {top:20, right:20, bottom:20, left:20},
            title: "散布図 (Task 2)",
            xlabel: "xの値",
            ylabel: "yの値"
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            inner_margin: config.inner_margin || {top:10, right:10, bottom:10, left:10},
            title: config.title || "Title",
            xlabel: config.xlabel || "x_label",
            ylabel: config.ylabel || "y_label"
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left+self.config.inner_margin.left}, ${self.config.margin.top+self.config.inner_margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right - self.config.inner_margin.left - self.config.inner_margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom - self.config.inner_margin.top - self.config.inner_margin.bottom;

        self.title = self.svg.append('text')
            .attr('fill', "black")
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top / 2)
            .attr('text-anchor', "middle")
            .attr('font-size', "24pt")
            .attr('font-weight', "bold")
            .text(self.config.title);

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(12)
            .tickSize(8);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6)
            .tickSize(8);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height+self.config.inner_margin.bottom})`);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(${-self.config.inner_margin.left}, 0)`);

    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [ymin, ymax] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r );

        self.xaxis_group
            .call( self.xaxis )
            .append('text')
            .attr('fill', "black")
            .attr('x', self.inner_width / 2)
            .attr('y', 40)
            .attr('text-anchor', "middle")
            .attr('font-size', "12pt")
            .attr('font-weight', "normal")
            .text(self.config.xlabel);
        
        self.yaxis_group
            .call( self.yaxis )
            .append('text')
            .attr('fill', "black")
            .attr('transform', "rotate(-90)")
            .attr('x', -self.inner_height / 2)
            .attr('y', -40)
            .attr('text-anchor', "middle")
            .attr('font-size', "12pt")
            .attr('font-weight', "normal")
            .text(self.config.ylabel);
    }
}
