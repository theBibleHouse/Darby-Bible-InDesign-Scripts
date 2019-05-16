lastNote = ''
function move_verse_numbers_to_frame(me) {
	myFrame = me.parentTextFrames[0];
	
	var new_note = me.insertionPoints[-1].textFrames.add({
		appliedObjectStyle: myDocument.objectStyles.item(
			"VerseMarker-" + myFrame.name
		)
	});

	me.texts[-1].move(LocationOptions.atBeginning, new_note.insertionPoints[0]);

	new_note.fit(FitOptions.frameToContent);

	new_note.appliedObjectStyle = myDocument.objectStyles.item(
		"VerseMarker-" + myFrame.name
	);

	// this is for verse 2 where the chapter number covers it
	line_number = me.parentStory.insertionPoints.itemByRange(
		//me.paragraphs[0].index,
		me.parentStory.paragraphs[0].insertionPoints[0].index,
		me.index
	).lines.length;
	myvar = myothervar = false;
	if(new_note.contents == 2 && (line_number == 2||line_number == 3) &&
			me.appliedParagraphStyle ==
				myDocument.paragraphStyles.item("Verse1")) {
		myothervar = true;
		new_note.anchoredObjectSettings.anchorXoffset = "-7.7mm";

	}



	if (
		
		(new_note.contents == 2 &&
			line_number == 1 &&
			me.appliedParagraphStyle ==
				myDocument.paragraphStyles.item("Verse"))
	) {

		myvar = true;
		new_note.anchoredObjectSettings.anchorXoffset = "-5.8mm";
	}

	new_note.appliedObjectStyle = myDocument.objectStyles.item(
		"VerseMarker-" + myFrame.name
	);

	// this is for verse 2 where the chapter number covers it
	if (myvar == true) {
		new_note.anchoredObjectSettings.anchorXoffset = "-5.8mm";
		myvar = false;
	}

	if (myothervar == true) {
		new_note.anchoredObjectSettings.anchorXoffset = "-7.7mm";
		new_note.properties.textWrapPreferences.textWrapMode =  TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
		
		myothervar = false;
	}

	// fixed stacked verse numbers
	if(lastNote.geometricBounds){
		newBaseline = Math.round(new_note.geometricBounds[0])
		lastBaseline = Math.round(lastNote.geometricBounds[0])

		if(newBaseline == lastBaseline){

			with(lastNote.baselineFrameGridOptions) {
				useCustomBaselineFrameGrid = true
				startingOffsetForBaselineFrameGrid = "3.5mm"
				baselineFrameGridIncrement = "1pt"
			}
			with(lastNote.anchoredObjectSettings) {
				anchorYoffset = "-.9mm"

			}
			with(new_note.baselineFrameGridOptions) {
				useCustomBaselineFrameGrid = true
				startingOffsetForBaselineFrameGrid = "2mm"
				baselineFrameGridIncrement = "1pt"
			}
			//textFrames[0]
			with(new_note.anchoredObjectSettings) {
				// was 2.5
				anchorYoffset = "1.2mm"
			}

		}
		// might need to reapply style to new note here..
	}

	lastNote = new_note
}

