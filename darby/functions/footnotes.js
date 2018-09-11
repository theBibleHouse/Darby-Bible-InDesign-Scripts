function get_book_name(myFrame) {
	var me = []
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "<<.*?>>~b";
	//app.findGrepPreferences.justification = Justification.CENTER_JUSTIFIED;
	me = myDocument.findGrep();
	if (me[0].contents) {
		bookName = me[0].contents.substring(2, me[0].contents.length - 3);
		app.changeGrepPreferences.changeTo = "";
		myDocument.changeGrep();
		return bookName;
	}
}