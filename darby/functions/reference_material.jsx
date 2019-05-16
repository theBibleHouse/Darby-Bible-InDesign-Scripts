
function finda(myFrame) {

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "<";

	try {
		footNote = myFrame.findGrep()
	} catch (e) {
		footnote = ""
	}
	
	app.findGrepPreferences.findWhat = "\\{"; 
	
	try {
		crossReference = myFrame.findGrep();
	} catch (e) {
		crossReference = ""
	}

	return (footNote != "" || crossReference != "")
}


function findv(myFrame) {

	app.changeGrepPreferences = app.findGrepPreferences = null;
	app.findGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("VerseNum")
	app.findGrepPreferences.findWhat = "\\<\\d+\\>";

	try {
		myFinds = myFrame.findGrep()
	} catch (e) {
		myFinds = ""
	}
	return (myFinds)
}

function referenceMaterial(myFrame) {
	myPage = myFrame.parentPage
	myCrossFrame = undefined;
	f_results = '';
	found = [];
	crossReference = '';
	footNote = '';
	z = 0;
	currentNote = lastNote = currentReference = lastReference = lastDate = "";

	if ((Math.round(myFrame.geometricBounds[3] - 4) < (myPage.bounds[3] - myPage.bounds[1]) / 2) && size == "large") {
		column = 1
		footnote_frame_col_1 = ""
	} else if (size == "large") {
		column = 2
	} else {
		column = 1
	}
	i=0

	while ( number_of_verses = findv(myFrame).length  || finda(myFrame) ) {
		i+=1
		//$.writeln("footnotes")
		app.findGrepPreferences = app.changeGrepPreferences = null;
		app.findGrepPreferences.findWhat = "<.*?>";
		if (found = myFrame.findGrep() != "") {
			found = myFrame.findGrep();
			for (q = 0; q < found.length; q++) {
				me = found[q].contents.substring(1, found[q].contents.length - 1);
				
				currentReference = String(me.match(/\d+:\d+\s[a-z]\s/));
				currentNote = found[q].contents.substring(currentReference.length + 1, found[q].contents.length - 1);
				// check if note is existing on page already
				existingLocation = f_results.indexOf(currentNote);
				if (f_results == "") {
					f_results = found[q].contents.substring(1, found[q].contents.length - 1);
				} else {
					if (currentNote !== lastNote && existingLocation < 0) {
						if (currentReference.substring(0, currentReference.length - 2) == lastReference.substring(0, lastReference.length - 2)) {
							f_results = f_results.concat(String.fromCharCode(8203, 8194, 8203)).concat(currentReference.substring(currentReference.length - 2, currentReference.length - 1)).concat(String.fromCharCode(8198)).concat(currentNote);
						} else {
							f_results = f_results.concat(String.fromCharCode(8203, 8194, 8203)).concat(found[q].contents.substring(1, found[q].contents.length - 1))
						}
					} else {
						if (currentReference !== lastReference) {
							f_results = f_results.slice(0, existingLocation - 1) + ", " + currentReference + f_results.slice(existingLocation);
						}
					}
				}
		
				lastNote = currentNote;
				lastReference = currentReference;
			}
			app.changeGrepPreferences.changeTo = "";
			myFrame.changeGrep();
		}
		// footnotes that are stuck in a page transition
		app.findGrepPreferences = app.changeGrepPreferences = null;
		app.findGrepPreferences.findWhat = "<";
		if (found = myFrame.findGrep() != "") {
			app.findGrepPreferences = app.changeGrepPreferences = null;
			app.findGrepPreferences.findWhat = "<.+?>";
			found = myFrame.parentStory.findGrep();
			app.findTextPreferences = app.changeTextPreferences = null;
			app.findTextPreferences.findWhat = found[0].contents;

			if (found = myFrame.parentStory.findText() != "") {
				found = myFrame.parentStory.findText();
				if (f_results == "") {

					me = found[0].contents.substring(1, found[0].contents.length - 1);
					me2 = me.match(/\d+:\d+\s\l\s\K.+?"/);

					f_results = f_results.concat(found[0].contents.substring(1, found[0].contents.length - 1));
				} else {
					f_results = f_results.concat(String.fromCharCode(8203, 8194, 8203)).concat(found[0].contents.substring(1, found[0].contents.length - 1)); //8195
				}
				app.changeTextPreferences.changeTo = "";
				myFrame.parentStory.changeText();
			}
		}
		if (f_results) {
			if (z == 0) {
				if (column == 2 && footnote_frame_col_1 != "") {
					myNoteFrame.contents = myNoteFrame.contents.concat(String.fromCharCode(8203, 8194, 8203)).concat(f_results);
				} else {
					myNoteFrame = addFootnoteTextFrame(myPage)
					footnote_frame_col_1 = 1
					myNoteFrame.contents = f_results;
				}
			} else myNoteFrame.contents = myNoteFrame.contents.concat(String.fromCharCode(8203, 8194, 8203)).concat(f_results);
			myNoteFrame.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote")
			
			f_results = "", found = [];
			footnoteSuperscript(myNoteFrame);
			bold(myNoteFrame, "\\d+:\\d+");
			noBreak(myNoteFrame, "\\d+:\\d+\\s\\l\\s[\\l\\u]+");
		}

		
		app.findGrepPreferences = app.changeGrepPreferences = null;
		app.findGrepPreferences.findWhat = "\\{.+?\\}";
		// only add date on first pass of frame
		if (z ==0 ){
		f_results = currentDate			
		}
		else {
			f_results = "";
		}

		if (found = myFrame.findGrep() != "") {
			found = myFrame.findGrep();
			for (q = 0; q < found.length; q++) {
				f_results = f_results.concat(found[q].contents.substring(1, found[q].contents.length - 1)).concat(String.fromCharCode(13));
			}
			app.changeGrepPreferences.changeTo = "";
			myFrame.changeGrep();
		}
		myFrame.parentStory.recompose()
		// cross references that are stuck in a page transition
		app.findGrepPreferences = app.changeGrepPreferences = null;
		app.findGrepPreferences.findWhat = "\\{";

		if (found = myFrame.findGrep() != "") {
			app.findGrepPreferences = app.changeGrepPreferences = null;
			app.findGrepPreferences.findWhat = "\\{.+?\\}";

			found = myFrame.parentStory.findGrep();
			app.findTextPreferences = app.changeTextPreferences = null;
			app.findGrepPreferences = app.changeGrepPreferences = null;
			app.findTextPreferences.findWhat = found[0].contents;
			if (found = myFrame.parentStory.findText() != "") {
				found = myFrame.parentStory.findText();
				if (f_results == "") {
					f_results = found[0].contents.substring(1, found[0].contents.length - 1);
				} else {
					f_results = f_results.concat(found[0].contents.substring(1, found[0].contents.length - 1)).concat(String.fromCharCode(13));
				}
				app.changeTextPreferences.changeTo = "";
				myFrame.parentStory.changeText();
			}
		}
		// move cross references to frame before moving verse numbers. text may move.
		if (f_results) {
			if (z == 0) {
				if (column == 2) {
					myCrossFrame = addCrossreferenceTextFrame_right(myPage);
					myCrossFrame.contents = f_results;
					myCrossFrame.parentStory.appliedParagraphStyle = myDocument.paragraphStyles.item("crossReferenceright");
				} else {
					myCrossFrame = addCrossreferenceTextFrame(myPage);
					myCrossFrame.contents = f_results;
					myCrossFrame.parentStory.appliedParagraphStyle = myDocument.paragraphStyles.item("crossReference");
				}
			} else {
				myCrossFrame.contents = myCrossFrame.contents.concat(f_results);
				}
			f_results = "";
			
		}
		myFrame.parentStory.recompose()

		/*****	put verse numbers in the margin *****/
//		if(z>=1){break}
		newFrameBaseline = 0
		var lastNote

			first_baseline = find_first_baseline(myFrame)
			if (column == 2 || (size == "small" && myPage.side == PageSideOptions.RIGHT_HAND)) {
				verse_location="left"
			} 
			else {
				verse_location="right"
			}

		for (a=0; a<number_of_verses;a++){
			
			myFinds=findv(myFrame)
			// try to skip to next iteration if there are 0
			if (myFinds.length == 0){
				continue
			}
			if (verse_location=="left") {
				var new_note = myFinds[0].insertionPoints[-1].textFrames.add({
					appliedObjectStyle: myDocument.objectStyles.item("Verse Marker Right"),
				});

				myFinds[0].texts[-1].move(LocationOptions.atBeginning, new_note.insertionPoints[0]);

			} else {
				var new_note = myFinds[0].insertionPoints[-1].textFrames.add({
					appliedObjectStyle: myDocument.objectStyles.item("Verse Marker"),

				});
				myFinds[0].texts[-1].move(LocationOptions.atBeginning, new_note.insertionPoints[0]);
			}
			
			new_note.fit(FitOptions.frameToContent);
			
			if (verse_location =="left"){
				new_note.appliedObjectStyle = myDocument.objectStyles.item("Verse Marker Right")
			}
			else{
				new_note.appliedObjectStyle = myDocument.objectStyles.item("Verse Marker")
			}
			
			// this is for verse 2 where the chapter number covers it
			line_number = myFinds[0].parentStory.insertionPoints.itemByRange(myFinds[0].paragraphs[0].index, myFinds[0].index).lines.length;

			myvar=false
			if ((line_number == 2 && myFinds[0].appliedParagraphStyle == myDocument.paragraphStyles.item("Verse1")) ||
				(new_note.contents == 2 && line_number == 1 && myFinds[0].appliedParagraphStyle == myDocument.paragraphStyles.item("Verse"))) {
				myvar=true
				new_note.anchoredObjectSettings.anchorXoffset = "-5.8mm"
			}
			
			if (verse_location =="left"){
				new_note.appliedObjectStyle = myDocument.objectStyles.item("Verse Marker Right")
			}
			else{
				new_note.appliedObjectStyle = myDocument.objectStyles.item("Verse Marker")
			}
			
			// this is for verse 2 where the chapter number covers it
			if (myvar==true) {
				new_note.anchoredObjectSettings.anchorXoffset = "-5.8mm"
				myvar=false
			}

			myFrame.parentStory.recompose()
		}
			
		app.findGrepPreferences = null
		app.findGrepPreferences.findWhat = "~>";
		app.changeGrepPreferences.changeTo = "\\s"
		try{
			myFrame.changeGrep()
		} catch(e){}

		
		fix_stacked_verse_numbers(myFrame)
		myFrame.parentStory.recompose()

		z = z + 1;
		if (typeof myCrossFrame !== 'undefined') {
			currentDate = get_last_date(myCrossFrame)
		}

	}
	crossReferenceLocation(myFrame, myCrossFrame)

	/*if (typeof myCrossFrame !== 'undefined') {
		if (size == "large" || size == "small") {
			remove_verse_numbers_from_cross_references(myCrossFrame)
		} else {
			dateFormatFix(myCrossFrame)
		}
	}*/
}



function crossReferenceLocation(myFrame, myCrossFrame) {
	myPage = myFrame.parentPage
	if (size == "large") {
		line_space_adder = 2.82//77
	} else {
		line_space_adder = 2.82
	}
	format_cross_reference_verse_numbers(myCrossFrame);

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "^\\K\\d+.+?$";
	lastCross = "99999"
	lastDate = "000"
	try{
		foundCross = myCrossFrame.findGrep();
	}
	catch(e){foundCross=""}

	for (i = 0; i < foundCross.length; i++) {

		// remove double dates that are on the same page
		// this needs to be reviewed.. date format can change. just find any two lines of
		// text that match and remove them?
		myDateTest = new RegExp(/^\d+..\d+\s.+?$/g)

		if (myDateTest.test(foundCross[i].contents) == true) {
			//$.writeln("if date test is true set date")
			thisDate = String(foundCross[i].contents.match(/\b\d+\b/g)[1])

			if (thisDate == lastDate) {
				//$.writeln("if thisDate=lastDate")
				app.findGrepPreferences = app.changeGrepPreferences = null;
				app.findGrepPreferences.findWhat = foundCross[i].contents
				found = myCrossFrame.findGrep()
				found[found.length - 1].remove();
				//$.writeln("end if thisDate=lastDate")
			}
			//$.writeln("end if datetest is true")
		}

		try{lastDate = thisDate}
		catch(e){}

		if (!myCrossFrame.overflows) {
			myCrossLocation = foundCross[i].baseline;

			// for verse 1
			contents = String(foundCross[i].contents.match(/^\d+\b/g))
			if (contents == 1 && contents !== lastCross) { //&& size !== "large"
				app.findGrepPreferences = app.changeGrepPreferences = null;
				app.findGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("ChapterNum");
				try {
					foundVerse = myFrame.findGrep();
					if (foundVerse[0].baseline < myCrossLocation) {
						myVerseLocation = foundVerse[1].baseline - line_space_adder * 2;
						chapter = foundVerse[1].contents
					} else {
						myVerseLocation = foundVerse[0].baseline - line_space_adder * 2;
						chapter = foundVerse[0].contents
					}
					while (myCrossLocation < myVerseLocation && myCrossLocation && chapter != 1) {
						app.findGrepPreferences = app.changeGrepPreferences = null;
						app.findGrepPreferences.findWhat = "(^\\<" + contents + "\\s.+?\\>)";
						foundGrep = myCrossFrame.findGrep();
						app.findGrepPreferences.findWhat = "(" + foundGrep[0].contents + ")"
						app.changeGrepPreferences.changeTo = ("~b$1");
						myCrossFrame.changeGrep();
						myCrossLocation += line_space_adder;
					}
				} catch (e) {}
			}

			// for other chapters
			else if (foundCross[i].contents !== 1) {
				var myBaseLine = 0
				app.findGrepPreferences = app.changeGrepPreferences = null;
				app.findGrepPreferences.findWhat = "~a";
				myFound = myFrame.findGrep();
				var F = myFound.length;
				for (var f = 0; f < F; f++)
					if (myFound[f].textFrames[0].isValid) {
						app.findGrepPreferences.findWhat = "\\<" + contents + "\\>";
						app.findGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("VerseNum");
						founds2 = myFound[f].textFrames[0].findGrep()

						if (founds2[0]) {
							myBaseLine = founds2[0].baseline
							break
						}
					}
				try {
					myVerseLocation = Math.max((first_baseline - line_space_adder * 3) || 0, (myBaseLine - line_space_adder) || 0);

					while (myCrossLocation < myVerseLocation && myCrossLocation && !myCrossFrame.overflows) {

						app.findGrepPreferences = app.changeGrepPreferences = null;
						app.findGrepPreferences.findWhat = "(^\\<" + contents + "\\>)";
						app.changeGrepPreferences.changeTo = ("~b$1");
						myCrossFrame.changeGrep();
						myCrossLocation += line_space_adder;				
					}
				} catch (e) {}
			}
			lastCross = contents
		} else {}
		// need to remove verse number from found cross here.
		app.findGrepPreferences = app.changeGrepPreferences = null;
		app.findGrepPreferences.findWhat = "^\\K"+contents+"\\s";
//		foundCross[i].contents
		app.changeGrepPreferences.changeTo = ""
		myCrossFrame.changeGrep()
		//found[i].insertionPoints[0].parentStory.characters[(found[i].insertionPoints[0].index + 1)].remove();
	}
	
	// if frame is overflowing, backoff some of the double spaces
	if (myCrossFrame){
	while (myCrossFrame.overflows) {
		app.findGrepPreferences = app.changeGrepPreferences = null;
		app.findGrepPreferences.findWhat = "~b~b";
		try {
			found = myCrossFrame.findGrep();
			myTextToRemove = found[found.length - 1].insertionPoints[0].parentStory.characters[(found[found.length - 1].insertionPoints[0].index + 1)].remove();
		} catch (e) {break}
	}
}
}
