import * as uglifycss from "uglify-css";

export function uuid() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export function injectCSS(css: string, uglify: boolean = false) {
    const style = document.createElement('style');
    style.setAttribute("type", "text/css");
    if (uglify) {
        css = uglifycss.processString(css);
    }
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(style); 
}
