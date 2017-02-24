ChartistPlugins
==========
Plugins for [chartist.js][link-0]:

## Custom colors
![](http://webmotoric.com/sandbox/build/ChartistPlugins/chartist-plugin-colors/demo.png)

```javascript
new Chartist.Line('.ex1', {
    labels: ['One', 'Two', 'Three', 'Four', 'Five'],
    series: [
        {name: 'Data A', data: [9, 9, 7, 8, 5]},
        {name: 'Data B', data: [2, 1, 3, 7, 3]},
        {name: 'Data C', data: [1, 3, 4, 5, 6]},
        {name: 'Data D', data: [5, 2, 4, 7, 8]}
    ]
},{
    fullWidth: true,
    height: 200,
    chartPadding: {top: 25, right: 25},
    plugins: [
        Chartist.plugins.colors({
            colors:['#581845', '#900c3f', '#c70039', '#ff5733']
        })
    ]
});
```
[Other Demos and Docs][link-1]

## Custom hint
![](http://webmotoric.com/sandbox/build/ChartistPlugins/chartist-plugin-hint/demo.png)

```javascript
new Chartist.Line('.ex1', {
    labels: ['One', 'Two', 'Three', 'Four', 'Five'],
    series: [
        {name: 'Data A', data: [9, 9, 7, 8, 5]},
        {name: 'Data B', data: [2, 1, 3, 7, 3]},
        {name: 'Data C', data: [1, 3, 4, 5, 6]},
        {name: 'Data D', data: [5, 2, 4, 7, 8]}
    ]
},{
    fullWidth: true,
    height: 200,
    chartPadding: {top: 25, right: 25},
    plugins: [
        Chartist.plugins.hint()
    ]
});
```

[Other Demos and Docs][link-2]

[link-0]: <https://github.com/gionkunz/chartist-js/tree/master>
[link-1]: <http://webmotoric.com/sandbox/build/ChartistPlugins/chartist-plugin-colors/index.html>
[link-2]: <http://webmotoric.com/sandbox/build/ChartistPlugins/chartist-plugin-hint/index.html>
