/* webmotoric */

(function(window, document, Chartist){
    'use strict';
    var defaultOptions = {
        colors       : [],        // List of colors
        defaultColor : undefined, // Default color
        colorizeFn   : undefined  // Color generator function(index, series, meta){return '#f00';}
    };
    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.colors = function(options){
        options = Chartist.extend({}, defaultOptions, options);
        var isColorizeFn = typeof(options.colorizeFn) === 'function';
        return function colors(chart){
            chart.on('draw', function(data){
                var color;
                if(({point:1, line:1, bar:1, slice:1})[data.type]){
                    if(isColorizeFn){
                        color = options.colorizeFn(data.type === 'slice' ? data.index : data.seriesIndex, data.series, data.seriesMeta);
                    }else{
                        color = options.colors[data.seriesIndex] || data.series.color || options.defaultColor;
                    };
                    if(color){
                        data.element.attr({style:[data.type === 'slice' && !chart.options.donut ? 'fill' : 'stroke', ':', color, ';'].join('')});
                    }
                };
            });
        };
    };
}(window, document, Chartist));