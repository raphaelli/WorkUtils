layui.define([], function (exports) {
    var use = [];
    var topLayer = null;
    var pTopLayer = null;
    var pLayer = null;
    var win = window;

    if (self != top) {
        var p = window.parent;
        while (true) {
            try {
                if (p.location.host == location.host) {
                    if (p.layui) {
                        pTopLayer = p.layui.topLayer;
                        pLayer = p.layui.layer;
                    } else if (p.layer) {
                        pLayer = p.layer;
                    }
                    win = p;
                } else {
                    break;
                }
            } catch (e) {
                break;
            } 
            p = p.parent;
            if (p == top) {
                break;
            }
        }
    }
    if (pTopLayer) {
        exports("topLayer", pTopLayer);
        return;
    }

    if (!pLayer) {
        use.push('layer');
    }

    layui.use(use, function () {
        topLayer = pLayer || layui.layer;

        topLayer.success=function(msg) {
            topLayer.msg(msg, { icon: 1 });
        }
    
        topLayer.error=function(msg) {
            topLayer.alert(msg, { icon: 2 });
        }

        topLayer.warn = function (msg) {
            topLayer.alert(msg, { icon: 7 });
        }

        topLayer.getWindow=function() {
            return win;
        }
        exports("topLayer", topLayer);
    });
});
