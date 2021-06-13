class PieChart {
    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            inner_radius: config.inner_radius || 0,
            outer_radius: config.outer_radius || 100,
            cscale: config.cscale
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);
            
        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
        
        self.chart = self.svg.append('g')
            .attr('transform', `translate(
                ${self.config.margin.left + self.inner_width/2}, 
                ${self.config.margin.top + self.inner_height/2})`);
    }

    update() {
        let self = this;
        // console.log(self.data);
        if (self.data.length == 1) {
            self.shapeddata = [
                {weather: 'sunny', day: self.data[0]['sunny']},
                {weather: 'cloudy', day: self.data[0]['cloudy']},
                {weather: 'rainy', day: self.data[0]['rainy']}
            ];
        } else {
            self.shapeddata = [];
        }
        // console.log(self.shapeddata);

        self.key = d => d.data.weather;
        self.value = d => d.day;

        self.pie = d3.pie()
            .value( self.value )
            .sort(null);

        self.arc = d3.arc()
            .innerRadius(self.config.inner_radius)
            .outerRadius(self.config.outer_radius);

        if (self.config.inner_radius < self.config.outer_radius / 3) {
            self.textarc = d3.arc()
                .innerRadius(self.config.outer_radius * 2 / 3)
                .outerRadius(self.config.outer_radius * 2 / 3);
        } else {
            self.textarc = self.arc;
        }

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll('pie')
            .data(self.pie(self.shapeddata))
            .enter()
            .append('path')
            .attr('d', self.arc)
            // .attr('fill', 'black')
            .attr('fill', d => self.config.cscale( self.key(d) ))
            .attr('stroke', 'white')
            .style('stroke-width', '2px');
        
        self.chart.selectAll('path')
            .data(self.pie(self.shapeddata))
            .exit()
            .remove();

        let texts = self.chart.selectAll('text')
            .data(self.pie(self.shapeddata))
            .enter();

        let labels = texts
            .append('text')
            .attr('fill', 'white')
            .attr('transform', d => `translate(${self.textarc.centroid(d)})`)
            .style('font-size', '18px')
            .attr('text-anchor', 'middle')
            
        labels.append('tspan')
            .attr('x', 0)
            .attr('y', '-0.6em')
            .style('font-weight', 'bold')
            .text(d => self.key(d));

        labels.append('tspan')
            .attr('x', 0)
            .attr('y', '0.6em')
            .text(d => d.value);

        self.chart.selectAll('text')
            .data(self.pie(self.shapeddata))
            .exit()
            .remove();

        
    }
}