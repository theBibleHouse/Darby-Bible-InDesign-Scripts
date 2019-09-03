function format_text(myFrame) {

	currentPage = myFrame.parentPage
	
	find_and_replace(myFrame, "~b{2}+", "~b");
	find_and_replace(myFrame, " {2}+", " ");
	find_and_replace(myFrame, "\\s+~b", "~b");
	find_and_replace(myFrame, "\\s+$", "");
	
	// add section headings
	section_headings(myFrame);
	
	//insert_notes_and_references(myFrame);
	special_breaks(myFrame);
	italics(myFrame);
	// heading
	apply_book_name_style(currentPage, myFrame);
	apply_verse_number_style(myFrame);
	apply_chapter_number_styles(myFrame);
		// don't hyphenate words with hyphen
	// words before hyphen
	noBreak(myFrame,"-\\K.+?\\w\\b")
	// words after hyphen
	noBreak(myFrame,"\\b\\w+?(?=-)")

	// proper words
	noBreak(myFrame,"\\u\\l+")

	app.findGrepPreferences = app.changeGrepPreferences = null
	app.findGrepPreferences.findWhat = "-"
	app.changeGrepPreferences.changeTo = "-~k"
	myFrame.parentStory.changeGrep()

//	page_headings(myFrame);
//	referenceSuperscript(myFrame);
	// keep last 2 words in paragraph together
	noBreakAll(myFrame, "(\\H+?\\h?){2}$");

	// tab after chapter numbers
	app.findGrepPreferences = app.changeGrepPreferences = null
	app.findGrepPreferences.findWhat = "\\d\\K~%"
	app.changeGrepPreferences.changeTo = '\\t'
	myFrame.parentStory.changeGrep()

	// in front of verse numbers
	app.findGrepPreferences.findWhat = "~>";
	app.changeGrepPreferences.changeTo = "\\s"
	myFrame.parentStory.changeGrep()
	
}

function special_breaks(myFrame){
	try {
		app.changeGrepPreferences = app.findGrepPreferences = null;
		app.findGrepPreferences.findWhat = "([;|-|\\*|,|~~|\\)|\\]|\\.|\\:|~_]+)";
		app.changeGrepPreferences.changeTo = "$0~k";
		myFrame.parentStory.changeGrep()
	} catch (e) {}
}


function find_first_baseline(myFrame) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\<.+?\\>" //"[\\u|\\l]";
	foundText = myFrame.findGrep()
	foundTextBaseline = foundText[0].baseline
	return foundTextBaseline
}

function find_and_replace(myFrame, find, replace) { // search text, paragraph style
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = find;
	app.changeGrepPreferences.changeTo = replace;
	myFrame.parentStory.changeGrep();
}


function find_and_replace_w_p_style(myFrame, find, replace,style) { // search text, paragraph style
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = find;
	app.changeGrepPreferences.changeTo = replace;
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item(style);
	myFrame.parentStory.changeGrep();
}


function find_and_replace_w_c_style(myFrame, find, replace,style) { // search text, paragraph style
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = find;
	app.changeGrepPreferences.changeTo = replace;
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item(style);
	myFrame.parentStory.changeGrep();
}

function italics(myFrame) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.fontStyle = "Italic";
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("Italics");
	myFrame.parentStory.changeGrep();

}

function apply_book_name_style(myPage, myFrame) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.pointSize = 24;
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("bookName");
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("bookName");
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.pointSize = 11;
	app.findGrepPreferences.leading = 26;
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("bookName");
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("bookName");
	//app.findGrepPreferences.findWhat = "^[^/]+?(?=~bChapter 1)"
	myFinds = myFrame.parentStory.findGrep();
	bookFrame = addBookTextFrame(myPage)

	myFinds[0].parentStory.insertionPoints.itemByRange(myFinds[0].texts[0].insertionPoints[0].index, myFinds[0].texts[0].insertionPoints[-1].index).texts[0].move(LocationOptions.atBeginning, bookFrame.insertionPoints[0]);

	// insert intro
	start_index = bookFrame.parentStory.insertionPoints[-1].index
	// insert space to clear styles
	bookFrame.insertionPoints[-1].contents = ' '

	// apply style
	bookFrame.insertionPoints.itemByRange(start_index,bookFrame.parentStory.insertionPoints[-1].index).appliedParagraphStyle = myDocument.paragraphStyles.item("intro");
	bookFrame.insertionPoints.itemByRange(start_index,bookFrame.parentStory.insertionPoints[-1].index).appliedCharacterStyle = myDocument.characterStyles.item("None");

	// insert intro
	bookFrame.insertionPoints[-1].contents = get_intro()

	// center
	find_and_replace(bookFrame,"(</center>)",'$1~b')
	find_and_replace_w_p_style(bookFrame, "<center>([\\H|\\h]+?)</center>", "$1", 'intro-center');
	find_and_replace(bookFrame,'"','"')
	//find_and_replace(bookFrame,':','.')
	
	// remove trailing period on verse reference
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "(\\)\\.)";
	app.changeGrepPreferences.changeTo = "$0";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item('intro-center');
	bookFrame.changeGrep()

	// remove extra space
	app.findGrepPreferences.findWhat = "\\n";
	app.changeGrepPreferences.changeTo = "~b\\t";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item('intro');
	bookFrame.insertionPoints.itemByRange(start_index,bookFrame.parentStory.insertionPoints[-1].index).changeGrep();

	// -- to em dash
	find_and_replace(bookFrame,'--','~_')

	// keep last 2 words together
	noBreak(bookFrame, "(\\H+?\\h?){2}$");

	find_and_replace(bookFrame,"^ ","")
	find_and_replace(bookFrame,"…","...")

	
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "~b$";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item('intro');
	app.changeGrepPreferences.changeTo = "";
	bookFrame.changeGrep();

	// apply italics
	find_and_replace_w_c_style(bookFrame,"\\*(.+?)\\*","$1",'Italics')

	// check book frame size. Change bottom outset to hit the next baseline
	
	var newOffset = Math.ceil(bookFrame.geometricBounds[2]  / myDocument.gridPreferences.baselineDivision) *  myDocument.gridPreferences.baselineDivision
	newOffset = newOffset - bookFrame.geometricBounds[2] + bookFrame.properties.textWrapPreferences.textWrapOffset[2]  - .27*myDocument.gridPreferences.baselineDivision
	bookFrame.properties.textWrapPreferences.textWrapOffset = [0,0,newOffset,0]
}

function apply_verse_number_style(myFrame) { 
	// search text, paragraph style
	// rounds indentation to a whole number, when importing from word sometimes it is not a round number
	// for now I shut off, but might need it back

	if (app.documents.length > 0)
		RoundNumbers(app.documents[0]);

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.position = Position.SUPERSCRIPT;
	app.findGrepPreferences.findWhat = "(\\t\\d+\\t)";
	if (size == 'large') {
		app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("VerseNum");
		app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerseTwoColumn");
	} else {
		app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("VerseNumM");
		app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerse");
	}
	app.changeGrepPreferences.changeTo = ("$1");
	myFrame.parentStory.changeGrep();

	// metrical last verse
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\t\\t(\\t\\d+\\t)";
	if (size == 'large') {
		app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerseTwoColumn");
			app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("VerseNum");

	} else {
		app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerse");
			app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("VerseNumM");

	}
	app.changeGrepPreferences.spaceAfter = 0;
	app.changeGrepPreferences.changeTo = ("$1");
	myFrame.parentStory.changeGrep();


	// metrical second verse
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\t(\\t\\d+\\t)";
	if (size == 'large') {
			app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("VerseNum");
		app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerseTwoColumn");
	} else {
			app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("VerseNumM");
		app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerse");
	}
	app.changeGrepPreferences.leading = 0;
	app.changeGrepPreferences.spaceBefore = 0;
	app.changeGrepPreferences.changeTo = ("$1");
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "(?<=~b\\n)(\\t)";
	app.changeGrepPreferences.leading = 0;
	app.changeGrepPreferences.spaceBefore = 0;
	app.changeGrepPreferences.changeTo = ("$1");
	myFrame.parentStory.changeGrep();


	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.position = Position.SUPERSCRIPT;
	app.findGrepPreferences.leftIndent = "7.1mm";
	app.findGrepPreferences.findWhat = "(\\d+)\\s";
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("VerseNumM");
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("quoteVerse");
	app.changeGrepPreferences.changeTo = ("$1").concat(String.fromCharCode(8198));
	myFrame.parentStory.changeGrep();


	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.position = Position.SUPERSCRIPT;
	//app.findGrepPreferences.findWhat = type === 'scofield' ? "(\\d+)%" : "(//d+)\\s";
	app.findGrepPreferences.findWhat = "(\\d+)\\s";
	app.findGrepPreferences.appliedParagraphStyle !== myDocument.paragraphStyles.item("quoteVerse");
	found = myFrame.parentStory.findGrep()

	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("VerseNum");
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse");
	//app.changeGrepPreferences.changeTo = ("$1").concat(String.fromCharCode(8198));
	app.changeGrepPreferences.changeTo = ("$1")
	myFrame.parentStory.changeGrep();

	// sneak in some stuff for metrical :) 

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "(?<=~b\\t\\t)(.)";
	app.findGrepPreferences.appliedParagraphStyle !== myDocument.paragraphStyles.item("quoteVerse");
	if (size == 'large') {
		app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerseTwoColumn");
	} else {
		app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerse");
	}
	app.changeGrepPreferences.changeTo = ("$1");
	myFrame.parentStory.changeGrep();

	// cross symbol
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "<2020>";
	app.changeGrepPreferences.position = Position.SUPERSCRIPT;
	app.activeDocument.changeGrep();

}

function apply_chapter_number_styles(myFrame) { // search text, paragraph style
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "Chapter (\\d\\d\\d)~b";
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse3");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("ChapterNum");
	app.changeGrepPreferences.changeTo = ("$1").concat(String.fromCharCode(8198));
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "Chapter (\\d\\d)~b\\t";
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("mVerse2");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("ChapterNum");
	app.changeGrepPreferences.changeTo = ("$1").concat(String.fromCharCode(0009));
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "Chapter (\\d\\d)~b";
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse2");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("ChapterNum");
	app.changeGrepPreferences.changeTo = ("$1").concat(String.fromCharCode(8198));
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "Chapter (\\d)~b\\t";
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("mVerse1");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("ChapterNum");
	app.changeGrepPreferences.changeTo = ("$1").concat(String.fromCharCode(0009));
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "Chapter (\\d)~b";
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse1");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("ChapterNum");
	app.changeGrepPreferences.changeTo = ("$1").concat(String.fromCharCode(8198));
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse1");
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse1");
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("mVerse1");
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("mVerse1");
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse2");
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse2");
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("mVerse2");
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("mVerse2");
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse3");
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse3");
	myFrame.parentStory.changeGrep();

	// metrical verse 1 no leading
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\t(\\d+)";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("mVerse2");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("ChapterNum");
	app.changeGrepPreferences.leading = 0;
	app.changeGrepPreferences.spaceBefore = 0;
	app.changeGrepPreferences.changeTo = ("$1");
	myFrame.parentStory.changeGrep();

	// metrical verse 1 no leading
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\t(\\d+)";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("mVerse1");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("ChapterNum");
	app.changeGrepPreferences.leading = 0;
	app.changeGrepPreferences.spaceBefore = 0;
	app.changeGrepPreferences.changeTo = ("$1");
	myFrame.parentStory.changeGrep();

	// remove leading on verse 1's with a heading
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\^.+?\\^~b\\K(\\d+)";
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("ChapterNum");
	app.changeGrepPreferences.leading = 0;
	app.changeGrepPreferences.spaceBefore = 0;
	app.changeGrepPreferences.changeTo = ("$1");
	myFrame.parentStory.changeGrep();

	// section section
	/*
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\^(.+?)\\^";
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("SectionHeading");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("None");
	app.changeGrepPreferences.changeTo = ("$1");
	myFrame.parentStory.changeGrep();
	*/
}


function applyParagraphStyle(grepStr, styleName) { // search text, paragraph style
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = grepStr;
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item(styleName);
	myDocument.changeGrep();
}

function dateFormatFix(myFrame) {

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "^\\d+\\s(\\d+\\s)";
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("None")
	app.changeGrepPreferences.changeTo = "$1";
	myFrame.changeGrep();

}

function footnoteSuperscript(myFrame) {

	// set space between footnote reference and the superscript letter
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "(:\\d+[,?\\d+]*)[~%|~s|~<](\\l)";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote");
	app.changeGrepPreferences.changeTo = "$1~s$2"; // was 
	myFrame.parentStory.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = ":\\d+[,?\\d+]*[~%|~s|~<]\\K(\\l)~<*";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("NoteSuperScript");
	app.changeGrepPreferences.changeTo = "$1~<";
	myFrame.parentStory.changeGrep();
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = ":\\d+[,?\\d+]*[~<|~s]\\K(\\l)(?=,)";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("NoteSuperScript");
	app.changeGrepPreferences.changeTo = "$1";
	myFrame.parentStory.changeGrep();

	// app.findGrepPreferences = app.changeGrepPreferences = null;
	// app.findGrepPreferences.findWhat = "\\s\\K(\\l)~<";
	// app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("SuperScript");
	// app.changeGrepPreferences.changeTo = "$1~<";
	// myFrame.parentStory.changeGrep();

	app.findGrepPreferences.findWhat = "~k[~>|~m]~k\\K(\\l)~<*";
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("NoteSuperScript");
	app.changeGrepPreferences.changeTo = "$1~<";
	myFrame.parentStory.changeGrep();




	// italics

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "<i>(.+?)</i>";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("Italics");
	app.changeGrepPreferences.changeTo = "$1"
	myFrame.parentStory.changeGrep();
	// //try {
	// 		// convert {{}} in footnotes to italics
	// 		app.changeGrepPreferences = app.findGrepPreferences = null;
	// 		app.findGrepPreferences.findWhat = "\\*(.+?)\\*";
	// 		app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("Italics")
	// 		app.changeGrepPreferences.changeTo = "$1";
	// 		myFrame.changeGrep()
	// 		//} catch (e) {}

}

function referenceSuperscript(myFrame) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("SuperScript");
	app.changeGrepPreferences.changeTo = ("$1").concat(String.fromCharCode(8198));
	app.findGrepPreferences.findWhat = "(\\l+)(?=<)";
	myFrame.parentStory.changeGrep();
}

function bold(myFrame, grep) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = grep;
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("bold");
	try {
		myFrame.changeGrep()
	} catch (e) {}
}

function page_headings(myFrame) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "#(.+?)#";
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("Italics");
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse");
	app.changeGrepPreferences.changeTo = "~b$1";
	try {
		myFrame.parentStory.changeGrep()
	} catch (e) {}
}

function format_cross_reference_verse_numbers( myFrame ) {

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findTextPreferences = app.changeTextPreferences = null;
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("init-crossReference-"+myFrame.name.replace('ref-',''));
	app.findTextPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("init-crossReference-"+myFrame.name.replace('ref-',''));

	// non break hyphen on verse ranges only on location
	app.findGrepPreferences.findWhat = "^\\d+\\K-(?=\\d)";
	app.changeGrepPreferences.changeTo = "~~";
	myFrame.parentStory.changeGrep()

	// allow line break on comma and semi colon.. only if there are more than 3 chars between
	// using 6th space, not normal space as there is some odd compression of std spaces going on.
	app.findGrepPreferences.findWhat = "(;)(?=[^~k][^;]{3})";
	app.changeGrepPreferences.changeTo = "$1~%~k";
	myFrame.parentStory.changeGrep()
	// for comma and hyphen, idk what chars are after, as long as there are 3
	app.findGrepPreferences.findWhat = "([-|,])(?=[^~k][^;]{3})";
	app.changeGrepPreferences.changeTo = "$1~k";
	myFrame.parentStory.changeGrep()
	
}

function metrical_fix(myframe) {


	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\>\\t+"
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerseTwoColumn")
	app.changeGrepPreferences.changeTo = "\\s"
	myframe.parentStory.changeGrep()

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "^\\s+"
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerseTwoColumn")
	myframe.parentStory.changeGrep()

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\t+"
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("metricalVerseTwoColumn")
	myframe.parentStory.changeGrep()


/*
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findTextPreferences.findWhat = "^n"
	app.changeTextPreferences.changeTo = ""
	myframe.parentStory.changeText()

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = ".\\K\\t"
	app.changeGrepPreferences.changeTo = " "
	myframe.parentStory.changeGrep()

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "[~m~>~f~|~S~s~<~/~.~3~4~% ]{2,}"
	app.changeGrepPreferences.changeTo = "\\s"
	myframe.parentStory.changeGrep()
*/

}

function noBreakAll(myFrame, grep) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = grep;
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Verse")
	app.changeGrepPreferences.noBreak = true;
	myFrame.parentStory.changeGrep();
}

function noBreak(myFrame, grep) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = grep;
	app.changeGrepPreferences.noBreak = true;
	
	try{myFrame.parentStory.changeGrep();}catch(e){$.writeln(e)}
}

function change_style_on_headings_in_col_2(myFrame) {
	app.changeGrepPreferences = app.findGrepPreferences = null;
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("SectionHeading")
	app.findGrepPreferences.findWhat = "^.+$";
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("SectionHeadingRight")
	try {
		myFrame.changeGrep()	
	} catch (e) {}
}



function release_anchored_objects() { // bug in ID
	var a = app.activeDocument.allPageItems,
		t;

	while (t = a.pop()) {
		t.isValid &&
			t.hasOwnProperty('anchoredObjectSettings') &&
			(t.parent instanceof Character) &&
			(t = t.anchoredObjectSettings).isValid &&
			t.releaseAnchoredObject();
	}
}