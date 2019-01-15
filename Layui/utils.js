//LayUi扩展工具类

layui.define(['jquery', 'topLayer'], function(exports) {
    var $ = layui.$,
        topLayer = layui.topLayer,
        utils = {};

    //get请求
    utils.get = function(url, data, successCallback, errorCallback) {
        $.get(url, data, function(ret) {
            if (ret.Code == "1") {
                successCallback(ret.Data);
            } else {
                if (errorCallback) {
                    errorCallback(ret.Msg);
                } else {
                    topLayer.error(ret.Msg);
                }
            }
        });
    }

    //post请求
    utils.post = function (url, data, successCallback, errorCallback) {
        $.post(url, data, function(ret) {
            if (ret.Code == "1") {
                if (successCallback) {
                    successCallback(ret.Data);
                } else {
                    topLayer.success("保存成功");
                }
            } else {
                if (errorCallback) {
                    errorCallback(ret.Msg);
                } else {
                    topLayer.error(ret.Msg);
                }
            }
        });
    }

    //url参数
    utils.getQueryString = function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    //获取url路径里的参数
    utils.getPathId=function() {
        var url = window.location.href;
        if (url.indexOf('?') > 0) {
            return null;
        }
        var matchs = url.match(/[^\/]+$/);
        if (matchs.length > 0)
            return matchs[0];

        return null;
    }

    //从url里获取id
    utils.getUrlId=function() {
        return utils.getQueryString("id") || utils.getPathId();
    }

    //生成唯一id
    utils.getSystemKey = function(code) {
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (code + "-" + new Date().format("yyMMddhhmmss") + "-" + S4() + S4());
    }

    //将.net后台日期转换成js日期
    utils.getJsDate=function(serverDateString)
    {
        if (serverDateString) {
            if (serverDateString instanceof Date) {
                return serverDateString;
            }
            return new Date(Number(serverDateString.match(/[0-9]+/)));
        }
        return null;
    }

    //将.net后台日期转换成字符串形式,如果不能成功转换直接返回原字符串
    utils.getDateString = function (serverDateString, bGetTime) {
        if (/^\/Date\([0-9]{13}\)\/$/.test(serverDateString)==false) {
            return serverDateString;
        }
        var date = utils.getJsDate(serverDateString);
        if (!date)
            return "";
        if (bGetTime!==false)
            return date.format('yyyy/MM/dd HH:mm');
        return date.format('yyyy/MM/dd');
    }

    //获取2个时间的时间间隔,使用天、小时、分表示
    utils.getInterval=function(begin,end)
    {
        if (end < begin) {
            var tmp = end;
            end = begin;
            begin = tmp;
        }
        var interval = (end - begin) / 1000;
        var day = parseInt(interval / (24 * 60 * 60));//计算整数天数
        var afterDay = interval - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
        var hour = parseInt(afterDay / (60 * 60));//计算整数小时数
        var afterHour = interval - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
        var min = parseInt(afterHour / 60);//计算整数分
        var afterMin = interval - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数
        var useTime = "";
        if (day > 0)
            useTime += day + "天";
        if (hour > 0)
            useTime += hour + "小时";
        useTime += min + "分钟";
        return useTime;

    }

    //获取字典
    utils.getDic=function(name,callback) {
        $.get(this.getRoot() + 'Dictionary/GetDicItemsByName', {name:name}, function (data) {
            if (callback)
                callback(data);
        });
    }

    utils.getRoot = function() {
        if (window.ROOT)
            return window.ROOT;
        if (layui.ROOT)
            return layui.ROOT;
    }

    //获取未跨域的顶层窗口
    utils.getTop = function () {
        var win = window;
        if (self != top) {
            var p = window.parent;
            while (true) {
                try {
                    if (p.location.host == location.host) {
                        win = p;
                    } else {
                        break;
                    }
                    if (p == top) {
                        break;;
                    }
                    p = p.parent;
                } catch (e) {
                    break;
                } 
            }
        }
        return win;
    }
    exports("utils", utils);
});

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //月份           
        "d+": this.getDate(), //日           
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
        "H+": this.getHours(), //小时           
        "m+": this.getMinutes(), //分           
        "s+": this.getSeconds(), //秒           
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度           
        "S": this.getMilliseconds() //毫秒           
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(format)) {
        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
}

/**
 * 原型：字符串格式化
 * "我是{0},年龄{1}".format("张三", 25)
 * "我是{name},年龄:{age}".format({name:"李四",age:26})
 */
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }

    var data = arguments; // 如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        // 如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replace(new RegExp("{"+key+"}", 'g'), value);
        }
    }
    return result;
}
