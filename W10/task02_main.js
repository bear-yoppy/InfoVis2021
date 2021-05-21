d3.csv("https://bear-yoppy.github.io/InfoVis2021/W10/data2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; d.r = +d.r; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:50, right:10, bottom:50, left:100},
            spaces: {title:20, xlabel:40, ylabel:50},
            title: '課題2 散布図',
            xlabel: '第1成分',
            ylabel: '第2成分',
            color: {default:'royalblue', selected:'darkred'}
        };

        const scatter_plot = new ScatterPlot( config, JSON.parse(JSON.stringify(data)) );
        scatter_plot.update();

    })
    .catch( error => {
        console.log( error );
    });
