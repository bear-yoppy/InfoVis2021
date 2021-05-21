class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            spaces: config.spaces || {title:50, xlabel:40, ylabel:50},
            title: config.title || '',
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            color: config.color || {default:'black', selected:'red'}
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
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [0, self.inner_height] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(3)
            .tickSize(5)
            .tickPadding(5);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(3)
            .tickSize(5)
            .tickPadding(5);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        self.svg.append('text')
            .style('font-size', '24px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top - self.config.spaces.title)
            .text( self.config.title );

        self.svg.append('text')
            .style('font-size', '16px')
            .attr('x', self.config.width / 2)
            .attr('y', self.inner_height + self.config.margin.top + self.config.spaces.xlabel)
            .text( self.config.xlabel );

        self.svg.append('text')
            .style('font-size', '16px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - self.config.spaces.ylabel)
            .attr('x', -(self.config.height / 2))
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.ylabel );
    }

    update() {
        let self = this;

        const space = 10;
        // const xmin = d3.min( self.data, d => d.x ) - space;
        const xmin = 0;
        const xmax = d3.max( self.data, d => d.x ) + space;
        self.xscale.domain( [xmin, xmax] );

        // const ymin = d3.min( self.data, d => d.y ) - space;
        const ymin = 0;
        const ymax = d3.max( self.data, d => d.y ) + space;
        self.yscale.domain( [ymax, ymin] );

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
            .attr("r", d => d.r )
            .attr("fill", self.config.color.default)
            .on('mouseover', function(e, d) {
                d3.select('#tooltip')
                    .style('opacity', 1)
                    .html(`<div class="tooltip-label">${d.label}</div>(${d.x}, ${d.y})`);
                d3.select(this)
                    .attr("fill", self.config.color.selected);
            })
            .on('mousemove', (e) => {
                const padding = 10;
                d3.select('#tooltip')
                    .style('left', (e.pageX + padding) + 'px')
                    .style('top', (e.pageY + padding) + 'px');
            })
            .on('mouseleave', function() {
                d3.select('#tooltip')
                    .style('opacity', 0);
                d3.select(this)
                    .attr("fill", self.config.color.default);
            });

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
            
    }
}