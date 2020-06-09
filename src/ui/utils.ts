export function injectCSS(css: string) {
    const style = document.createElement('style');
    style.setAttribute("type", "text/css");
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(style); 
}
