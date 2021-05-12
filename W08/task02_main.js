d3.csv("https://bear-yoppy.github.io/InfoVis2021/W08/data2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:50, right:10, bottom:50, left:80},
            title: '課題2 折れ線グラフ',
            xlabel: 'x座標',
            ylabel: 'y座標'
        };

        const line_chart = new LineChart( config, data );
        line_chart.update();
    })
    .catch( error => {
        console.log( error );
    });