function new_foot(myFrame){
	// $.writeln(myFrame.name)
	if(myFrame.name=='frame1'){
		add_footnotes(myFrame);
		if(myFrame.nextTextFrame.name=="frame2"){
			// $.writeln("new_foot on frame 2")
			add_footnotes(myFrame.nextTextFrame);
		}
	}
}

function get_foot_array_val(array,chapter,verse){
	var data = [];
    for(var c=array.length-1;c>=0;c--){
        if(array[c][1]==chapter && array[c][2]==verse){data.unshift(array[c]); array.splice(c);}
    }
    var result = data.length < 1 ? false : data;

    return result;
}


function alpha_increment()
{
    alpha = alpha === 'z' ? 'a' : String.fromCharCode(alpha.charCodeAt()+1);
    return alpha;
}

function add_foot_frame(myFrame){
	var footframe;
	if(!myFrame.parentPage.textFrames.itemByName('note-frame').isValid){
		footframe = timeit(addFootnoteTextFrame,[myFrame.parentPage]);
	} else {
		footframe = myFrame.parentPage.textFrames.itemByName('note-frame');
	}
	return footframe;
}

function verse_num_on_page(myFrame,item,indexOffset){
	// if frame is emtpy return false
	if(myFrame.contents.length < 1){return false;}

	// for verse numbers
	var myGrep = "[^\\d]\\K"+item.contents+"(?=[^\\d])";
	// $.writeln(myGrep)
	app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = myGrep;

	var foundItem = myFrame.findGrep();
	// $.writeln(foundItem.length)
	if (foundItem.length > 0 && foundItem[foundItem.length-1].insertionPoints[0].index >= item.insertionPoints[0].index + indexOffset-1 && foundItem[foundItem.length-1].insertionPoints[0].index <= myFrame.insertionPoints[-1].index ){
		return true;
	}
	// for chapter #'s
	myGrep = "\\<\\K"+item.contents+"(?=[^\\d])";
	// $.writeln(myGrep)
	app.findGrepPreferences.findWhat = myGrep;

	foundItem = myFrame.findGrep();
	// $.writeln(foundItem.length)
	if (foundItem.length > 0 && foundItem[foundItem.length-1].insertionPoints[0].index >= item.insertionPoints[0].index + indexOffset-1 && foundItem[foundItem.length-1].insertionPoints[0].index <= myFrame.insertionPoints[-1].index ){
		return true;
	}
	return false;
}

function word_on_page_search_group(number, wordNum, word, myFrame, verseNum, indexOffset, searchText) {
//$.writeln(myFrame.contents)
	/*

		this is the grep used to find the word for the footnote.

		1. check if it is the first word on the page
		2. check if it is in verse 1 of the chapter
		3. check if it is in another verse

		return the inertion point if found

		else return false

	*/

	app.findGrepPreferences = null;

	// first word
	if(wordNum == 0){
		myGrep = number + "(?=(..)?" + word + ")";
		app.findGrepPreferences.findWhat = myGrep;

		 //$.writeln(myGrep)

		if(searchText){
			foundItem = searchText.findGrep();
		}
		else {
			foundItem = myFrame.findGrep();
		}

		if (foundItem.length > 0 && foundItem[0].insertionPoints[-1].index >= verseNum.insertionPoints[0].index + indexOffset && foundItem[0].insertionPoints[-1].index <= myFrame.insertionPoints[-1].index ){
		//	$.writeln('first word worked')
			return foundItem[0].insertionPoints[-1];
		}
	}

	// for verse numbers
	myGrep = "^"+number+"\\s*(\\b\\w+?(-\\b\\w+?)?\\b[^`]+?){"+wordNum.toString() +"}(?=" + word + ")";
	app.findGrepPreferences.findWhat = myGrep;

	//$.writeln(myGrep)

	if(searchText){
		foundItem = searchText.findGrep();
	}
	else {
		foundItem = myFrame.findGrep();
	}

	if (foundItem.length > 0 && foundItem[0].insertionPoints[-1].index >= verseNum.insertionPoints[0].index + indexOffset && foundItem[0].insertionPoints[-1].index <= myFrame.insertionPoints[-1].index ){
	//	$.writeln('chapter number worked')
		return foundItem[0].insertionPoints[-1];
	}

	// for chapter numbers
	wordNum--;
	myGrep = number + "[^`]+?(\\b\\w+?(-\\b\\w+?)?\\b[^`]+?){"+wordNum.toString() +"}(?=" + word + ")";
	app.findGrepPreferences.findWhat = myGrep;
	//$.writeln(myGrep);

	if(searchText){
		//$.writeln("here")
		foundItem = searchText.findGrep();
	//	$.writeln(searchText.contents)
		//$.writeln("after here")
	}
	else {
		foundItem = myFrame.findGrep();
	//	$.writeln(myFrame.contents)
	}


	//$.writeln(foundItem.length)
	if(foundItem.length > 0){
		for(l=0;l<foundItem.length;l++){
			if (foundItem[l].insertionPoints[-1].index >= verseNum.insertionPoints[0].index + indexOffset && foundItem[l].insertionPoints[-1].index <= myFrame.insertionPoints[-1].index ){
				return foundItem[l].insertionPoints[-1];
			}
		}
	}


	// reset wordNum
	// wordNum++;

	return false;
}

function word_on_page(myFrame,verseNum,wordNum,word,nextVerseNum,indexOffset, nextFrameSearch){
	//$.writeln(myFrame.name, verseNum.contents.toString(),wordNum,word)
	/*
		this function returns the insertion point where the note marker should go.

		first check in the current frame.
		then check for verses that have wrapped onto the next frame.

	*/

	var myGrep;
	var foundItem;
	var str = verseNum.contents.toString();
    var number = str.match(/(\d+)/)[0];
    word = word.replace("'",".");

	// if frame is emtpy return false
	//$.writeln(myFrame.name)
	if(myFrame.contents.length < 1){return false;}

	var checkOne = word_on_page_search_group(number, wordNum, word, myFrame, verseNum,indexOffset);
	if(checkOne !== false){ return checkOne;}

	// it is possible that the word breaks over the page end..
	// need to get the containing paragraph of the # and the check inside the paragraph.
	// if the last index of finds is on the page, then cool.
	// the last index is before the word starts so we should be good.

	// get the index of the verse number (last time it is found in frame)
	app.findGrepPreferences = app.changeGrepPreferences = null;
	myGrep =  "\\<"+number+"(?=[^\\d])"; //"\\s"+number;
	app.findGrepPreferences.findWhat = myGrep;
	//$.writeln(myGrep)
	// if we are searching the next frame then check previous frame for number.
	if(nextFrameSearch == 1)
	{
		me = myFrame.previousTextFrame.findGrep()
		//$.writeln('previous frame')
	}
	else {
		me = myFrame.findGrep();
	}
	//$.writeln(me.length)
	// if nothing found then possible the verse number has gone from
	// frame2 to frame1 during a "repagination" 🤮

	if (me.length < 1){

		// first check if the word is on the page, but before any numbers, except next verse, appear
		// if it is not, then return false
		//$.writeln('special search = no # but check for word in frame ' + myFrame.name)
		myGrep = nextVerseNum == false ? "[^\\d](?="+word+"[^\\d])" : "[^\\d](?="+word+"[^\\d]*"+nextVerseNum.toString()+")";
		//$.writeln(myGrep)
		app.findGrepPreferences.findWhat = myGrep;
		foundItem = myFrame.findGrep();
		//$.writeln(foundItem.length)
		if (foundItem.length > 0 && foundItem[0].insertionPoints[-1].index >= verseNum.insertionPoints[0].index + indexOffset && foundItem[0].insertionPoints[-1].index <= myFrame.insertionPoints[-1].index ){
			//$.writeln('found word but not verse # on frame ' + myFrame.name)
			return foundItem[0].insertionPoints[-1];
		}

		//$.writeln(myFrame.contents)
		//$.writeln('failed to find verse number or word on frame ' + myFrame.name)
		return false;
	}

	// get the start and stop indexes of the paragraph. Last index cannot be more than end of page.
	var startIndex = me[me.length-1].insertionPoints[0].index;
	var endOfPage = me[me.length-1].parentTextFrames[0].characters[-1].insertionPoints[-1].index;
	var endIndex;

	// if we are searching on the next frame, then we don't care if we go over the page.
	//$.writeln(nextFrameSearch)
	//$.writeln(me[me.length-1].contents)
	// end index should be where the next verse starts.
	// some verses are multi paragraph.
	// do a grep from here to next number
	myGrep = "[^\\d]+\\d";
	//$.writeln(myGrep);
	// search area is current number to end of next text frame.
	// if this is last frame and overflows we should add another frame first. 
	if(me[me.length-1].parentTextFrames[0].overflows){
		timeit(create_page,[me[me.length-1].parentTextFrames[0].parentPage]);
	}

	// if this try fails it is because we are on the last page and there is no "next text frame".. so use current one.
	try{
		searchArea = myFrame.parentStory.insertionPoints.itemByRange(startIndex, me[me.length-1].parentTextFrames[0].nextTextFrame.characters[-1].insertionPoints[-1].index).getElements()[0];
	} catch(e){
		searchArea = myFrame.parentStory.insertionPoints.itemByRange(startIndex, me[me.length-1].parentTextFrames[0].characters[-1].insertionPoints[-1].index).getElements()[0];
	}

	//$.writeln(searchArea.contents);
	app.findGrepPreferences.findWhat = myGrep;
	foundItem = searchArea.findGrep();
	endIndex = foundItem[0].insertionPoints[-1].index;
	//$.writeln(endIndex)
	//	endIndex = me[me.length-1].paragraphs[0].insertionPoints[-1].index;
	if(nextFrameSearch !== 1){

		endIndex = Math.min(endOfPage, me[me.length-1].paragraphs[0].insertionPoints[-1].index);
	}
	//$.writeln(startIndex, endIndex, endOfPage)
	var searchText = myFrame.parentStory.insertionPoints.itemByRange(startIndex,endIndex).getElements()[0];
	//$.writeln(searchText.contents)

	// try to find here in this text block using same search group....
	var checkTwo = word_on_page_search_group(number, wordNum, word, myFrame, verseNum,indexOffset, searchText);
	if(checkTwo !== false){ return checkTwo;}

	//$.writeln("word not on frame " + myFrame.name)
	return false;
}

var lastNoteChapter = 0;
var lastverse = 0;
var lastnote = '';

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
	if(myFrame.contents.length < 1){return false;}

	// get all numbers in frame. need to get last number from previous page
	app.changeGrepPreferences = app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\d+";
	var numbers = myFrame.findGrep();

	// remove any numbers that are not a verse number or chapter number.

	if(numbers.length > 0){
		var arr = [];
		for (var i = 0; i < numbers.length; i++) {
			if(numbers[i].appliedCharacterStyle == myDocument.characterStyles.item("ChapterNum") || numbers[i].appliedCharacterStyle == myDocument.characterStyles.item('VerseNum') || numbers[i].appliedCharacterStyle == myDocument.characterStyles.item('VerseNumM') || numbers[i].appliedCharacterStyle == myDocument.characterStyles.item("psalmChapter") ){
			    arr.push(numbers[i]);
			}
		}
		 numbers = arr;
	}

	// loop through them, one at a time.
	// check if they are still on the page. don't use grep, just check index/baseline?
	// if still on the page, then add the note. Don't care if it changed col, etc.
	myFrame.name == 'frame1' && lastverse = 0;
	myFrame.name == 'frame1' && lastnote = '';
	var indexOffset = 0;
	var lastIndex = 0;
	myFrame.name == 'frame1' && lastNoteChapter = 0;
	var noteverse = 0;

	// $.writeln("doing notes on frame " + myFrame.name)
	for(var me=0; me < numbers.length;me++){
		var myParagraphStyle = numbers[me].appliedParagraphStyle.name;
		var myNumber = numbers[me];

		// $.writeln(myNumber.contents)
		var myNextNumber = me+1 < numbers.length ? numbers[me+1].contents : false;

		// check if verse is still on page. if not, skip out
		var verseOnPage = timeit(verse_num_on_page,[myFrame,myNumber,indexOffset]);
		// $.writeln('verse on page: ' + verseOnPage)
		if (verseOnPage == false){
			// $.writeln("verse on page is false")
			// $.writeln(myFrame.name)
			// $.writeln(myNumber.contents.toString() + ' not on page founds');

			// if(myNumber.contents == 5 &&notechapter == 10){asdf;}
			break;
		}

		// set chapter and verse variables
		if(myNumber.appliedCharacterStyle == myDocument.characterStyles.item("psalmChapter")){
			notechapter = myNumber.contents;
			noteverse = 0;
		}
		if(myNumber.appliedCharacterStyle == myDocument.characterStyles.item("ChapterNum")){

			notechapter = myNumber.contents;
			noteverse = 1;

		} else if(myNumber.appliedCharacterStyle == myDocument.characterStyles.item("VerseNum") || myNumber.appliedCharacterStyle == myDocument.characterStyles.item("VerseNumM")){
			noteverse = myNumber.contents;
		}
		// $.writeln(notechapter,noteverse)
		// get note from array
		var thisnote = timeit(get_foot_array_val,[note,notechapter,noteverse]);
		// $.writeln('thisnote: ' + notechapter,noteverse,thisnote)

		if(thisnote){

			  // $.writeln(noteverse)
			  // $.writeln(thisnote)

			var footframe = timeit(add_foot_frame,[myFrame]);
			var tempIndexOffset = 0;
			var g = true;

			// there may be several notes on each verse. loop through them.
			for(var x=0;x < thisnote.length;x++){
				var currentNote = thisnote[x].slice(5);
				// reset footframe to current page
				footframe = timeit(add_foot_frame,[myFrame]);
				myFindWordNum = thisnote[x].slice(3,4); myFindWordNum--;
				if(thisnote[x].slice(3,4) == ''){
					$.writeln("351 note is missing word number " + notechapter.toString() + ":" + noteverse.toString() + " note word: " + myFindWord[0].toString());
					asdf;
				}
				myFindWord = thisnote[x].slice(4,5);

				// verify that the word is still on the page.

				var wordOnPage;
				//$.writeln(myFindWordNum)
				if (myFindWordNum <= 0) {
					// this is for notes that are on the whole ch. typically psalms,
					// or are on the first word of the vs
					// get the verse to search
					var currentInsertion = numbers[me].insertionPoints[0].index + indexOffset;
					var nextInsertion = me+1 < numbers.length ? numbers[me+1].insertionPoints[0].index + indexOffset : myFrame.parentStory.insertionPoints[-1].index - indexOffset - tempIndexOffset;
					var searchText = myFrame.parentStory.insertionPoints.itemByRange(currentInsertion,nextInsertion + tempIndexOffset).getElements()[0];
					var myGrep = '';
					app.changeGrepPreferences = app.findGrepPreferences = null;

					myGrep = "\\d+\\s*";
					//$.writeln(myGrep)
					app.findGrepPreferences.findWhat = myGrep;
					foundItem = searchText.findGrep()
					wordOnPage = foundItem[0].insertionPoints[-1];
					//$.writeln(wordOnPage.index)
				}
				else {
					wordOnPage = timeit(word_on_page,[myFrame,myNumber,myFindWordNum,myFindWord[0],myNextNumber,indexOffset]);
				}
				//$.writeln(wordOnPage.index)
				//$.writeln('381 first word on page check: ' + notechapter.toString() + ":" + noteverse.toString() + " note word: " + myFindWord[0].toString() + " word number: " + myFindWordNum.toString());
				// if there was a word found that was after the verse #, then it is then we assume safe?
				// possibly I should be checking for the word # as well in case a word is repeated?
				// if the word was not found after the verse number, then...
				//$.writeln(wordOnPage)
				if (wordOnPage == false){
					//$.writeln("false")
					// the word was not found on the page.. it must be on the next page!
					// if its found we need to add it to the next page.
					// $.writeln('checking next page for potentional note location')
					// if this page overflows and there is no next page then add it.

					if(myFrame.overflows){
						timeit(create_page,[myFrame.parentPage]);
					}
					//$.writeln("check if on next page")
					var wordOnNextPage = timeit(word_on_page,[myFrame.nextTextFrame,myNumber,myFindWordNum,myFindWord[0],myNextNumber,indexOffset,1]);
					//$.writeln('308 first word on next page check: ' + wordOnNextPage)
					if (wordOnNextPage !== false){
						//$.writeln("on next page")
						if(myFrame.name === 'frame2'){footframe = timeit(add_foot_frame,[myFrame.nextTextFrame]);}
						wordOnPage = wordOnNextPage;
					} else {
						$.writeln("382 note word location not found for " + notechapter.toString() + ":" + noteverse.toString() + " note word: " + myFindWord[0].toString() + " word number: " + myFindWordNum.toString());
						asdf;
					}
				}

				// get reference only if verse changed
				var alreadyExists = '';

				// em space 8195
				// en space 8194
				// thin space 8201
				// discretionary break 8203

				// check if note already exists & add to footnote frame.
				// $.writeln(footframe.contents.length)
				if(footframe.contents.length > 0){
					app.findTextPreferences = null;
					app.findTextPreferences.findWhat = currentNote[0].replace(/<i>/g,'').replace(/<\/i>/g,'');
					alreadyExists = footframe.findText();
					if(alreadyExists.length > 0){
						// get marker of existing note
						markerIndex = footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-2,alreadyExists[0].insertionPoints[0].index-1).insertionPoints[0].index;
						marker = footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-2,alreadyExists[0].insertionPoints[0].index-1).getElements()[0].contents;

						// get chapter number of the marker. this could be different than
						// the "lastNoteChapter" wich is the chapter # of the last note that
						// was insereted.

						// safest way to get last chapter is to grep and get the match with an index
						// just before the marker.


						var myLocalLastChapter = timeit(getLastChapter,[footframe,markerIndex]);
						//$.writeln(myLocalLastChapter)
						//$.writeln(noteverse,lastverse)
						if(noteverse !== lastverse){
							// insert reference of current verse into footnotes.
							// if the foot note is already several long (ex: 1:17k asdfa l asdfaf), then we want to re-add the first
							// full reference.
							var isNumberCheck = footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-4,alreadyExists[0].insertionPoints[0].index-3).contents;
							var newRef;
							if(!isNaN(isNumberCheck.toString().replace(String.fromCharCode(8194),'asdf'))){

								newRef = notechapter === myLocalLastChapter ? thisnote[x].slice(2,3) : thisnote[x].slice(1,2) + ":" + thisnote[x].slice(2,3);
								footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-3,alreadyExists[0].insertionPoints[0].index-3).contents = ","+ String.fromCharCode(8203) + newRef;
							} else{
								//$.writeln("else")
								var lastRef = getLastFootRef(footframe,alreadyExists[0].insertionPoints[0].index-3);
								newRef = notechapter === myLocalLastChapter ? thisnote[x].slice(2,3) : thisnote[x].slice(1,2) + ":" + thisnote[x].slice(2,3);
								footframe.parentStory.insertionPoints.itemByRange(alreadyExists[0].insertionPoints[0].index-2,alreadyExists[0].insertionPoints[0].index-2).contents = lastRef + ","+ String.fromCharCode(8203) + newRef+ String.fromCharCode(8201);
							}
						}
						lastverse = noteverse;
						//asfdasdfasfd;
					} else {

						// if the note does not already exist.
						noteverse !== lastverse && footframe.contents += thisnote[x].slice(1,2) + ":" + thisnote[x].slice(2,3) + String.fromCharCode(8201);
						marker = alpha_increment();
						footframe.contents += marker + currentNote + String.fromCharCode(8203, 8194, 8203);
						lastverse = noteverse;
					}

				} else {
					 //$.writeln("ELSE")
					// this is for first item added to frame.
					footframe.contents += thisnote[x].slice(1,2) + ":" + thisnote[x].slice(2,3) + String.fromCharCode(8201);
					//noteverse == lastverse && footframe.contents += String.fromCharCode(8203, 8194, 8203)
					marker = alpha_increment();
					footframe.contents += marker + currentNote + String.fromCharCode(8203, 8194, 8203);
					lastverse = noteverse;
				}

				// add the marker to the verse.
				// insertion point = wordOnPage.
				//$.writeln("457 note word location for " + notechapter.toString() + ":" + noteverse.toString() + " note word: " + myFindWord[0].toString() + " on word number: " + + myFindWordNum.toString());
				// $.writeln(wordOnPage)
				// $.writeln(wordOnPage.index)
		 		var startIndex = wordOnPage.index;
				wordOnPage.contents = marker + String.fromCharCode(8198);//SpecialCharacters.SIXTH_SPACE;
				tempIndexOffset +=2;
		 		myFrame.parentStory.characters.itemByRange(startIndex,startIndex+1).appliedCharacterStyle = myDocument.characterStyles.item("SuperScript");

		 		// formatting must be done before doing location checks
				if(myFrame.parentPage.textFrames.itemByName('note-frame').isValid){

					footframe.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote");

					timeit(footnoteSuperscript,[footframe]);
					// don't want all references bold, just the ones for the note 😀
					timeit(bold,[footframe, "\\d+:\\d+(,?\\s?\\d+)*~s"]);
					timeit(noBreak,[footframe, "\\d+:\\d+(,?\\d+)*\\s\\l\\s[\\l\\u]+"]);
					timeit(noBreak, [footframe, "\\l\\.\\d+:\\d+"]);
					timeit(noBreak, [footframe, "\\d+:\\d+"]);
				}

				thisIndex = footframe.insertionPoints[-1].index;

				// check if the verse is still on the page. if not, then start pruning lines off the note frame
				// and moving them to the next page. but... don't take off the whole note...

				var q = 0;

				verseOnPage = timeit(verse_num_on_page,[myFrame,myNumber,indexOffset]);
				try{
					wordOnPage = timeit(word_on_page,[myFrame,myNumber,myFindWordNum,myFindWord[0],myNextNumber,indexOffset]);
				} catch(e){
					wordOnPage = true;
				}

				//$.writeln('416 check if verse and word are on page. ',verseOnPage, wordOnPage)
				// reset text frame to the current page. we may have already added one on the next page
				// and don't care about it yet..

				footframe = timeit(add_foot_frame,[myFrame]);
				timeit(removeLeadingSpace,[footframe]);
				while (q < 10 && (!wordOnPage) && myFrame.name === 'frame2'){
					//$.writeln("in while")
					var textToMove = ' ';

					// remove lines until ther verse number is found. if verse number is never found 
					// move the entire note to the next page.

					// this fails if the content has already been moved to the next page above.
					// so try catch

					// don't remove anything that was not part of the current note.

					try{
						if (footframe.lines[-1].insertionPoints[0].index < lastIndex){
							g = false;
							textToMove = textToMove + footframe.parentStory.insertionPoints.itemByRange(lastIndex,footframe.insertionPoints[-1].index).getElements()[0].contents;
							footframe.insertionPoints.itemByRange(lastIndex,footframe.insertionPoints[-1].index).remove();
							textToMove.length > 0 && newfootframe = timeit(add_foot_frame,[myFrame.nextTextFrame]);
							textToMove.length > 0 && newfootframe.contents = textToMove + newfootframe.contents;

							// if this happens we need to change the paragraph justify rull to justify all except last line left.
							footframe.parentStory.justification=Justification.LEFT_JUSTIFIED;

							// break because we have already moved the full note.
							break;

						} else {
							// move one line at a time
							textToMove = textToMove + footframe.lines[-1].contents;
							footframe.lines[-1].remove();
							textToMove.length > 0 && newfootframe = timeit(add_foot_frame,[myFrame.nextTextFrame]);
							textToMove.length > 0 && newfootframe.contents = textToMove + newfootframe.contents;

							// if this happens we need to change the paragraph justify rull to justify all
							footframe.parentStory.justification=Justification.FULLY_JUSTIFIED;
						}
						timeit(removeLeadingSpace,[newfootframe]);

					} catch(e){break;}

					// recompose is needed when letting text "come back" onto the page.

					myDocument.recompose();
					//$.writeln(myFrame.contents)
					verseOnPage = timeit(verse_num_on_page,[myFrame,myNumber,indexOffset]);
					wordOnPage = timeit(word_on_page,[myFrame,myNumber,myFindWordNum,myFindWord[0],myNextNumber,indexOffset]);
					//$.writeln('514 while loop check if verse and word on page: ', verseOnPage, wordOnPage)
					//$.writeln(verseOnPage,wordOnPage)
					q++;
				}

				lastnote = currentNote;
				lastIndex = thisIndex;
				lastNoteChapter = notechapter;

				if (g == false){break;}

			}

			indexOffset += tempIndexOffset;

		if(myNumber == 25) { asdf;}

		//	if(marker == 'u'){asfasdfas;}
		}
	}
}

function getLastChapter(myFrame, myIndex){

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = '\\d+:\\d+';
	app.findGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("bold");
	var myFinds = myFrame.findGrep();

	// flip array so we start with biggest index.
	myFinds.reverse();
	// loop through results. return when the index is < myIndex
	for(var q=0;q <myFinds.length; q++){
		if(myFinds[q].insertionPoints[-1].index < myIndex){
			var myText = myFinds[q].contents;

			return myText.split(":")[0];
		}
	}
}

function removeLeadingSpace(myFrame){
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "^~k*\\s+~k*";
	app.changeGrepPreferences.changeTo = "";
	myFrame.parentStory.changeGrep();
}

function getLastFootRef(me,location){
	if (me.contents.length < 1) {return;}
	app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = "(\\d+:\\d+)(?=[~s|,])";
	var myFinds = me.parentStory.findGrep().reverse();
	for (var x = 0; x < myFinds.length; x++){
		if (myFinds[x].insertionPoints[-1].index < location){
			return myFinds[x].contents;
		}
	}
	$.writeln("dead in the water");
}

function adjustFootFrame(){

	// if there is a footnote text frame scoot it up here.
	// 1 get base of text frame
	// 2 set top of footframe to text frame baseline + 1

	var noteFrame = aPage.textFrames.itemByName('note-frame');
	// turn off autosizing.
	noteFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;

	// get last baseline
	var lastBaseline = aPage.textFrames.itemByName('frame1').lines[-1].characters[-1].baseline;
	lastBaseline += 0.27 * myDocument.gridPreferences.baselineDivision;

	// update bounds
	var bounds = noteFrame.geometricBounds;
	bounds[0] = lastBaseline;
	noteFrame.geometricBounds = bounds;

	// turn on auto sizing
	noteFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_CENTER_POINT;
	noteFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
}
