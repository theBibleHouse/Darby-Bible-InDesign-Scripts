function move_chapter_num_to_anchored_frames(me) {
		myFrame = me.parentTextFrames[0]

		if (myFrame.name == 'frame2'|| (size == "small" && myPage.side == PageSideOptions.RIGHT_HAND)) {
			chapter_location = "right"
		}
		else {
			chapter_location = "left"
		}

		if (me.appliedParagraphStyle == myDocument.paragraphStyles.item("Verse1")) {
			var new_note = me.insertionPoints[0].textFrames.add();
			me.parentStory.insertionPoints.itemByRange(me.texts[0].insertionPoints[0].index + 1, me.texts[0].insertionPoints[-1].index + 1).texts[0].move(LocationOptions.atBeginning, new_note.insertionPoints[0]);
			new_note.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("ChapterNum")
			new_note.fit(FitOptions.frameToContent);
			
			if (chapter_location == "right") {
				new_note.appliedObjectStyle = myDocument.objectStyles.item("Chapter Marker Right")
			} else {
				new_note.appliedObjectStyle = myDocument.objectStyles.item("Chapter Marker")
			}

			new_note.fit(FitOptions.frameToContent);

		}

		
		new_note.fit(FitOptions.frameToContent);
		new_note.anchoredObjectSettings.releaseAnchoredObject();
		
	
}
