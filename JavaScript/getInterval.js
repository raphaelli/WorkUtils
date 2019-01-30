//获取两个时间之间的天数
function getInterval(begin,end)
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
