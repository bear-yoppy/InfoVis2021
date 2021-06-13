let input_data;
let bar_chart;
let pie_chart;
let filter = [];

d3.csv("https://bear-yoppy.github.io/InfoVis2021/FinalTask/data.csv")
    .then( data => {
        input_data = data;
        // input_data.forEach( d => {
        //     d.accidents = +d.accidents;
        // });

        const color_scale = d3.scaleOrdinal();
        color_scale.domain(['sunny','cloudy','rainy']);
        color_scale.range(['orange','silver','skyblue']);

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 512,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:60},
            xlabel: '月',
            ylabel: '発生件数'
        }, input_data );
        bar_chart.update();

        pie_chart = new PieChart( {
            parent: '#drawing_region_piechart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            inner_radius: 20,
            outer_radius: 100,
            cscale: color_scale
        }, input_data );
        pie_chart.update();

    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        pie_chart.data = input_data;
    }
    else {
        // console.log("else");
        pie_chart.data = input_data.filter( d => filter.includes( d.month ) );
    }
    pie_chart.update();
}
