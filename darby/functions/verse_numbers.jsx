function move_verse_numbers_to_frame(me) {

	var myFrame = me.parentTextFrames[0];
	var newNote;
	if (me.contents == 0){
		// if the me is a section marker than we need to anchor to top of verse.
		// the note is added before the 0, so the index is off and we cannot just move texts[-1] anymore.
		// so get index, and then move forward 1 char, then get the 0 and move to new text box.
		newNote = me.paragraphs[0].insertionPoints[0].textFrames.add({appliedObjectStyle: myDocument.objectStyles.item("VerseMarker-" + myFrame.name)});
		me.parentStory.insertionPoints.itemByRange(me.insertionPoints[0].index+1,me.insertionPoints[0].index+2).texts[0].move(LocationOptions.atBeginning, newNote.insertionPoints[0]);

	} else {
		// other wise, to where it was found.
		newNote = me.insertionPoints[-1].textFrames.add({appliedObjectStyle: myDocument.objectStyles.item("VerseMarker-" + myFrame.name)});

		//var line_number = me.parentStory.insertionPoints.itemByRange(me.parentStory.paragraphs[0].insertionPoints[0].index,me.index).lines.length;
		var other_line_number =  me.parentStory.insertionPoints.itemByRange(me.parentStory.paragraphs[0].insertionPoints[0].index,me.index+1).lines.length;
		// if there is a previous line, ending in space, add disc line break so there are no
		// funny things with text reshuffle happning when the verse # is moved out of the text frame.
		// other line number is used, because if the verse # is the first char on line, the line number is for the previous line.
		// move text to new note
		me.texts[-1].move(LocationOptions.atBeginning, newNote.insertionPoints[0]);
		if(me.parentStory.lines[other_line_number-1].characters[-1].contents === " "){
			me.parentStory.lines[other_line_number-1].characters[-1].insertionPoints[-1].contents = SpecialCharacters.FORCED_LINE_BREAK;
		}

	}

	// apply style
	newNote.appliedObjectStyle = myDocument.objectStyles.item("VerseMarker-" + myFrame.name);

	//this is for verse 2 where the chapter number covers it
	// somehow when this is deleted the xoffset is not working correctly.. so keeping old junk for now.
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
		myvar == true && (newNote.anchoredObjectSettings.anchorXoffset = "-5.8mm");
		myvar == true && myvar = false;

		if (myothervar == true) {
			newNote.anchoredObjectSettings.anchorXoffset = "-7.7mm";
			newNote.properties.textWrapPreferences.textWrapMode =  TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
			myothervar = false;
		}
	} else {

	newNote.appliedObjectStyle = myDocument.objectStyles.item("VerseMarker-" + myFrame.name);
	me.contents == 0 && newNote.parentStory.appliedParagraphStyle = myDocument.paragraphStyles.item('Section Marker');
	}

	// fixed stacked verse numbers
	if(lastNote && lastNote.geometricBounds){
		var newBaseline = Math.round(newNote.geometricBounds[0]);
		var lastBaseline = Math.round(lastNote.geometricBounds[0]);

		if(newBaseline == lastBaseline){
			// use baseline shift on text. using a different obj style did not work.
			//$.writeln(newNote.characters[0].appliedFont.name)
			if(newNote.characters[0].appliedFont.name == 'Bible Stars	Regular'){
				newNote.parentStory.baselineShift = '-1.2pt';
				newNote.anchoredObjectSettings.anchorXoffset = ".44mm";
			} else {
				lastNote.parentStory.baselineShift = '-3pt';
				newNote.parentStory.baselineShift = '3pt';

			}


		}
	}
	lastNote = newNote;

}

