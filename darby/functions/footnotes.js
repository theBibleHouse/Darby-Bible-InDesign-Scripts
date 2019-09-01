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
    for(var c=array.length-1;c>=0;c--){
        if(array[c][1]==chapter && array[c][2]==verse){data.unshift(array[c]); array.splice(c)}
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

	1. get all numbers on page, loop through them. make sure number is still on the page
	2. for each reference check the array and remove it when found. add in the note letter in the verse.
	3. add it to the text box
	4. verify that verse number is still on the page. 
	5. if it is not on the page anymore then reduce text frame size until it is back. link text frame to next page so that 
	   the excess text and flow over.

	at the end print out anything that is left in the note/date/cross arrays to see what was not found.

*/

	// get all numbers on page. need to get last number from previous page
	app.changeGrepPreferences = app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\d+";
	var numbers = myFrame.findGrep();

	// loop through them, one at a time.
	// check if they are still on the page. don't use grep, just check index/baseline?
	// if still on the page, then add the note. Don't care if it changed col, etc.
	var lastverse = 0
	var lastnote = ''
	var indexOffset = 0

	for(var me=0; me < numbers.length;me++){

		// check if verse is still on page. if not, skip?
		// what if the verse started on the last page?
		$.writeln(numbers[me].contents)
		app.findGrepPreferences = null
		app.findGrepPreferences.findWhat = numbers[me].contents
		var foundNumber = myFrame.findGrep()

		if (foundNumber){
			if (foundNumber.length > 0){				
				if (foundNumber[foundNumber.length-1].insertionPoints[0].index >= numbers[me].insertionPoints[0].index + indexOffset){

				}else {break;}
			} else {$.writeln('not on page founds');break;}
		} else {$.writeln('no founds');break;}

		if(numbers[me].appliedCharacterStyle == myDocument.characterStyles.item("ChapterNum")){ 

			notechapter = numbers[me].contents
			noteverse = 1

		} else if(numbers[me].appliedCharacterStyle == myDocument.characterStyles.item("VerseNum")){ 
			noteverse = numbers[me].contents
		}

		var thisnote = timeit(get_foot_array_val,[note,notechapter,noteverse]) 
		if(thisnote){
		
			if(!myFrame.parentPage.textFrames.itemByName('note-frame').isValid){
				var footframe = timeit(addFootnoteTextFrame,[myFrame.parentPage])
			} else {
				footframe = myFrame.parentPage.textFrames.itemByName('note-frame')	
			}

			var tempIndexOffset = 0
			for(var x=0;x < thisnote.length;x++){

				myFindWordNum = thisnote[x].slice(3,4)
				myFindWordNum--
				myFindWord = thisnote[x].slice(4,5)
				$.writeln(myFindWord[0])

				// verify that the word is still on the page.
				app.findTextPreferences = null
				app.findTextPreferences.findWhat = myFindWord[0]
				var foundWord = myFrame.findText()

				if (foundWord){
					// if there was a word found that was after the verse #, then it is then we assume safe? 
					// possibly I should be checking for the word # as well in case a word is repeated?
					if (foundWord.length > 0 && foundWord[foundWord.length-1].insertionPoints[0].index >= numbers[me].insertionPoints[0].index + indexOffset){
					} else {
						// the word was not found on the page.. it must be on the next page!
						// if its found we need to add it to the next page.
						$.writeln('checking next page for potentional note location')
						foundWord = myFrame.nextTextFrame.findText()
						if (foundWord){
							if (foundWord.length > 0){
								if (foundWord[foundWord.length-1].insertionPoints[0].index >= numbers[me].insertionPoints[0].index + indexOffset){
									if(!myFrame.nextTextFrame.parentPage.textFrames.itemByName('note-frame').isValid){
										var footframe = timeit(addFootnoteTextFrame,[myFrame.nextTextFrame.parentPage])
									} else {
										footframe = myFrame.nextTextFrame.parentPage.textFrames.itemByName('note-frame')	
			}
								} else {$.writeln("2a");break;}
							} else {$.writeln("2b");break;}
						} else {$.writeln("2c");break;}
				}

				}else {$.writeln("3");break;}

				// get reference only if verse changed
				noteverse !== lastverse && footframe.contents += thisnote[x].slice(1,2) + ":" + thisnote[x].slice(2,3) + String.fromCharCode(8201)  

				// add marker if notes are not the same
				thisnote !== lastnote && marker = alpha_increment()
				thisnote !== lastnote && footframe.contents += marker + thisnote[x].slice(5) + String.fromCharCode(8203, 8194, 8203)
				// em space 8195
				// en space 8194
				// thin space 8201

				// if notes are the same, put the marker in the new place as well... in the verse.
				// add the marker to the verse.

				var currentInsertion = numbers[me].insertionPoints[0].index + indexOffset
				var nextInsertion = me+1 < numbers.length ? numbers[me+1].insertionPoints[0].index + indexOffset : myFrame.parentStory.insertionPoints[-1].index - indexOffset
				var searchText = myFrame.parentStory.insertionPoints.itemByRange(currentInsertion,nextInsertion).getElements()[0]
				var myGrep = ''
				app.changeGrepPreferences = app.findGrepPreferences = null;
				
				if (myFindWordNum <= 0) {
					// this is for notes that are on the whole ch. typically psalms, or are on the first word of the vs
					myGrep = "\\d+\\s*"
					app.findGrepPreferences.findWhat = myGrep;
				} else {
					// if not a chapter # then we need to drop off one from find work # because the verse # is stuck againts
					// the first word... so there is no word boundry
					if(numbers[me].appliedCharacterStyle == myDocument.characterStyles.item("ChapterNum")){
						myGrep = "^\\d+\\s*(\\b\\w+?(-\\b\\w+?)?\\b.+?){"+myFindWordNum.toString() +"}(?=" + myFindWord + ")";
					} else {
						myFindWordNum--
						myGrep = "\\d+.+?(\\b\\w+?(-\\b\\w+?)?\\b.+?){"+myFindWordNum.toString() +"}(?=" + myFindWord + ")";
					}
				  		
				  	app.findGrepPreferences.findWhat = myGrep
				}
					
				 	foundNoteLoc =searchText.findGrep();
				 	
				 	if (foundNoteLoc) {			 		
					 	if (foundNoteLoc.length > 0) {
					 		var startIndex = foundNoteLoc[0].insertionPoints[-1].index
					 		foundNoteLoc[0].insertionPoints[-1].contents= SpecialCharacters.SIXTH_SPACE
							foundNoteLoc[0].insertionPoints[-1].contents = marker
						
							tempIndexOffset +=2
					
					 		myFrame.parentStory.characters.itemByRange(startIndex,startIndex+1).appliedCharacterStyle = myDocument.characterStyles.item("SuperScript")

					 	} else {$.writeln(myGrep + "\rnote location not found for " + notechapter.toString() + ":" + noteverse.toString()); asdfdafda;}
	
			 		} else {$.writeln(myGrep + "\rnote location not found for " + notechapter.toString() + ":" + noteverse.toString()); asdf}			

				// to do :
				// what if the verse crosses over pages?
				// need to pop notes from parrent array so they are not intested 2 times
				// what if the note is so long (adds a new line to the note paragraph) that the verse get pushed to the next page?

				lastverse = noteverse
				lastnote = thisnote[x]
			}

			indexOffset += tempIndexOffset
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
