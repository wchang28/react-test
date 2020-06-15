import $ from "jquery";

export async function indicateBusyWork<RT=void>(work: Promise<RT>) {
    $("body").append('<div id="overlay" style="cursor:wait;position:absolute;top:0;left:0;height:100%;width:100%;z-index:999"></div>');
    try {
        return await work;
    } catch(e) {
        throw e;
    } finally {
        $("#overlay").css('cursor:default');
        $("#overlay").remove();        
    }
}