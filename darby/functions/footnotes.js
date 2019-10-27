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

function add_foot_frame(myFrame){
	if(!myFrame.parentPage.textFrames.itemByName('note-frame').isValid){
				var footframe = timeit(addFootnoteTextFrame,[myFrame.parentPage])
			} else {
				var footframe = myFrame.parentPage.textFrames.itemByName('note-frame')	
			}
	return footframe
}

function verse_num_on_page(myFrame,item,indexOffset){
	// if frame is emtpy return false
	if(myFrame.contents.length < 1){return false}

	// for verse numbers
	var myGrep = "[^\\d]\\K"+item.contents+"(?=[^\\d])";
	app.findGrepPreferences = null
	app.findGrepPreferences.findWhat = myGrep;

	var foundItem = myFrame.findGrep()
	if (foundItem.length > 0 && foundItem[foundItem.length-1].insertionPoints[0].index >= item.insertionPoints[0].index + indexOffset-1 && foundItem[foundItem.length-1].insertionPoints[0].index <= myFrame.insertionPoints[-1].index ){				
		return true;
	}
	// for chapter #'s
	var myGrep = "^\\K"+item.contents+"(?=[^\\d])";
	app.findGrepPreferences.findWhat = myGrep;

	var foundItem = myFrame.findGrep()
	if (foundItem.length > 0 && foundItem[foundItem.length-1].insertionPoints[0].index >= item.insertionPoints[0].index + indexOffset-1 && foundItem[foundItem.length-1].insertionPoints[0].index <= myFrame.insertionPoints[-1].index ){				
		return true;
	}
	return false;
}

function word_on_page(myFrame,verseNum,wordNum,word,nextVerseNum,indexOffset){
	
	// if frame is emtpy return false
	if(myFrame.contents.length < 1){return false}

	app.findGrepPreferences = null
	//$.writeln(verseNum,word,nextVerseNum)
	// first check if the word is on the page, but before any numbers, except next verse, appear
	var myGrep = nextVerseNum == false ? "[^\\d]*"+word+"(?=[^\\d]*)" : "[^\\d]*"+word+"(?=[^\\d]*"+nextVerseNum.toString()+")"
	//$.writeln(myGrep)
	app.findGrepPreferences.findWhat = myGrep
	var foundItem = myFrame.findGrep()

	if (foundItem.length > 0 && foundItem[0].insertionPoints[-1].index >= verseNum.insertionPoints[0].index + indexOffset && foundItem[0].insertionPoints[-1].index <= myFrame.insertionPoints[-1].index ){
		//$.writeln("case1")
		return true
	} 

	// if the # is a chapter #
	myGrep = "^"+verseNum.contents.toString()+"\\s*(\\b\\w+?(-\\b\\w+?)?\\b[^`]+?){"+wordNum.toString() +"}(?=" + word + ")";
	//$.writeln(myGrep)
	app.findGrepPreferences.findWhat = myGrep
	var foundItem = myFrame.findGrep()

	if (foundItem.length > 0 && foundItem[0].insertionPoints[-1].index >= verseNum.insertionPoints[0].index + indexOffset && foundItem[0].insertionPoints[-1].index <= myFrame.insertionPoints[-1].index ){
		//$.writeln("case2")
		return true
	} 

	// if the # is a verse #
	wordNum--
	myGrep = verseNum.contents.toString() + "[^`]+?(\\b\\w+?(-\\b\\w+?)?\\b[^`]+?){"+wordNum.toString() +"}(?=" + word + ")";
	//$.writeln(myGrep)
	app.findGrepPreferences.findWhat = myGrep
	var foundItem = myFrame.findGrep()

	if (foundItem.length > 0 && foundItem[0].insertionPoints[-1].index >= verseNum.insertionPoints[0].index + indexOffset && foundItem[0].insertionPoints[-1].index <= myFrame.insertionPoints[-1].index ){
	//			$.writeln("case3")
		return true
	} 
	//			$.writeln("case4")
	// it is possible that the word breaks over the page end..
	// need to get the containing paragraph of the # and the check inside the paragraph.
	// if the last index of finds is on the page, then cool.
	// the last index is before the word starts so we should be good.

	// get the index of the verse number (last time it is found in frame)
	app.findGrepPreferences = app.changeGrepPreferences = null
	app.findGrepPreferences.findWhat = verseNum.contents.toString();
	me = myFrame.findGrep()

	// if nothing found then give up
	if (me.length < 1){return false;}

	// get the start and stop indexes of the paragraph
	var startIndex = me[me.length-1].insertionPoints[0].index
	var endIndex = me[me.length-1].paragraphs[0].insertionPoints[-1].index
	var searchText = myFrame.parentStory.insertionPoints.itemByRange(startIndex,endIndex).getElements()[0]

	// try to find here...
	// generic
	var myGrep = nextVerseNum == false ? "[^\\d]*"+word+"(?=[^\\d]*)" : "[^\\d]*"+word+"(?=[^\\d]*"+nextVerseNum.toString()+")"
	app.findGrepPreferences.findWhat = myGrep
	var foundItem = searchText.findGrep()
	if (foundItem.length > 0 && foundItem[0].insertionPoints[-1].index >= verseNum.insertionPoints[0].index + indexOffset && foundItem[0].insertionPoints[-1].index <= myFrame.insertionPoints[-1].index ){return true}
					// chapter #
	myGrep = "^"+verseNum.contents.toString()+"\\s*(\\b\\w+?(-\\b\\w+?)?\\b[^`]+?){"+wordNum.toString() +"}(?=" + word + ")";
	app.findGrepPreferences.findWhat = myGrep
	var foundItem = searchText.findGrep()
	if (foundItem.length > 0 && foundItem[0].insertionPoints[-1].index >= verseNum.insertionPoints[0].index + indexOffset && foundItem[0].insertionPoints[-1].index <= myFrame.insertionPoints[-1].index ){return true}
	// verse #
	myGrep = verseNum.contents.toString() + ".+?(\\b\\w+?(-\\b\\w+?)?\\b[^`]+?){"+wordNum.toString() +"}(?=" + word + ")";
	app.findGrepPreferences.findWhat = myGrep
	var foundItem = searchText.findGrep()
	if (foundItem.length > 0 && foundItem[0].insertionPoints[-1].index >= verseNum.insertionPoints[0].index + indexOffset && foundItem[0].insertionPoints[-1].index <= myFrame.insertionPoints[-1].index ){return true}

	return false
		
	
			
		
}
var lastNoteChapter = 0
var lastverse = 0
var lastnote = ''
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

	// if frame is emtpy skip
	if(myFrame.contents.length < 1){return false}
	
	// get all numbers in frame. need to get last number from previous page
	app.changeGrepPreferences = app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\d+";
	var numbers = myFrame.findGrep();
	
	// loop through them, one at a time.
	// check if they are still on the page. don't use grep, just check index/baseline?
	// if still on the page, then add the note. Don't care if it changed col, etc.
	myFrame.name == 'frame1' && lastverse = 0
	myFrame.name == 'frame1' && lastnote = ''
	var indexOffset = 0
	var lastIndex = 0
	myFrame.name == 'frame1' && lastNoteChapter = 0
	var noteverse = 0

	for(var me=0; me < numbers.length;me++){
		var myParagraphStyle = numbers[me].appliedParagraphStyle.name
		var myNumber = numbers[me]
		//$.writeln(myNumber.contents)
		var myNextNumber = me+1 < numbers.length ? numbers[me+1].contents : false

		// check if verse is still on page. if not, skip out
		var verseOnPage = timeit(verse_num_on_page,[myFrame,myNumber,indexOffset])
		if (verseOnPage == false){
			//$.writeln(myNumber.contents.toString() + ' not on page founds');
			break;
		}
		
		// set chapter and verse variables
		if(myNumber.appliedCharacterStyle == myDocument.characterStyles.item("ChapterNum")){ 

			notechapter = myNumber.contents
			noteverse = 1

		} else if(myNumber.appliedCharacterStyle == myDocument.characterStyles.item("VerseNum")){ 
			noteverse = myNumber.contents
		}

		// get note from array
		var thisnote = timeit(get_foot_array_val,[note,notechapter,noteverse]) 
		
		if(thisnote){

			 //$.writeln(noteverse)
			 //$.writeln(thisnote)
		
			var ootframe = timeit(add_foot_frame,[myFrame])
			var tempIndexOffset = 0
			var g = true

			// there may be several notes on each verse. loop through them.
			for(var x=0;x < thisnote.length;x++){
				var currentNote = thisnote[x].slice(5)
				// reset footframe to current page
				footframe = timeit(add_foot_frame,[myFrame])
				myFindWordNum = thisnote[x].slice(3,4); myFindWordNum--;
				myFindWord = thisnote[x].slice(4,5)
				// verify that the word is still on the page.
				var wordOnPage = myFindWordNum < 0 ? true : timeit(word_on_page,[myFrame,myNumber,myFindWordNum,myFindWord[0],myNextNumber,indexOffset])

				// if there was a word found that was after the verse #, then it is then we assume safe? 
				// possibly I should be checking for the word # as well in case a word is repeated?
				// if the word was not found after the verse number, then...
				if (wordOnPage === false){

					// the word was not found on the page.. it must be on the next page!
					// if its found we need to add it to the next page.
					//$.writeln('checking next page for potentional note location')
					var wordOnNextPage = timeit(word_on_page,[myFrame.nextTextFrame,myNumber,myFindWordNum,myFindWord[0],myNextNumber,indexOffset])
					
					if (wordOnNextPage === true){
						if(myFrame.name === 'frame2'){footframe = timeit(add_foot_frame,[myFrame.nextTextFrame])}
					} else {
						$.writeln("note word location not found for " + notechapter.toString() + ":" + noteverse.toString() + " note word: " + myFindWord[0].toString());
						asdf;
					}
				}							

				// get reference only if verse changed
				
				var alreadyExists = ''
				
				// em space 8195
				// en space 8194
				// thin space 8201
				
				// check if note already exists
				if(footframe.contents.length > 0){
					app.findTextPreferences = null
					app.findTextPreferences.findWhat = currentNote[0].replace('<i>','').replace('</i>','')
					var alreadyExists = footframe.findText()
					
					if(alreadyExists.length > 0){
						// get marker of existing note
						markerIndex = footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-2,alreadyExists[0].insertionPoints[0].index-1).insertionPoints[0].index
						marker = footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-2,alreadyExists[0].insertionPoints[0].index-1).getElements()[0].contents
						// get chapter number of the marker. this could be different than
						// the "lastNoteChapter" wich is the chapter # of the last note that 
						// was insereted.

						// safest way to get last chapter is to grep and get the match with an index
						// just before the marker.


						var myLocalLastChapter = timeit(getLastChapter,[footframe,markerIndex])

						if(noteverse !== lastverse){
							// insert reference of current verse into footnotes.
							// if the foot note is already several long (ex: 1:17k asdfa l asdfaf), then we want to re-add the first 
							// full reference.
							var isNumberCheck = footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-4,alreadyExists[0].insertionPoints[0].index-3).contents

							if(!isNaN(isNumberCheck.toString().replace(String.fromCharCode(8194),'asdf'))){
								
								var newRef = notechapter === myLocalLastChapter ? thisnote[x].slice(2,3) : thisnote[x].slice(1,2) + ":" + thisnote[x].slice(2,3)
								footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-3,alreadyExists[0].insertionPoints[0].index-3).contents = ", " + newRef
							} else{

								var lastRef = getLastFootRef(footframe,alreadyExists[0].insertionPoints[0].index-3)
								var newRef = notechapter === myLocalLastChapter ? thisnote[x].slice(2,3) : thisnote[x].slice(1,2) + ":" + thisnote[x].slice(2,3)
								footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-3,alreadyExists[0].insertionPoints[0].index-3).contents = lastRef + ", " + newRef+ String.fromCharCode(8201)
							}

						}
						lastverse = noteverse
						//asfdasdfasfd;
					} else {
						// if the note does not already exist.
						noteverse !== lastverse && footframe.contents += thisnote[x].slice(1,2) + ":" + thisnote[x].slice(2,3) + String.fromCharCode(8201)
						marker = alpha_increment()
						footframe.contents += marker + currentNote + String.fromCharCode(8203, 8194, 8203)
						lastverse = noteverse
					}

				} else {
					// this is for first item added to frame.
					noteverse !== lastverse && footframe.contents += thisnote[x].slice(1,2) + ":" + thisnote[x].slice(2,3) + String.fromCharCode(8201)
					noteverse == lastverse && footframe.contents += String.fromCharCode(8203, 8194, 8203)
					marker = alpha_increment()
					footframe.contents += marker + currentNote + String.fromCharCode(8203, 8194, 8203)
					lastverse = noteverse
				}
					
				// add the marker to the verse.
				var currentInsertion = numbers[me].insertionPoints[0].index + indexOffset
				var nextInsertion = me+1 < numbers.length ? numbers[me+1].insertionPoints[0].index + indexOffset : myFrame.parentStory.insertionPoints[-1].index - indexOffset - tempIndexOffset
				var searchText = myFrame.parentStory.insertionPoints.itemByRange(currentInsertion,nextInsertion + tempIndexOffset).getElements()[0]
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
						myGrep = "^\\d+\\s*(\\b\\w+?(-\\b\\w+?)?\\b[^`]+?){"+myFindWordNum.toString() +"}(?=" + myFindWord + ")";
					} else {
						myFindWordNum--
						myGrep = "\\d+.+?(\\b\\w+?(-\\b\\w+?)?\\b[^`]+?){"+myFindWordNum.toString() +"}(?=" + myFindWord + ")";
					}
				  	//$.writeln(myGrep)
				  	app.findGrepPreferences.findWhat = myGrep
				}
					
			 	foundNoteLoc =searchText.findGrep();
			 			
			 	if (foundNoteLoc.length > 0) {
			 		var startIndex = foundNoteLoc[0].insertionPoints[-1].index
			 		foundNoteLoc[0].insertionPoints[-1].contents= SpecialCharacters.SIXTH_SPACE
					foundNoteLoc[0].insertionPoints[-1].contents = marker
					tempIndexOffset +=2
			
			 		myFrame.parentStory.characters.itemByRange(startIndex,startIndex+1).appliedCharacterStyle = myDocument.characterStyles.item("SuperScript")

			 	} else {

			 		myGrep = "\\d+[^`]+(?=" + myFindWord + ")"
			 		app.findGrepPreferences.findWhat = myGrep
			 		
			 		foundNoteLoc =searchText.findGrep();
			 		if (foundNoteLoc.length > 0) {
				 		var startIndex = foundNoteLoc[0].insertionPoints[-1].index
				 		foundNoteLoc[0].insertionPoints[-1].contents = SpecialCharacters.SIXTH_SPACE
						foundNoteLoc[0].insertionPoints[-1].contents = marker
					
						tempIndexOffset +=2
				
				 		myFrame.parentStory.characters.itemByRange(startIndex,startIndex+1).appliedCharacterStyle = myDocument.characterStyles.item("SuperScript")

				 	} else {
				 		$.writeln(searchText.contents)
				 		$.writeln(myGrep + "\rnote location not found  for " + notechapter.toString() + ":" + noteverse.toString()); asdfdafda;}
				 	}	

		 		// formatting must be done before doing location checks
				if(myFrame.parentPage.textFrames.itemByName('note-frame').isValid){
		
					footframe.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote")
					
					timeit(footnoteSuperscript,[footframe]);
					// don't want all references bold, just the ones for the note 😀
					timeit(bold,[footframe, "\\d+:\\d+(,?\\d+)*~s"])
					timeit(noBreak,[footframe, "\\d+:\\d+(,?\\d+)*\\s\\l\\s[\\l\\u]+"]);
					timeit(noBreak, [footframe, "\\l\\.\\d+:\\d+"])
					timeit(noBreak, [footframe, "\\d+:\\d+"])
				}
				thisIndex = footframe.insertionPoints[-1].index
		
				// check if the verse is still on the page. if not, then start pruning lines off the note frame
				// and moving them to the next page. but... don't take off the whole note...

				var q = 0
				var verseOnPage = timeit(verse_num_on_page,[myFrame,myNumber,indexOffset])
				var wordOnPage = timeit(word_on_page,[myFrame,myNumber,myFindWordNum,myFindWord[0],myNextNumber,indexOffset])	
				
				// reset text frame to the current page. we may have already added one on the next page
				// and don't care about it yet..

				footframe = timeit(add_foot_frame,[myFrame])		
				timeit(removeLeadingSpace,[footframe])
				while (q < 10 && (!verseOnPage || !wordOnPage) && myFrame.name === 'frame2'){
					
					var textToMove = ' '
				
					// remove lines until ther verse number is found. if verse number is never found 
					// move the entire note to the next page.

					// this fails if the content has already been moved to the next page above.
					// so try catch

					// don't remove anything that was not part of the current note.
					
					try{
						if (footframe.lines[-1].insertionPoints[0].index < lastIndex){
							g = false
							textToMove = textToMove + footframe.parentStory.insertionPoints.itemByRange(lastIndex,footframe.insertionPoints[-1].index).getElements()[0].contents
							footframe.insertionPoints.itemByRange(lastIndex,footframe.insertionPoints[-1].index).remove()
							textToMove.length > 0 && newfootframe = timeit(add_foot_frame,[myFrame.nextTextFrame])
							textToMove.length > 0 && newfootframe.contents = textToMove + newfootframe.contents
							
							// if this happens we need to change the paragraph justify rull to justify all except last line left.
							footframe.parentStory.justification=Justification.LEFT_JUSTIFIED;

							// break because we have already moved the full note.
							break;

						} else {
							// move one line at a time
							textToMove = textToMove + footframe.lines[-1].contents
							footframe.lines[-1].remove()
							textToMove.length > 0 && newfootframe = timeit(add_foot_frame,[myFrame.nextTextFrame])
							textToMove.length > 0 && newfootframe.contents = textToMove + newfootframe.contents

							// if this happens we need to change the paragraph justify rull to justify all
							footframe.parentStory.justification=Justification.FULLY_JUSTIFIED;
						}
						timeit(removeLeadingSpace,[newfootframe])

						
					} catch(e){break;}

					// recompose is needed when letting text "come back" onto the page.

					myDocument.recompose(); 
					//$.writeln(myFrame.contents)
					verseOnPage = timeit(verse_num_on_page,[myFrame,myNumber,indexOffset])
					wordOnPage = timeit(word_on_page,[myFrame,myNumber,myFindWordNum,myFindWord[0],myNextNumber,indexOffset])	
					//$.writeln(verseOnPage,wordOnPage)
					q++
	
				}
				
				lastnote = currentNote
				lastIndex = thisIndex
				lastNoteChapter = notechapter
				
				if (g == false){break;}

			}

			indexOffset += tempIndexOffset





		//	if(marker == 'u'){asfasdfas;}
		}
	}
}


function metricalChapterNumFix(stuff){

	// 1. remove all manual line breaks with three tabs following
	// 2. recompute
	// 3. add back all manual line breaks

 	var myParagraph = stuff.paragraphs[0]
 	app.findGrepPreferences = app.changeGrepPreferences = null

 	app.findGrepPreferences.findWhat = "\\n\\t\\t\\t"
 	app.changeGrepPreferences.changeTo = ''
 	myParagraph.changeGrep()

 
	myDocument.recompose(); 
	for (var x=0; x< stuff.paragraphs[0].lines.length;x++){
		var line = stuff.paragraphs[0].lines[x]
		if((line.characters[-1].contents === ' ' || line.characters[-1].contents === SpecialCharacters.DISCRETIONARY_LINE_BREAK) && (line.characters[-1].appliedParagraphStyle.name === 'metricalVerseTwoColumn' || line.characters[-1].appliedParagraphStyle.name === 'mVerse1')){
		//	$.writeln(line.characters[-1].appliedParagraphStyle.name)
		// if it is a metrical v1 and line 2 then we only need 2 tabs

		if(line.characters[-1].appliedParagraphStyle.name === 'mVerse1' && x == 1){
			line.characters[-1].contents = '\n\t\t'
		}
		else {
			line.characters[-1].contents = '\n\t\t\t'
		}
		//	$.writeln(line.contents)
		}
	}

}

function getLastChapter(myFrame, myIndex){

	app.findGrepPreferences = app.changeGrepPreferences = null
	app.findGrepPreferences.findWhat = '\\d+:\\d+'
	var myFinds = myFrame.findGrep()

	// flip array so we start with biggest index. 
	myFinds.reverse()
	// loop through results. return when the index is < myIndex
	for(var q=0;q <myFinds.length; q++){
		if(myFinds[q].insertionPoints[-1].index < myIndex){
			var myText = myFinds[q].contents

			return myText.split(":")[0]
		}
	}



}
function removeLeadingSpace(myFrame){
	app.findGrepPreferences = app.changeGrepPreferences = null
	app.findGrepPreferences.findWhat = "^~k*\\s+~k*"
	app.changeGrepPreferences.changeTo = ""
	myFrame.parentStory.changeGrep()
}
function getLastFootRef(me,location){

	if (me.contents.length < 1) {return;}
	app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = "(\\d+:\\d+)(?=[~s|,])";
	var myFinds = me.parentStory.findGrep().reverse()
	for (var x = 0; x < myFinds.length; x++){
		if (myFinds[x].insertionPoints[-1].index < location){
			return myFinds[x].contents
		}
	}
	$.writeln("dead in the water")
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
