prepareExampleCode = function(s){
    s = s.replace(/(^function\s\([a-zA-Z1-2,\s]*\){\n*)|([\n\s]*}$)/g, '');
    return s.replace(new RegExp('^[ \\t]{' + (/^[ \t]+/.exec(s) || [''])[0].length + '}', 'gm'), '');
}
addExample = function(selector, call){
    var e = document.querySelector(selector);
    if(e){
        call();
        var
        s = prepareExampleCode(call.toString()),
        c = document.createElement('code'),
        p = document.createElement('pre');
        c.innerText = s;
        p.appendChild(c); 
        e.insertAdjacentElement('afterend', p);
        hljs.configure({tabReplace:'    '});
        hljs.highlightBlock(c); 
    }
}