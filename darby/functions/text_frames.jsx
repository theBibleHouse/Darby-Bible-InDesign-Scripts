main_frame_bottom = meta.page_height - meta.bottom_margin
left_column_left = meta.page_width / 2 - meta.column_width / 2 - meta.left_margin
left_column_right = meta.page_width / 2 + meta.gutter / 2
right_column_left = meta.page_width / 2 - meta.gutter / 2
right_column_right = meta.page_width - (meta.page_width - meta.column_width) / 2 + meta.right_margin


function addBookTextFrame(aPage) {
	aFrame = aPage.textFrames.add();
	aFrame.name='book-text-frame'

	myLeft = meta.right_margin
	myRight = meta.page_width - meta.left_margin

	if (size == "small") {
		myRight = meta.page_width - meta.reference_margin
	}
	
	if (aPage.side == PageSideOptions.LEFT_HAND) {
		myLeft = meta.left_margin;
		myRight = meta.page_width - meta.right_margin;

		if (size == "small") {
			myleft = meta.reference_margin
		}
	}
	
	aFrame.geometricBounds = [meta.top_margin, myLeft, main_frame_bottom, myRight];
	aFrame.appliedObjectStyle = myDocument.objectStyles.item("Book Name Frame")

	if (size == "small") {
		aFrame.textFramePreferences.insetSpacing = [0, 0, "4.5mm", meta.left_margin - meta.reference_margin];

		if (aPage.side == PageSideOptions.LEFT_HAND) {
			aFrame.textFramePreferences.insetSpacing = [0, meta.left_margin - meta.reference_margin, "4.5mm", 0];
		}
	}
	return aFrame;
}

function addFootnoteTextFrame(aPage) {
	aFrame = aPage.textFrames.add();

	myTop = main_frame_bottom - 3;
	myLeft = meta.right_margin + meta.gutter;
	myRight = meta.page_width - meta.left_margin;

	if (aPage.side == PageSideOptions.LEFT_HAND) {
		myLeft = meta.left_margin,
			myRight = meta.page_width - meta.right_margin - meta.gutter;
	}
	
	if (size == "large") {
		myLeft = left_column_left
		myRight = meta.page_width / 2 + meta.column_width / 2 + meta.right_margin
	}

	aFrame.geometricBounds = [myTop, myLeft, main_frame_bottom, myRight];
	aFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.BOTTOM_CENTER_POINT;
	aFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
	aFrame.textFramePreferences.insetSpacing = ["2mm", 0, 0, 0];
	aFrame.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
	return aFrame;
}

