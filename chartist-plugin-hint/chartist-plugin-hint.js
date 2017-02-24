/* webmotoric */

(function(window, document, Chartist){
    'use strict';
    var defaultOptions = {
        offsetX      : 0,         //
        offsetY      : 0,         //
        contentFn    : undefined, // Content generator function(data){return '<h1>' + data.value + '</h1>';}
                                  // data.hint, data.value, data.meta, data.color, data.index, data.series, data.label
        cssClass     : undefined  // Custom CSS class
    };
    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.hint = function(options){
        options = Chartist.extend({}, defaultOptions, options);
        return function hint(chart){
            var
            holder = chart.container,
            hint   = document.createElement('div');
            
            !/relative|absolute|fixed/.test(holder.style.position) && (holder.style.position = 'relative');
            hint.classList.add('ct-hint', 'ct-hint-hide');
            options.cssClass && hint.classList.add(options.cssClass);
            (options.appendToBody ? document.body : holder).appendChild(hint);
            
            chart.on('draw', function(data){
                if(({point:1, line:1, bar:1, slice:1})[data.type]){
                    data.element.attr({'ct:hint-index': typeof(data.seriesIndex) === 'undefined' ? data.index : data.seriesIndex});
                }else{
                    data.element.attr({style: 'pointer-events:none;'});
                };
            });

            var
            isHintTarget = function(el){
                return /ct-(bar|slice|point|line)/.test(el.classList.toString());
            },          
            getTargetColor = function(el){
                var color;
                if(isHintTarget(el)){
                    var styles = window.getComputedStyle(el); 
                    color = el.nodeName === 'line' || !styles.fill || styles.fill === 'none' ? styles.stroke : styles.fill;
                };
                return color || '';
            },
            setHintPosition = function(e){
                var
                anchorX,
                anchorY,
                width   = hint.offsetWidth,
                height  = hint.offsetHeight,
                offsetX = - width / 2 + options.offsetX,
                offsetY = - height + options.offsetY;
                if(!options.appendToBody){
                    var
                    box  = holder.getBoundingClientRect(),
                    left = e.pageX - box.left - window.pageXOffset,
                    top  = e.pageY - box.top - window.pageYOffset;
                    if(chart instanceof Chartist.Line && e.target.x2 && e.target.y2){
                        anchorX = parseInt(e.target.x2.baseVal.value, 10);
                        anchorY = parseInt(e.target.y2.baseVal.value, 10);
                    };
                    hint.style.top = (anchorY || top) + offsetY + 'px';
                    hint.style.left = (anchorX || left) + offsetX + 'px';
                }else{
                    hint.style.top = e.pageY + offsetY + 'px';
                    hint.style.left = e.pageX + offsetX + 'px';
                };
            };
            holder.addEventListener('mouseover', function(e){
                if(isHintTarget(e.target)){
                    var
                    html        = '',
                    el          = e.target,
                    value       = el.getAttribute('ct:value'),
                    meta        = el.getAttribute('ct:meta'),
                    index       = parseInt(el.getAttribute('ct:hint-index'), 10) || 0,
                    series      = typeof(chart.data.series[index]) === 'object' ? chart.data.series[index] : chart.data.series,
                    label       = meta || series.name || chart.data.labels[index] || '',
                    color       = getTargetColor(el);
                    
                    if(typeof(options.contentFn) === 'function'){     
                        html = options.contentFn.call(chart, {
                            hint        : hint,
                            value       : value,
                            meta        : meta, 
                            color       : color,
                            index       : index, 
                            series      : series,
                            label       : label
                        });
                    }else{
                        html = [
                            label ? '<div class="ct-hint-label" style="color:' + color + ';">' + label + '</div>' : '',
                            value != null ? '<div class="ct-hint-value">' + value + '</div>' : ''
                        ].join('');
                    };
                    hint.innerHTML = html;
                    setHintPosition(e);
                    hint.classList.remove('ct-hint-hide');
                };
            });
            holder.addEventListener('mouseout', function(e){
                isHintTarget(e.target) && hint.classList.add('ct-hint-hide');
            });
            holder.addEventListener('mousemove', function(e){
                setHintPosition(e);
            });
        }
    };
}(window, document, Chartist));