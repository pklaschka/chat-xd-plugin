if (window.setTimeout == null) {
    // @ts-ignore
    window.setTimeout = function (fn) {
        fn();
    };
}

if (window.clearTimeout == null) {
    window.clearTimeout = function () {
    };
}

if (window.cancelAnimationFrame == null) {
    window.cancelAnimationFrame = function () {
    };
}
if (window.requestAnimationFrame == null) {
    // @ts-ignore
    window.requestAnimationFrame = function () {
        console.log('requestAnimationFrame is not supported yet');
    };
}
if (window.HTMLIFrameElement == null) {
    // @ts-ignore
    window.HTMLIFrameElement = class HTMLIFrameElement {
    };
}
