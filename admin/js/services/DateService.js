export default class DateService {
  constructor(
    $rootScope,
    $window
  ) {
   'ngInject'
   this.BASE_PATH = process.env.BASE_PATH;
 
   this.$rootScope = $rootScope;
   this.$window = $window;
 
  }
 
  fromTimestampToDate (timestamp, milli = false) {
    var a;
    if (milli) {
      a = new Date(timestamp);
    } else {
      a = new Date(timestamp * 1000);
    }
    var year = a.getFullYear();
    var month = a.getMonth()+ 1;
    month = month <= 9 ? "0" + month : month;
    var date = a.getDate();
    date = date <= 9 ? "0" + date : date;
    var time = `${date}/${month}/${year}`;
    return time;
  }

  fromTimestampToDatePickerDate (timestamp) {
    const a = new Date(timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth()+ 1;
    month = month <= 9 ? "0" + month : month;
    var date = a.getDate();
    date = date <= 9 ? "0" + date : date;
    var time = `${month}/${date}/${year}`;
    return time;
  }
  
  fromDateToTimestamp(date) {
    const reg = /(?:[0-2]\d|3[01])\/(?:0\d|1[0-2])\/(?:\d{4}|\d{2})/g;
    if (reg.test(date)) {
      const arrDate = date.split("/");
      return Math.round(new Date(`${arrDate[2]}/${arrDate[1].replace("0", "")}/${arrDate[0].replace("0", "")} 00:00:00`).getTime()/1000)
    }
    return Math.round(new Date(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 00:00:00`).getTime()/1000)
  }
 }
 