d3.csv("https://bear-yoppy.github.io/InfoVis2021/W08/data1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:50, right:10, bottom:50, left:100},
            title: '課題1 棒グラフ',
            xlabel: '価格[円]',
            ylabel: '品目'
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });