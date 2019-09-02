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

function item_on_page(myFrame,item,indexOffset,word){

	// if frame is emtpy return false
	if(myFrame.contents.length < 1){return false}

	app.findGrepPreferences = null
	app.findGrepPreferences.findWhat = word || item.contents
	var foundItem = myFrame.findGrep()

	if (foundItem.length > 0 && foundItem[foundItem.length-1].insertionPoints[0].index >= item.insertionPoints[0].index + indexOffset){				
		return true
	} else {return false}		
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

	// if frame is emtpy skip
	if(myFrame.contents.length < 1){return false}
	
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
	var lastIndex = 0

	for(var me=0; me < numbers.length;me++){

		var myNumber = numbers[me]

		// check if verse is still on page. if not, skip out
		var verseOnPage = item_on_page(myFrame,myNumber,indexOffset,false)
		if (verseOnPage == false){$.writeln('not on page founds');break;}
		
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

			// $.writeln(noteverse)
			// $.writeln(thisnote)
		
			var footframe = add_foot_frame(myFrame)


			var tempIndexOffset = 0
			var g = true

			// there may be several notes on each verse. loop through them.
			for(var x=0;x < thisnote.length;x++){
				var currentNote = thisnote[x].slice(5)
				// reset footframe to current page
				footframe = add_foot_frame(myFrame)
				myFindWordNum = thisnote[x].slice(3,4); myFindWordNum--;
				myFindWord = thisnote[x].slice(4,5)

				// verify that the word is still on the page.
				var wordOnPage = item_on_page(myFrame,myNumber,indexOffset,myFindWord[0])
				
				// if there was a word found that was after the verse #, then it is then we assume safe? 
				// possibly I should be checking for the word # as well in case a word is repeated?
				// if the word was not found after the verse number, then...
				if (wordOnPage === false){

					// the word was not found on the page.. it must be on the next page!
					// if its found we need to add it to the next page.
					$.writeln('checking next page for potentional note location')
					var wordOnNextPage = item_on_page(myFrame.nextTextFrame,myNumber,indexOffset,myFindWord[0])
					
					if (wordOnNextPage === true){
						footframe = add_foot_frame(myFrame.nextTextFrame)
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
					marker = footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-2,alreadyExists[0].insertionPoints[0].index-1).getElements()[0].contents
					if(noteverse !== lastverse){
						// insert reference of current verse into footnotes.
						footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-3,alreadyExists[0].insertionPoints[0].index-3).contents = "," + thisnote[x].slice(2,3)
					}

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
				marker = alpha_increment()
				footframe.contents += marker + currentNote + String.fromCharCode(8203, 8194, 8203)
				lastverse = noteverse
			}
				
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

		 		// formatting must be done before doing location checks
				if(myFrame.parentPage.textFrames.itemByName('note-frame').isValid){
		
					footframe.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote")
					
					timeit(footnoteSuperscript,[footframe]);
					timeit(bold,[footframe, "\\d+:\\d+~s"])
					timeit(noBreak,[footframe, "\\d+:\\d+\\s\\l\\s[\\l\\u]+"]);
				}
				thisIndex = footframe.insertionPoints[-1].index

				// to do :
				// what if the verse crosses over pages?
				// need to pop notes from parrent array so they are not intested 2 times
				// what if the note is so long (adds a new line to the note paragraph) that the verse get pushed to the next page?

				// check if the verse is still on the page. if not, then start pruning lines off the note frame
				// and moving them to the next page. but... don't take off the whole note...

				var q = 0
				var verseOnPage = item_on_page(myFrame,myNumber,indexOffset,false)	
				// reset text frame to the current page. we may have already added one on the next page
				// and don't care about it yet..
				footframe = add_foot_frame(myFrame)		
				while (q < 10 && !verseOnPage){
					var textToMove = ' '
				
					// remove lines until ther verse number is found. if verse number is never found 
					// move the entire note to the next page.
					
					// don't remove anything that was not part of the current note.
					
					if (footframe.lines[-1].insertionPoints[0].index < lastIndex){
						g = false
						textToMove = textToMove + footframe.parentStory.insertionPoints.itemByRange(lastIndex,footframe.insertionPoints[-1].index).getElements()[0].contents
						footframe.insertionPoints.itemByRange(lastIndex,footframe.insertionPoints[-1].index).remove()
					} else {
						textToMove = textToMove + footframe.lines[-1].contents
						footframe.lines[-1].remove()
					}

					textToMove.length > 0 && newfootframe = add_foot_frame(myFrame.nextTextFrame)
					textToMove.length > 0 && newfootframe.contents = textToMove + newfootframe.contents
					
					if (g == false){break;}
					q++
					verseOnPage = item_on_page(myFrame,myNumber,indexOffset,false)
				}
				


				
				lastnote = currentNote
				lastIndex = thisIndex
				if (g == false){break;}
			}

			indexOffset += tempIndexOffset
			
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
