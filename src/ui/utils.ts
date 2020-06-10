import * as uglifycss from "uglify-css";

export function injectCSS(css: string, uglify: boolean = false) {
    const style = document.createElement('style');
    style.setAttribute("type", "text/css");
    if (uglify) {
        css = uglifycss.processString(css);
    }
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(style); 
}
