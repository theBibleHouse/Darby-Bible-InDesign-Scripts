

os = $.os.toLowerCase().indexOf('mac') >= 0 ? "MAC": "WINDOWS";
$.writeln(os)

var date = new Date();

dateString = date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear() + '-' + date.getHours()+ '-' + date.getMinutes()
$.writeln(dateString)