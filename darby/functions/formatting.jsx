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
	apply_book_name_style(currentPage, myFrame);
	apply_verse_number_style(myFrame);
	apply_chapter_number_styles(myFrame);
		// don't hyphenate words with hyphen
	// words before hyphen
	noBreak(myFrame,"-\\K.+?\\w\\b")
	// words after hyphen
	noBreak(myFrame,"\\b\\w+?(?=-)")

	app.findGrepPreferences = app.changeGrepPreferences = null
	app.findGrepPreferences.findWhat = "-"
	app.changeGrepPreferences.changeTo = "-~k"
	myFrame.parentStory.changeGrep()

	page_headings(myFrame);
	referenceSuperscript(myFrame);
	// keep last 2 words in paragraph together
	noBreakAll(myFrame, "(\\H+?\\h?){2}$");

	// tab after chapter numbers
	app.findGrepPreferences = app.changeGrepPreferences = null
	app.findGrepPreferences.findWhat = "\\d\\K~%"
	app.changeGrepPreferences.changeTo = '\\t'
	myFrame.parentStory.changeGrep()

	// in front of verse numbers
	app.findGrepPreferences = app.changeGrepPreferences = null
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
	myFrame.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.pointSize = 11;
	app.findGrepPreferences.leading = 26;
	app.changeGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("bookName");
	myFrame.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("bookName");
	//app.findGrepPreferences.findWhat = "^[^/]+?(?=~bChapter 1)"
	myFinds = myFrame.findGrep();
	bookFrame = addBookTextFrame(myPage)

	myFinds[0].parentStory.insertionPoints.itemByRange(myFinds[0].texts[0].insertionPoints[0].index, myFinds[0].texts[0].insertionPoints[-1].index).texts[0].move(LocationOptions.atBeginning, bookFrame.insertionPoints[0]);

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "~b$";
	app.changeGrepPreferences.changeTo = "";
	bookFrame.changeGrep();
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
	app.findGrepPreferences.findWhat = "(\\d+)~%";
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
	app.findGrepPreferences.findWhat = "(:\\d+)\\s(\\l)";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote");
	app.changeGrepPreferences.changeTo = "$1~s$2"; // was ~%
	myFrame.changeGrep();
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = ":\\d+[\\s||~%]\\K(\\l)[\\s||~%]";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("SuperScript");
	app.changeGrepPreferences.changeTo = "$1~%";
	myFrame.changeGrep();
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = ":\\d+[\\s||~%]\\K(\\l)(?=,)";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("SuperScript");
	app.changeGrepPreferences.changeTo = "$1";
	myFrame.changeGrep();
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\s\\K(\\l)~%";
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("SuperScript");
	app.changeGrepPreferences.changeTo = "$1~%";
	myFrame.changeGrep();
	// italics

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\*(\\<.+?\\>)\\*";
	app.findGrepPreferences.appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote");
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("Italics");
	//app.changeGrepPreferences.changeTo = "$1"
	myFrame.parentStory.changeGrep();
	//try {
			// convert {{}} in footnotes to italics
			app.changeGrepPreferences = app.findGrepPreferences = null;
			app.findGrepPreferences.findWhat = "\\*(.+?)\\*";
			app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("Italics")
			app.changeGrepPreferences.changeTo = "$1";
			myFrame.changeGrep()
			//} catch (e) {}

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

function format_cross_reference_verse_numbers( myFrame) {

	noBreak(myFrame, "\\*~k.+?\\d")
	noBreak(myFrame, "\\d+~>.")
		// make newberry marker
	noBreak(myFrame, "~8\\s.")

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "(\\l)\\."
	app.changeGrepPreferences.changeTo = "$1\\s"
	try{myFrame.parentStory.changeGrep()}catch(e){$.writeln(e)}


	// non break hyphen on verse ranges only on location
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "^\\d+\\K-(?=\\d)";
	app.changeGrepPreferences.changeTo = "~~";
	try {
		myFrame.changeGrep()
	} catch (e) {$.writeln(e)}
	
	// apply verse num style
	/*app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "^\\<.+?(?=(~%|\\s))";
	app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("bold");
	try {
		//alert("cross vere num")
		myFrame.changeGrep()
	} catch (e) {$.writeln(e)}
*/

	// replace first space with en space
	/*app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "(^\\<.+?)(~%|\\s)";
	app.changeGrepPreferences.changeTo = "$1~s"; // was ~>~k
	try {
		myFrame.parentStory.changeGrep()
	} catch (e) {$.writeln(e)}
*/

	// put a space between references
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = ";(?=[^\\s])";
	app.changeGrepPreferences.changeTo = ";\\s";
	try {
		myFrame.parentStory.changeGrep()
	} catch (e) {$.writeln(e)}


	// replace * with • on newberry references
	app.findTextPreferences = app.changeTextPreferences = null;
	app.findTextPreferences.findWhat = "*";
	app.changeTextPreferences.changeTo = "^8"; // for grep search it would be ~8
	try {
		myFrame.parentStory.changeText()
	} catch (e) {$.writeln(e)}



	// apply raised style to hyphens and comas
	/*app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "~~";
	app.findGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("crossVerseNum");
	app.changeGrepPreferences.appliedFont = "Lexicon No1 C Tab"
	app.changeGrepPreferences.position = Position.SUPERSCRIPT;
	app.changeGrepPreferences.changeTo = "~~"
	try{myFrame.parentStory.changeGrep()} catch(e){}
	
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "<002C>";
	app.findGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("crossVerseNum");
	app.changeGrepPreferences.appliedFont = "Lexicon No1 C Tab";
	app.changeGrepPreferences.baselineShift = "-.5";
	app.changeGrepPreferences.position = Position.SUPERSCRIPT;
	app.changeGrepPreferences.changeTo = ","
	try{myFrame.parentStory.changeGrep()} catch(e){}*/
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