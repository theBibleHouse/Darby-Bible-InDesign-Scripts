function create_page(thisPage){
	lastPage = thisPage;

	if(lastPage){
		thisPage = myDocument.pages.add(LocationOptions.AFTER, lastPage);
	} else{thisPage = myDocument.pages[0];}

	if (size == "large") {
		thisPage.marginPreferences.properties = {
			top: meta.top_margin,
			left: left_column_left,
			right: right_column_right,
			bottom: meta.bottom_margin
		};
		if (thisPage.side == PageSideOptions.LEFT_HAND) {
			thisPage.marginPreferences.properties = {
			right: left_column_left,
			};
		}
	} else if (size == "small") {
		thisPage.marginPreferences.properties = {
			top: meta.top_margin,
			left: meta.right_margin,
			right: meta.left_margin,
			bottom: meta.bottom_margin
		};
	}

	// verse frames
	thisFrame = thisPage.textFrames.add();
	thisFrame.name = 'frame1';

	// will catch if book changes
	try {
		if(lastPage){
			if(size=='large'){
				lastPage.textFrames.itemByName('frame2').nextTextFrame = thisFrame;
			}
			else {
				lastPage.textFrames.itemByName('frame1').nextTextFrame = thisFrame;
			}
		}
	} catch(e) {}

	if (size == "small") {
		if (thisPage.side == PageSideOptions.LEFT_HAND) {
			thisFrame.geometricBounds = [
				meta.top_margin,
				meta.left_margin,
				main_frame_bottom,
				meta.page_width - meta.right_margin
			];
		}
		else {
			thisFrame.geometricBounds = [
				meta.top_margin,
				meta.right_margin,
				main_frame_bottom,
				meta.page_width - meta.left_margin
			];
		}
	} else if (size == "large") {
		// 2 columns
		thisFrame2 = thisPage.textFrames.add();
		thisFrame2.name = 'frame2';
		thisFrame.nextTextFrame = thisFrame2;

		thisFrame.geometricBounds = [
			meta.top_margin,
			left_column_left,
			main_frame_bottom,
			left_column_right
		];

		thisFrame2.geometricBounds = [
			meta.top_margin,
			right_column_left,
			main_frame_bottom,
			right_column_right
		];
	}

	// cross frame 1
	thisFrame = thisPage.textFrames.add();
	thisFrame.name = 'ref-frame1';

	myLeft = meta.page_width - meta.left_margin + meta.gutter;
	myRight = meta.page_width - meta.reference_margin;

	//"left" means inside; "right" means outside.
	if (thisPage.side == PageSideOptions.LEFT_HAND) {
		myRight = meta.left_margin - meta.gutter;
		myLeft = meta.reference_margin;
	}

	if (size == "large") {
		myLeft = meta.left_margin;
		myRight = left_column_left - meta.reference_gutter;
	}

	thisFrame.geometricBounds = [meta.top_margin, myLeft, main_frame_bottom, myRight];
	thisFrame.textFramePreferences.insetSpacing = [1.6, 0, 0, 1.6];

	if(size=="large"){
		// cross frame 2
		thisFrame = thisPage.textFrames.add();
		thisFrame.name = 'ref-frame2';

		myRight = right_column_right + meta.reference_gutter;
		myLeft = meta.page_width - meta.right_margin;

		thisFrame.geometricBounds = [meta.top_margin, myLeft, main_frame_bottom, myRight];
		thisFrame.textFramePreferences.insetSpacing = [1.6, 1.6, 0, 0];
	}

	// page numbers
	page_number = thisPage.textFrames.add();
	page_number.name = 'page-number';

	with (page_number){
		geometricBounds = myPageNumLocation(thisPage);
		textFramePreferences.firstBaselineOffset = FirstBaseline.leadingOffset;
		textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
		size === "large" & textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;
		contents = SpecialCharacters.autoPageNumber;
		parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Heading");
		parentStory.characters.item(0).justification = Justification.leftAlign;

		thisPage.side == PageSideOptions.LEFT_HAND && parentStory.characters.item(0).justification = Justification.rightAlign;

		parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Page Num");
		if (size == "large") {
			page_number.appliedObjectStyle = myDocument.objectStyles.item("Page Number");
		}
	}
	return thisPage;
}

function myPageNumLocation(myPage) {
	if (size == "large" ) {
		return [meta.page_height - meta.bottom_margin/1.2/1.2, meta.page_width / 2 - 20, meta.page_height - meta.bottom_margin/1.2, meta.page_width / 2 + 20];
	}
	var myX1,myX2;

	if (myPage.side == PageSideOptions.leftHand) {
		myX1 = meta.bottom_margin;
		myX2 = meta.page_width - meta.right_margin;
	} else {
		myX1 = meta.right_margin;
		myX2 = meta.page_width - meta.bottom_margin;
	}
	 return [meta.page_height - meta.gutter, myX1, meta.page_height - meta.bottom_margin, myX2 ];
}
