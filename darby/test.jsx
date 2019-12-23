

os = $.os.toLowerCase().indexOf('mac') >= 0 ? "MAC": "WINDOWS";
$.writeln(os)

var date = new Date();

	dateString = parseInt(date.getMonth())+parseInt(1) + '-' + date.getDate() + '-' +  date.getFullYear() + '-at-' + date.getHours()+ ':' + date.getMinutes()
$.writeln(dateString)