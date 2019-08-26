function new_foot(myFrame){

	
	if(myFrame.name=='frame1'){
		add_footnotes(myFrame)
		if(myFrame.nextTextFrame.name=="frame2"){
			add_footnotes(myFrame.nextTextFrame)
		}
	}
}

function get_foot_array_val(array,chapter,verse){
	var data = []
    for(var c=0;c<array.length;c++){
        if(array[c][1]==chapter && array[c][2]==verse){data.push(array[c]);}
    }
    var result = data.length < 1 ? false : data
    return result
}


var alpha = 'z'
function alpha_increment()
{
    alpha = alpha === 'z' ? 'a' : String.fromCharCode(alpha.charCodeAt()+1)
    return alpha       
}


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

	// get all numbers on page.
	app.changeGrepPreferences = app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\d+";
	var numbers = myFrame.findGrep();

	// loop through them, one at a time.
	// check if they are still on the page. don't use grep, just check index/baseline?
	// if still on the page, then add the note. Don't care if it changed col, etc.
	var lastverse = 0
	var lastnote = ''
	for(var me=0; me < numbers.length;me++){

		if(numbers[me].appliedCharacterStyle == myDocument.characterStyles.item("ChapterNum")){ 

			notechapter = numbers[me].contents
			verse = 1

		} else if(numbers[me].appliedCharacterStyle == myDocument.characterStyles.item("VerseNum")){ 
			verse = numbers[me].contents
		}

		var thisnote = timeit(get_foot_array_val,[note,notechapter,verse]) 

		if(thisnote){

			
			if(!myFrame.parentPage.textFrames.itemByName('note-frame').isValid){
				var footframe = timeit(addFootnoteTextFrame,[myFrame.parentPage])
			} else {
				footframe = myFrame.parentPage.textFrames.itemByName('note-frame')	
			}

			
			for(var x=0;x < thisnote.length;x++){

				
				// get reference only if verse changed
				
				verse !== lastverse && footframe.contents += thisnote[x].slice(1,2) + ":" + thisnote[x].slice(2,3) + String.fromCharCode(8201)  

				// add marker if notes are not the same
				thisnote !== lastnote && marker = alpha_increment()
				thisnote !== lastnote && footframe.contents += marker + thisnote[x].slice(5) + String.fromCharCode(8203, 8194, 8203)
				// em space 8195
				// en space 8194
				// thin space 8201

				// if notes are the same, put the marker in the new place as well... in the verse.
				// add the marker to the verse.
				
				// if (myFindVerse == 1 || myFindWordNum <= 0) { // && myFindWordNum  != -1){
				// 	if (myFindWordNum <= 0 && myFindVerse == 1) {
				// 		app.changeGrepPreferences = app.findGrepPreferences = null;
				// 		app.findGrepPreferences.findWhat = "(PSALM |Chapter )" + myFindChapter + "~b[^\"]+?\\<\\K";
				// 	} else {
				// 		app.changeGrepPreferences = app.findGrepPreferences = null;
				// 		app.findGrepPreferences.findWhat = "(PSALM |Chapter )" + myFindChapter + "~b[^\"]+?\\<\\K(?=" + myFindWord + ")";
				// 	}
				// } else {
				// 	app.changeGrepPreferences = app.findGrepPreferences = null;
				// 	app.findGrepPreferences.findWhat = "(PSALM |Chapter )" + myFindChapter + "~b[^\"]+?\\<" + myFindVerse + "(~%|\\t)+(\\b\\w+?(-\\b\\w+?)?\\b.+?){" + myFindWordNum + "}\\<\\K(?=" + myFindWord + ")";
				// }
				// try {
				// 	me = myFrame.parentStory.findGrep();
				// 	me1 = me[0].insertionPoints[0];
				// 	me1.contents = myChangeText;
				// } catch (e) {
				// 	try {
				// 		app.changeGrepPreferences = app.findGrepPreferences = null;
				// 		app.findGrepPreferences.findWhat = "(PSALM |Chapter )" + myFindChapter + "~b[^\"]+?\\<" + myFindVerse + "(~%|\\t)+[^\"]+?\\<\\K(?=" + myFindWord + ")";
				// 		try {
				// 			me = myFrame.parentStory.findGrep();
				// 			me1 = me[0].insertionPoints[0];
				// 			me1.contents = myChangeText;
				// 		} catch (e) {alert(e)}
				// 	} catch (e) {alert(e)}
				// }


				// to do :
				// what if the verse crosses over pages?
				// need to pop notes from parrent array so they are not intested 2 times
				// what if the note is so long (adds a new line to the note paragraph) that the verse get pushed to the next page?

				lastverse = verse
				lastnote = thisnote[x]
			}

			if(myFrame.parentPage.textFrames.itemByName('note-frame').isValid){
		
				footframe.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote")
				
				timeit(footnoteSuperscript,[footframe]);
				timeit(bold,[footframe, "\\d+:\\d+~s"])
				timeit(noBreak,[footframe, "\\d+:\\d+\\s\\l\\s[\\l\\u]+"]);
			}
		}
	}
}


function adjustFootFrame(){

		// if there is a footnote text frame scoot it up here.
		// 1 get base of text frame
		// 2 set top of footframe to text frame baseline + 1

		var noteFrame = aPage.textFrames.itemByName('note-frame')
		// turn off autosizing.
		noteFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;

		// get last baseline
		var lastBaseline = aPage.textFrames.itemByName('frame1').lines[-1].characters[-1].baseline;
		lastBaseline += .27*myDocument.gridPreferences.baselineDivision
		
		// update bounds
		var bounds = noteFrame.geometricBounds
		bounds[0] = lastBaseline
		noteFrame.geometricBounds = bounds;
	
		// turn on auto sizing
		noteFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_CENTER_POINT;
		noteFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY

	}
