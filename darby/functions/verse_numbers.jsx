function move_verse_numbers_to_frame(me) {
	var lastNote
	var myFrame = me.parentTextFrames[0];

	var newNote = me.insertionPoints[-1].textFrames.add({appliedObjectStyle: myDocument.objectStyles.item("VerseMarker-" + myFrame.name)});
	var line_number = me.parentStory.insertionPoints.itemByRange(me.parentStory.paragraphs[0].insertionPoints[0].index,me.index).lines.length;
	var other_line_number =  me.parentStory.insertionPoints.itemByRange(me.parentStory.paragraphs[0].insertionPoints[0].index,me.index+1).lines.length;
	// if there is a previous line, ending in space, add disc line break so there are no 
	// funny things with text reshuffle happning when the verse # is moved out of the text frame.	
	// other line number is used, because if the verse # is the first char on line, the line number is for the previous line.
	if(me.parentStory.lines[other_line_number-1].characters[-1].contents === " "){	
		me.parentStory.lines[other_line_number-1].characters[-1].insertionPoints[-1].contents = SpecialCharacters.FORCED_LINE_BREAK
	}
	
	// move text to new note
	me.texts[-1].move(LocationOptions.atBeginning, newNote.insertionPoints[0]);

	// resize new note
	newNote.fit(FitOptions.frameToContent);

	// put in correct location
	newNote.appliedObjectStyle = myDocument.objectStyles.item("VerseMarker-" + myFrame.name);

	// this is for verse 2 where the chapter number covers it
	if (newNote.contents === 2) {
		
		var myvar = false;
		var myothervar = false;

		if((line_number === 2 || line_number === 3) && me.appliedParagraphStyle ==myDocument.paragraphStyles.item("Verse1")) {
			myothervar = true;
			newNote.anchoredObjectSettings.anchorXoffset = "-7.7mm";
		} else if (line_number == 1 && me.appliedParagraphStyle == myDocument.paragraphStyles.item("Verse")) {
			myvar = true;
			newNote.anchoredObjectSettings.anchorXoffset = "-5.8mm";
		}

		// reapply......
		newNote.appliedObjectStyle = myDocument.objectStyles.item("VerseMarker-" + myFrame.name);
		myvar == true && (newNote.anchoredObjectSettings.anchorXoffset = "-5.8mm")
		myvar == true && myvar = false;
		
		if (myothervar == true) {
			newNote.anchoredObjectSettings.anchorXoffset = "-7.7mm";
			newNote.properties.textWrapPreferences.textWrapMode =  TextWrapModes.BOUNDING_BOX_TEXT_WRAP;	
			myothervar = false;
		}
	} else {
		newNote.appliedObjectStyle = myDocument.objectStyles.item("VerseMarker-" + myFrame.name);
	}

	// fixed stacked verse numbers
	if(lastNote && lastNote.geometricBounds){
		var newBaseline = Math.round(newNote.geometricBounds[0])
		var lastBaseline = Math.round(lastNote.geometricBounds[0])

		if(newBaseline == lastBaseline){
			with(lastNote.baselineFrameGridOptions) {
				useCustomBaselineFrameGrid = true
				startingOffsetForBaselineFrameGrid = "3.5mm"
				baselineFrameGridIncrement = "1pt"
			}
			with(lastNote.anchoredObjectSettings) {
				anchorYoffset = "-.9mm"
			}
			with(newNote.baselineFrameGridOptions) {
				useCustomBaselineFrameGrid = true
				startingOffsetForBaselineFrameGrid = "2mm"
				baselineFrameGridIncrement = "1pt"
			}
			with(newNote.anchoredObjectSettings) {
				anchorYoffset = "1.2mm"
			}
		}		
	}
	lastNote = newNote

}

