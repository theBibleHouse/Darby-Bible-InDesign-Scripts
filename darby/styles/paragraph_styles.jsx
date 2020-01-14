function create_paragraph_styles(){

	var myParagraphStyle;
	var leftIndentVal = meta.gutter;
	var rightIndentVal = 0;

	if(size == 'large'){
		rightIndentVal = meta.gutter;
	}

	var baseFont = "Lexicon No1 A Tab";
	var boldFont = "Lexicon No1 C Tab";
	var baseFontSize = 8.75;
	var pageNumSize = 7;
	if(size == 'small')
	{
		pageNumSize = 6.75;
	}

	var baseLeading = 8;
	var tabStop = [7.9,10.1,12.3,14.5,16.7,18.9]


	myDocument.paragraphStyles.add({
		name: "Heading",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: baseFontSize,
		leading: baseLeading,
	});

	myDocument.paragraphStyles.add({
		name: "Page Num",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: pageNumSize,
		leading: baseLeading,
		noBreak: true,
		justification: Justification.AWAY_FROM_BINDING_SIDE,
	});

	if(size == 'large')
	{
		myParagraphStyle = myDocument.paragraphStyles.item("Page Num");
		myParagraphStyle.properties = {
			justification: Justification.CENTER_ALIGN,
		};
	}

	myDocument.paragraphStyles.add({
		name: "Heading Large",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: 10.9,
		leading: baseLeading,
		noBreak: true,
		tracking:50,
		justification: Justification.CENTER_ALIGN,
		capitalization:Capitalization.ALL_CAPS,
	});

	myParagraphStyle = myDocument.paragraphStyles.add({
		name: "Heading Small",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: 9.8,
		capitalization: Capitalization.ALL_CAPS,
		leading: baseLeading,
		noBreak: true,
		tracking:90,
		justification: Justification.AWAY_FROM_BINDING_SIDE,
	});

	myDocument.paragraphStyles.add({
		name: "SectionHeading",
		appliedFont: boldFont,
		fontStyle: "Italic",
		pointSize: 7,
		leftIndent:leftIndentVal,
		rightIndent: rightIndentVal,
		leading: baseLeading,
		noBreak: false,
		spaceBefore: "2 mm",
		alignToBaseline: true,
		gridAlignFirstLineOnly: false,
		keepLinesTogether: true,
		keepAllLinesTogether: true,
		hyphenation: false,
		keepWithNext: 1,
	});

	myDocument.paragraphStyles.add({
		name: "SectionHeadingRight",
		basedOn: myDocument.paragraphStyles.item("SectionHeading"),
		rightIndent: rightIndentVal,
		leftIndent: leftIndentVal,
		justification: Justification.LEFT_ALIGN,
		keepLinesTogether: true,
		keepAllLinesTogether: true,
		keepWithNext: 1
	});

	myDocument.paragraphStyles.add({
		name: "Section Marker",
		appliedFont: "Bible Stars",
		fontStyle: "Regular",
		pointSize: baseFontSize,
		alignToBaseline: true,
		gridAlignFirstLineOnly: true,
		justification: Justification.CENTER_ALIGN,
		keepLinesTogether: true,
		keepAllLinesTogether: true,
		hyphenation: false,
	});

	myDocument.paragraphStyles.add({
		name: "VerseNum",
		appliedFont: boldFont,
		appliedCharacterStyle: myDocument.characterStyles.item("VerseNum"),
		alignToBaseline: true,
		fontStyle: "Normal",
		pointSize : 7,
		baselineShift: "0pt",
		position: Position.NORMAL
	});

	myDocument.paragraphStyles.add({
		name: "runningHead",
		appliedFont: baseFont,
		fontStyle: "Italic",
		pointSize: baseFontSize,
		leading: baseLeading,
		noBreak: true
	});

	myDocument.paragraphStyles.add({
		name: "Footnote",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: 7,
		leading: baseLeading,
		alignToBaseline:true,
		gridAlignFirstLineOnly:true, // aligns first line to grid
		justification: Justification.LEFT_JUSTIFIED
	});

	myDocument.paragraphStyles.add({
		name: "crossReference-frame1",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: 7,
		leading: baseLeading,
		justification: Justification.AWAY_FROM_BINDING_SIDE,
		hyphenation: false,
	});

	if(size == "large") {
		myParagraphStyle = myDocument.paragraphStyles.item("crossReference-frame1");
		myParagraphStyle.properties = {
			justification: Justification.LEFT_ALIGN,
		};
	}

	myDocument.paragraphStyles.add({
		name: "init-crossReference-frame1",
		basedOn: myDocument.paragraphStyles.item("crossReference-frame1"),
	});

	myDocument.paragraphStyles.add({
		name: "crossReference-frame2",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: 7,
		leading: baseLeading,
		justification: Justification.RIGHT_ALIGN,
		hyphenation: false,
	});

	myDocument.paragraphStyles.add({
		name: "init-crossReference-frame2",
		basedOn: myDocument.paragraphStyles.item("crossReference-frame2"),
	});

	myDocument.paragraphStyles.add({
		name: "Verse",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: baseFontSize,
		leading: baseLeading,
		leftIndent: leftIndentVal,
		rightIndent: rightIndentVal,
		alignToBaseline: true,
		justification: Justification.LEFT_JUSTIFIED,
		keepLinesTogether: true,
		keepFirstLines: 1,
		keepLastLines: 2,
		hyphenateLadderLimit: 2,
		hyphenWeight: 6,
		tabList: [{
			position: tabStop[0],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[1],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[2],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}]
	});

	myDocument.paragraphStyles.add({
		name: "metricalVerse",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: baseFontSize,
		leading: baseLeading,
		alignToBaseline: true,
		keepLinesTogether: true,
		keepFirstLines: 2,
		keepLastLines: 2,
		leftIndent: "0",
		spaceBefore: "5pt",
		spaceAfter: "5pt",
		justification: Justification.LEFT_ALIGN,
		tabList: [{
			position: "7.761 mm",
			alignment: TabStopAlignment.RIGHT_ALIGN,
			leader: ""
		}, {
			position: "8.114 mm",
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: "11.289 mm",
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: "14.464 mm",
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}]
	});

	myDocument.paragraphStyles.add({
		name: "metricalVerseTwoColumn",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: baseFontSize,
		leading: baseLeading,
		hyphenation: false,
		alignToBaseline: true,
		keepLinesTogether: true,
		keepFirstLines: 2,
		keepLastLines: 2,
		leftIndent: leftIndentVal,
		rightIndent: meta.gutter,
		spaceBefore: "2mm",
		//spaceAfter: "5pt",
		justification: Justification.LEFT_ALIGN,
		tabList: [{
			position: 96.1,
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[0],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[1],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[2],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[3],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[4],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[5],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}]
	});

	myDocument.paragraphStyles.add({
		name: "quoteVerse",
		basedOn: myDocument.paragraphStyles.item("metricalVerse"),
		spaceBefore: "0mm",
		spaceAfter: "0mm",
		leftIndent: "7.056mm",
		rightIndent: rightIndentVal,
		justification: Justification.LEFT_ALIGN,
		tabList: [{
			position: "5.644mm",
			alignment: TabStopAlignment.RIGHT_ALIGN,
			leader: ""
		}, {
			position: "10.231",
			alignment: TabStopAlignment.RIGHT_ALIGN,
			leader: ""
		}]
	});

	myDocument.paragraphStyles.add({
		name: "Verse1",
		basedOn: myDocument.paragraphStyles.item("Verse"),
		alignToBaseline: true,
		keepLinesTogether: true,
		keepFirstLines: 2,
		leftIndent: leftIndentVal,
		rightIndent: rightIndentVal,
		keepLastLines: 2,
		keepWithNext: 0,
		hyphenation: true,
		spaceBefore: ".706 mm"

	});

	myDocument.paragraphStyles.add({
		name: "ChapterNum",
		dropCapCharacters: 2,
		dropCapLines: 2,
		alignToBaseline: true,
		keepLinesTogether: true,
		keepFirstLines: 1,
		keepLastLines: 2,
		keepWithNext: 0,
	});

	myDocument.paragraphStyles.add({
		name: "mVerse1",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: baseFontSize,
		leading: baseLeading,
		alignToBaseline: true,
		keepLinesTogether: true,
		keepFirstLines: 2,
		keepLastLines: 2,
		keepWithNext: 0,
		hyphenation: false,
		spaceBefore: ".706 mm",
		leftIndent: leftIndentVal,
		rightIndent: rightIndentVal,
		justification: Justification.LEFT_ALIGN,
		tabList: [{
			position: 96.1,
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[0],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[1],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[2],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[3],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[4],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: tabStop[5],
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}]
	})

	myDocument.paragraphStyles.add({
		name: "Verse2",
		basedOn: myDocument.paragraphStyles.item("Verse1"),
		dropCapCharacters: 3
	});

	myParagraphStyle = myDocument.paragraphStyles.add({
		name: "mVerse2",
		basedOn: myDocument.paragraphStyles.item("Verse2"),
		justification: Justification.LEFT_ALIGN,
		tabList: [{
			position: "7.408mm",
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: "8.114",
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: "10.583mm",
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: "15.522mm",
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: "19.756mm",
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}]
	});

	myDocument.paragraphStyles.add({
		name: "Verse3",
		basedOn: myDocument.paragraphStyles.item("Verse1"),
		dropCapCharacters: 4
	});

	myDocument.paragraphStyles.add({
		name: "bookName",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: 11,
		leading: 26,
		spaceAfter: "11pt",
		alignToBaseline: true,
		gridAlignFirstLineOnly: true,
		justification: Justification.CENTER_ALIGN,
		keepLinesTogether: true,
		keepAllLinesTogether: true,
		hyphenation: false,
		tracking:90
	});

	if (size == "large"){
		myParagraphStyle = myDocument.paragraphStyles.item("bookName");
		myParagraphStyle.properties = {
			pointSize: 10.9,
			tracking:50,

		};
	}

	myDocument.paragraphStyles.add({
		name: "intro",
		appliedFont: baseFont,
		fontStyle: "Normal",
		pointSize: baseFontSize,
		leading: baseLeading,
		alignToBaseline: true,
		justification: Justification.LEFT_JUSTIFIED,
		keepLinesTogether: true,
		keepFirstLines: 1,
		keepLastLines: 1,
		tabList: [{
			position: 7.6-meta.gutter,
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: 12,
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}, {
			position: 17,
			alignment: TabStopAlignment.LEFT_ALIGN,
			leader: ""
		}]
	});

	myParagraphStyle = myDocument.paragraphStyles.add({
		name: "intro-center",
		basedOn: myDocument.paragraphStyles.item("intro"),
		justification: Justification.CENTER_ALIGN,
		appliedFont: baseFont,
		fontStyle: "Italic",
		pointSize: 7,
		leading: baseLeading,
		leftIndent: meta.page_width/2 - meta.column_width/2- meta.left_margin - meta.gutter,
		rightIndent: meta.page_width/2 - meta.column_width/2- meta.right_margin - meta.gutter,
	});

	myParagraphStyle = myDocument.paragraphStyles.add({
		name: "psalmNumber",
		basedOn: myDocument.paragraphStyles.item("Verse"),
		justification: Justification.CENTER_ALIGN,
		appliedFont: baseFont,
		fontStyle: "Normal",
		leading: baseLeading,
		spaceBefore: "2mm",
		pointSize: '10.9pt',
		keepWithNext:1,
	});

	myParagraphStyle = myDocument.paragraphStyles.add({
		name: "psalmIntro",
		basedOn: myDocument.paragraphStyles.item("Verse"),
		justification: Justification.CENTER_ALIGN,
		appliedFont: baseFont,
		fontStyle: "Normal",
		leading: baseLeading,
		pointSize:7,
		keepWithNext:1,
	});

	myParagraphStyle = myDocument.paragraphStyles.add({
		name: "psalmBook",
		basedOn: myDocument.paragraphStyles.item("Verse"),
		justification: Justification.CENTER_ALIGN,
		appliedFont: boldFont,
		fontStyle: "Normal",
		leading: baseLeading,
	});

}