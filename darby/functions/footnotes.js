/*function get_book_name(myFrame) {
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

*/


function add_footnotes(myFrame){

/*

	1. get all numbers on page, loop through them. use lastchapter and chapter to know what chapter numbers are there.
	2. for each reference check the array and remove it when found. add in the note letter in the verse.
	3. add it to the text box
	4. verify that verse number is still on the page. 
	5. if it is not on the page anymore then reduce text frame size until it is back. link text frame to next page so that 
	   the excess text and flow over.


	at the end print out anything that is left in the note/date/cross arrays to see what was not found.

*/

	return 1

}