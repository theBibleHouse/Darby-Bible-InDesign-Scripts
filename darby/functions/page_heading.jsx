function add_running_head(myPage, aContents) {
	var aFrame = myPage.textFrames.add();
	aFrame.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
	aFrame.contents = aContents;
	aFrame.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Heading");

	var myX1,myX2;

	if (myPage.side == PageSideOptions.leftHand) {
		myX1 = meta.bottom_margin;
		myX2 = meta.page_width - meta.right_margin;
		aFrame.parentStory.characters.item(0).justification = Justification.leftAlign;
		aFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.LEFT_CENTER_POINT;

	} else {
		myX1 = meta.right_margin;
		myX2 = meta.page_width - meta.bottom_margin;
		aFrame.parentStory.characters.item(0).justification = Justification.rightAlign;
		aFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.RIGHT_CENTER_POINT;

	}
	if (size == "large") {
		aFrame.geometricBounds = [meta.top_margin/1.2/1.2/1.2 , meta.page_width / 2 - 40, meta.top_margin/1.2/1.2, meta.page_width / 2 + 40];
		aFrame.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Heading Large");
		aFrame.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
		aFrame.appliedObjectStyle = myDocument.objectStyles.item("Page Heading");

	} else {
		aFrame.geometricBounds = [4, myX1, 9.5, myX2];
		aFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.WIDTH_ONLY;
		aFrame.appliedObjectStyle = myDocument.objectStyles.item("Page Heading Small");
		aFrame.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Heading Small");

	}
	return aFrame;
}

function create_page_heading(firstPage, myFrame) {
	// don't do duplicates
	if(size=="large" && myFrame.name=="frame1" && myFrame.nextTextFrame.contents.length>0){
		return true;
	}

	myPage = myFrame.parentPage;

	if (lastChapter == chapter) {
		chapter_number = chapter;
	}

	else if (lastChapter == chapter - 1) {
		chapter_number = lastChapter + ", " + chapter;
	}

	else if (lastChapter !== chapter) {
			chapter_number = lastChapter + "-" + chapter;
	}

	add_running_head(myPage, String(book_name + " " + chapter_number));

	// didnt want to erase old stuff yet
	return true;

	/*
	var found = [],
		styleBool = false
	try {
		var myStyle = myFrame.words[0].appliedParagraphStyle.name;
	} catch (e) {}

	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.appliedCharacterStyle = "ChapterNum";
	app.findGrepPreferences.findWhat = "\\d+";

	try{
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
	} catch(e){}

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

	if (myStyle !== "bookName" && firstPage != 1) {
		add_running_head(myPage, String(book_name + " " + chapter_number));
	}
	*/
}
