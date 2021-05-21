d3.csv("https://bear-yoppy.github.io/InfoVis2021/W10/data1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:50, right:10, bottom:50, left:100},
            title: '課題1 棒グラフ',
            xlabel: '人口[億人]',
            ylabel: '国名',
            color: 'royalblue'
        };

        const bar_chart = new BarChart( config, JSON.parse(JSON.stringify(data)) );
        bar_chart.update();

        d3.selectAll('input[name="sorting"]')
            .on('change', function() {
                // console.log(this.value);
                switch (this.value){
                    case 'original':
                        bar_chart.data = JSON.parse(JSON.stringify(data));
                        bar_chart.update();
                        break;
                    case 'reverse':
                        bar_chart.data = JSON.parse(JSON.stringify(data));
                        bar_chart.data.reverse();
                        bar_chart.update();
                        break;
                    case 'descend':
                        bar_chart.data.sort((a, b) => d3.descending(a.value, b.value));
                        bar_chart.update();
                        break;
                    case 'ascend':
                        bar_chart.data.sort((a, b) => d3.ascending(a.value, b.value));
                        bar_chart.update();
                        break;
                    default:
                        console.log( "not implemented" );
                }
            })

        // d3.select('#original')
        //     .on('click', d => {
        //         bar_chart.data_origin.reverse();
        //         bar_chart.update();
        //     });
        
        // d3.select('#reverse')
        //     .on('click', d => {
        //         bar_chart.data_origin.reverse();
        //         bar_chart.update();
        //         // bar_chart.data_origin.reverse();
        //     });

        // d3.select('#descend')
        //     .on('click', d => {
        //         bar_chart.data.sort((a, b) => d3.descending(a.value, b.value));
        //         bar_chart.update();
        //     });

        // d3.select('#ascend')
        //     .on('click', d => {
        //         bar_chart.data.sort((a, b) => d3.ascending(a.value, b.value));
        //         bar_chart.update();
        //     });
    })
    .catch( error => {
        console.log( error );
    });
