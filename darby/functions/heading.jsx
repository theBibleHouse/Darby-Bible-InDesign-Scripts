function add_running_head(myPage, aContents) {
	var aFrame = myPage.textFrames.add();
	aFrame.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
	aFrame.contents = aContents;
	aFrame.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Heading");
	

	if (myPage.side == PageSideOptions.leftHand) {
		var myX1 = meta.bottom_margin;
		var myX2 = meta.page_width - meta.right_margin;
		aFrame.parentStory.characters.item(0).justification = Justification.leftAlign;
		aFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.LEFT_CENTER_POINT;

	} else {
		var myX1 = meta.right_margin;
		var myX2 = meta.page_width - meta.bottom_margin
		aFrame.parentStory.characters.item(0).justification = Justification.rightAlign;
		aFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.RIGHT_CENTER_POINT;

	}
	if (size == "large") {
		aFrame.geometricBounds = [meta.left_margin + 3.5 , meta.page_width / 2 - 20, meta.left_margin+ 1.745, meta.page_width / 2 + 20];
		aFrame.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Heading Large");
		aFrame.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
		aFrame.appliedObjectStyle = myDocument.objectStyles.item("Page Heading")

	} else {
		aFrame.geometricBounds = [4, myX1, 9.5, myX2];
		aFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.WIDTH_ONLY;
		aFrame.appliedObjectStyle = myDocument.objectStyles.item("Page Heading Small")
		aFrame.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Heading Small");

	}
	return aFrame;
}

function create_page_heading(firstPage, myPage, myFrame) {
	var found = [],
		styleBool
	try {
		var myStyle = myFrame.words[0].appliedParagraphStyle.name;
	} catch (e) {}

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.appliedCharacterStyle = "ChapterNum";
	app.findGrepPreferences.findWhat = "\\d+";

	if (size == "large") {
		myFrame = myFrame.previousTextFrame
		if (myFrame.findGrep() != "") {
			found = myFrame.findGrep();

			f1_1 = found[0].contents;
			f2_1 = found[found.length - 1].contents;

			f1 = f1_1
			f2 = f2_1
		}
		myFrame = myFrame.nextTextFrame
	}

	try {
		if (myFrame.findGrep() != "") {
			if (myStyle == "Verse1" || myStyle == "Verse2" || myStyle == "Verse3" || myStyle == "mVerse1" || myStyle == "mVerse2" || myStyle == "mVerse3") {
				styleBool = true;
			} else styleBool = false;

			found = myFrame.findGrep();

			f1 = found[0].contents;
			f2 = found[found.length - 1].contents;
		}
	} catch (e) {}

	f2 = Math.max(f2_1, f2)

	if (styleBool == true || f1 == 1) {
		if (f1 == f2) {
			chapter_number = last_chapter_number = f1;
		} else if (f1 == f2 - 1) {
			chapter_number = f1 + ", " + f2;
			last_chapter_number = f2;
		} else if ((f1 !== f2 - 1) && (f1 !== f2)) {
			chapter_number = f1 + "-" + f2;
			last_chapter_number = f2;
		}
	} else
	if (last_chapter_number == f2) {
		chapter_number = last_chapter_number = f2;
	} else if (last_chapter_number == f2 - 1) {
		if (size == "large") {
			chapter_number = last_chapter_number + "," + f2, last_chapter_number = f2;
		} else {
			chapter_number = last_chapter_number + "," + f2, last_chapter_number = f2;
		}
	} else if (last_chapter_number !== f2 - 1) {
		chapter_number = last_chapter_number + "-" + f2, last_chapter_number = f2;
	} else chapter_number = last_chapter_number;

	f1 = last_chapter_number
	f1_1 = last_chapter_number
	f2 = last_chapter_number
	f2_1 = last_chapter_number

	if (myStyle !== "bookName" && firstPage != "1") {

		if (size == "large") {
			add_running_head(myPage, String(book_name.toUpperCase() + " " + chapter_number));
		} else {
			add_running_head(myPage, String(book_name + " " + chapter_number));
		}

	}
	if (myStyle !== "bookName" && firstPage != "1" || size == "large") {
		// add page numbers
		areFacing = app.activeDocument.documentPreferences.facingPages
		if (areFacing && myPage.side == PageSideOptions.LEFT_HAND) {
			var myLeftPageNumber = myPage.textFrames.add();

			// master page page numbers
			with(myLeftPageNumber) {
				geometricBounds = myPageNumLocation(myDocument, myPage); //[11.5, 70, 50, 100];
				textFramePreferences.firstBaselineOffset = FirstBaseline.leadingOffset;
				if (size == "large") {
					textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;
				} else {
					textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
				}
				contents = SpecialCharacters.autoPageNumber;
				parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Heading");
				parentStory.characters.item(0).justification = Justification.rightAlign;
				if (size == "large") {
					parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Page Num Large");

				}
				if (size == "small") {
					parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Page Num");

				}
			}
			if (size == "large") {
				myLeftPageNumber.appliedObjectStyle = myDocument.objectStyles.item("Page Number")
			}
		} else {
			var myRightPageNumber = myPage.textFrames.add();
			with(myRightPageNumber) {
				geometricBounds = myPageNumLocation(myDocument, myPage); //= [4, 11.5, 9.5, 67.75]; // [top, left, bottom, right]
				textFramePreferences.firstBaselineOffset = FirstBaseline.leadingOffset;
				if (size == "large") {
					textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;
				} else {
					textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
				}
				contents = SpecialCharacters.autoPageNumber;
				parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Heading");
				parentStory.characters.item(0).justification = Justification.leftAlign;
				if (size == "large") {
					parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Page Num Large");

				}
				if (size == "small") {
					parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Page Num");

				}
			}
			if (size == "large") {
				myRightPageNumber.appliedObjectStyle = myDocument.objectStyles.item("Page Number")
			}
		}
	}
}

function get_book_name(myFrame) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "<<.*?>>~b";
	me = myDocument.findGrep();
	if (me[0].contents) {
		book_name = me[0].contents.substring(2, me[0].contents.length - 3);
		app.changeGrepPreferences.changeTo = "";
		myDocument.changeGrep();
		return book_name;
	}
}

function myPageNumLocation(myDocument, myPage) {
	if (myPage.side == PageSideOptions.leftHand) {
		var myX1 = meta.bottom_margin;
		var myX2 = meta.page_width - meta.right_margin;
	} else {
		var myX1 = meta.right_margin;
		var myX2 = meta.page_width - meta.bottom_margin
	}


	if (size == "large" ) {
		return [meta.page_height - meta.left_margin- 1.745, meta.page_width / 2 - 20, meta.page_height - meta.left_margin - 3.5, meta.page_width / 2 + 20];
	} else {
		return [meta.page_height - meta.gutter, myX1, meta.page_height - meta.bottom_margin, myX2 ];
	}
}

function addHeadTextFrame(myPage) {
	var pageMargins = myPage.marginPreferences,
		aFrame = myPage.textFrames.add(),
		areFacing = app.activeDocument.documentPreferences.facingPages,
		myBottom = myDocument.documentPreferences.pageHeight - pageMargins.bottom,
		myTop = 0 + pageMargins.top,
		myLeft = myDocument.documentPreferences.pageWidth - pageMargins.right + 4,
		myRight = myDocument.documentPreferences.pageWidth - 6.5

	if (myPage.side == PageSideOptions.leftHand) {
		var myX1 = meta.page_width / 2;
		var myX2 = myPage.marginPreferences.left;
		aFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.RIGHT_CENTER_POINT;

	} else {
		var myX1 = myPage.marginPreferences.left;
		var myX2 = meta.page_width / 2;
		aFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.LEFT_CENTER_POINT;
	}
	var myX2 = meta.page_width - myX2;
	aFrame.geometricBounds = [4, myX1, 9.5, myX2];
	aFrame.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
	aFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.WIDTH_ONLY;
	return aFrame;

}