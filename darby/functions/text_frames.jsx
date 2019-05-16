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


function balanceFrames(myFrame){
	// function to set column break on last page
	// should be run after putting in footnotes
	aPage = myFrame.parentPage
	//$.writeln(myFrame.name)
	if(size=="large") {

		if(myFrame.name=='frame2') {

			frame1_length = aPage.textFrames.itemByName('frame1').lines[-1].baseline
			frame2_length = myFrame.lines[-1].baseline

			break_point = (frame1_length - frame2_length) / 2 + frame2_length

			//$.writeln(frame1_length)
			//$.writeln(frame2_length)
			//$.writeln(break_point)

		}

		else {

			frame1_length = myFrame.lines[-1].baseline
			starting_point = myFrame.lines[0].baseline

			break_point = (frame1_length - starting_point)/2  + starting_point
		}

		baseline_adder = -myDocument.gridPreferences.baselineDivision/2
		if(break_point < 150){baseline_adder *= -2}

		frame1_geo_bounds = aPage.textFrames.itemByName('frame1').geometricBounds
		//$.writeln(frame1_geo_bounds)
		frame1_geo_bounds[2] = Math.ceil(break_point) + baseline_adder
		//$.writeln(frame1_geo_bounds)
		aPage.textFrames.itemByName('frame1').geometricBounds = frame1_geo_bounds

		ref_frame1_geo_bounds = aPage.textFrames.itemByName('ref-frame1').geometricBounds
		ref_frame1_geo_bounds[2] = Math.ceil(break_point) + baseline_adder
		aPage.textFrames.itemByName('ref-frame1').geometricBounds = ref_frame1_geo_bounds

		frame2_geo_bounds = aPage.textFrames.itemByName('frame2').geometricBounds
		frame2_geo_bounds[2] = Math.ceil(break_point) + baseline_adder
		aPage.textFrames.itemByName('frame2').geometricBounds = frame2_geo_bounds	

		ref_frame2_geo_bounds = aPage.textFrames.itemByName('ref-frame2').geometricBounds
		ref_frame2_geo_bounds[2] = Math.ceil(break_point) + baseline_adder
		aPage.textFrames.itemByName('ref-frame2').geometricBounds = ref_frame2_geo_bounds


		// if there is a footnote text frame scoot it up here.
	}
}
