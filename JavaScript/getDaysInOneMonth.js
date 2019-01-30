//获取指定月份天数
function getDaysInOneMonth(year, month) {
    month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    return d.getDate();
}

//eg:
//console.info(getDaysInOneMonth(2019, 02));
// -- 28
