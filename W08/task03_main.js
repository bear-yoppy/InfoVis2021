d3.csv("https://bear-yoppy.github.io/InfoVis2021/W08/data1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:50, right:10, bottom:10, left:10},
            inner_radius: 80,
            outer_radius: 200,
            title: '課題3 円グラフ'
        };

        const pie_chart = new PieChart( config, data );
        pie_chart.update();
    })
    .catch( error => {
        console.log( error );
    });