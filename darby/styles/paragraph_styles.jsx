function create_paragraph_styles(){

var myParagraphStyle;
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Heading");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Heading"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 8.75,
			leading: 8,
			//noBreak: true,

		}
	}	
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Page Num Large");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Page Num Large"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 7,
			leading: 8,
			noBreak: true,
			justification: Justification.CENTER_ALIGN,

		}
	}	
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Page Num");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Page Num"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 6.75,
			leading: 8,
			noBreak: true,
			justification: Justification.AWAY_FROM_BINDING_SIDE,

		}
	}	
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Heading Large");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Heading Large"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 10.9,
			leading: 8,
			noBreak: true,
			tracking:50,
			justification: Justification.CENTER_ALIGN,


		}
	}	
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Heading Small");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Heading Small"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 9.8,
capitalization: Capitalization.ALL_CAPS,
			leading: 8,
			noBreak: true,
			tracking:90,
			justification: Justification.AWAY_FROM_BINDING_SIDE,


		}
	}	
		try {
		myParagraphStyle = myDocument.paragraphStyles.item("SectionHeading");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "SectionHeading"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 C Tab",
			fontStyle: "Italic",
			pointSize: 8.75,
			leading: 8,
			noBreak: false,
			spaceBefore: "2 mm",
			alignToBaseline: true,
			gridAlignFirstLineOnly: false,
			keepLinesTogether: true,
			keepAllLinesTogether: true,
			hyphenation: false,
			keepWithNext: 1,
		}
	}	
	if (size == "large"){
		myParagraphStyle = myDocument.paragraphStyles.item("SectionHeading");
		myParagraphStyle.properties = {
			rightIndent: meta.gutter,

		}

	}

try {
		myParagraphStyle = myDocument.paragraphStyles.item("SectionHeadingRight");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "SectionHeadingRight"
		});
		myParagraphStyle.properties = {
			basedOn: myDocument.paragraphStyles.item("SectionHeading"),
			rightIndent: "0mm",
			leftIndent: meta.gutter,
			justification: Justification.RIGHT_ALIGN,
			keepLinesTogether: true,
			keepAllLinesTogether: true,
			keepWithNext: 1,
		
	}}
	myParagraphStyle = myDocument.paragraphStyles.item("SectionHeadingRight");
	myParagraphStyle.properties = {
		rightIndent:0
	}


	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Section Marker");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Section Marker"
		});
		myParagraphStyle.properties = {
			appliedFont: "Bible Stars",
			fontStyle: "Regular",
			pointSize: 8.75,
			alignToBaseline: true,
			gridAlignFirstLineOnly: true,
			justification: Justification.CENTER_ALIGN,
			keepLinesTogether: true,
			keepAllLinesTogether: true,
			hyphenation: false,
		}
	}

try {
		myParagraphStyle = myDocument.paragraphStyles.item("VerseNum");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "VerseNum"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 C TAB",
						appliedCharacterStyle: myDocument.characterStyles.item("VerseNum"),
			alignToBaseline: true,

			fontStyle: "Normal",
			baselineShift: "1.8 pt",
			pointSize: "6.75pt",
			position: Position.NORMAL
		}
	}
		if (size == "large"){
			myParagraphStyle = myDocument.paragraphStyles.item("VerseNum")
			myParagraphStyle.properties = {
				pointSize : 7,// was 7
				baselineShift: "0pt",
			}
}

	try {
		myParagraphStyle = myDocument.paragraphStyles.item("runningHead");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "runningHead"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Italic",
			pointSize: 8.75,
			leading: 8,
			noBreak: true
		}
	}
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Footnote");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Footnote"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 6.75,
			leading: 8,
			gridAlignFirstLineOnly:true, // aligns first line to grid
			justification: Justification.LEFT_JUSTIFIED
		}
		if (size == "large"){
		myParagraphStyle = myDocument.paragraphStyles.item("Footnote");
		myParagraphStyle.properties = {
			pointSize: 7, //7

		}
}
	}


	
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("crossReference");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "crossReference"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 6.75,
			leading: 8,
			justification: Justification.AWAY_FROM_BINDING_SIDE
			
		}
	}
	if(size == "large") {

		myParagraphStyle = myDocument.paragraphStyles.item("crossReference");
		myParagraphStyle.properties = {
			justification: Justification.LEFT_ALIGN,
						pointSize: 7,
						
		}
	}
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("crossReferenceright");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "crossReferenceright"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 7,
			leading: 8,
			justification: Justification.RIGHT_ALIGN,

			
		}
	}
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Verse");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Verse"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 8.75,
			leading: 8,
			leftIndent: meta.gutter,
			alignToBaseline: true,
			justification: Justification.LEFT_JUSTIFIED,
			keepLinesTogether: true,
			keepFirstLines: 1,
			keepLastLines: 1,
			//composer: "Adobe World-Read Paragraph Composer",
			// add on the left indent here
			tabList: [{
				position: 7,
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
		}
		if (size == "large" || size == "small") {
			myParagraphStyle.properties = {
				rightIndent: meta.gutter
		}}
	}
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("metricalVerse");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "metricalVerse"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 8.75,
			leading: 8,
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
		}
	}
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("metricalVerseTwoColumn");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "metricalVerseTwoColumn"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 8.75,
			leading: 8,
			alignToBaseline: true,
			keepLinesTogether: true,
			keepFirstLines: 2,
			keepLastLines: 2,			
			leftIndent: "6mm",
			rightIndent: "4mm",
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
		}
	}
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("quoteVerse");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "quoteVerse"
		});
		myParagraphStyle.properties = {
			basedOn: myDocument.paragraphStyles.item("metricalVerse"),
			spaceBefore: "0mm",
			spaceAfter: "0mm",
			leftIndent: "7.056mm",
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
		}
	}
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Verse1");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Verse1"
		});
		myParagraphStyle.properties = {
			basedOn: myDocument.paragraphStyles.item("Verse"),
			
			alignToBaseline: true,
			keepLinesTogether: true,
			keepFirstLines: 1,
			leftIndent: meta.gutter,
			
			keepLastLines: 2,
			keepWithNext: 0,
			hyphenation: true,
			spaceBefore: ".706 mm"

		}
		if (size == "large" || size == "small") {
			myParagraphStyle.properties = {
				rightIndent: meta.gutter
		}}
	}
	if (size =="small1"){

		myParagraphStyle = myDocument.paragraphStyles.item("Verse1");
myParagraphStyle.properties = {
dropCapCharacters: 2,
			dropCapLines: 2,
			firstLineIndent: -Math.abs(meta.gutter)
		}
	}
		
	/*	try {
		myParagraphStyle = myDocument.paragraphStyles.item("VerseNum");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "VerseNum"
		});
		myParagraphStyle.properties = {
			basedOn: myDocument.paragraphStyles.item("Verse"),
			appliedFont: "Lexicon No1 C Pi",
			fontStyle: "Normal",
			baselineShift: "-.3 pt",
			leftIndent: "0",
			pointSize: "7.75pt",
			position: Position.NORMAL,
				rightIndent: "0mm"
		

		}
	}*/
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("ChapterNum");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "ChapterNum"
		});
		myParagraphStyle.properties = {
			//basedOn: myDocument.paragraphStyles.item("Verse"),
			dropCapCharacters: 2,
			dropCapLines: 2,
			alignToBaseline: true,
			keepLinesTogether: true,
			keepFirstLines: 1,
			keepLastLines: 2,
			keepWithNext: 0,
			//hyphenation: true,
			//spaceBefore: ".706 mm"

		}
	}
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("mVerse1");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "mVerse1"
		});
		myParagraphStyle.properties = {

			appliedFont: "Lexicon No1 A Tab",
			fontStyle: "Normal",
			pointSize: 8.75,
			leading: 8,
			alignToBaseline: true,

			alignToBaseline: true,
			keepLinesTogether: true,
			keepFirstLines: 2,
			
			keepLastLines: 2,
			keepWithNext: 0,
			hyphenation: true,
			spaceBefore: ".706 mm",

			dropCapCharacters: 2,
			dropCapLines: 2,

			leftIndent: "0",
			justification: Justification.LEFT_ALIGN,
			tabList: [{
				position: "3.175mm",
				alignment: TabStopAlignment.LEFT_ALIGN,
				leader: ""
			}, {
				position: "8.114",
				alignment: TabStopAlignment.LEFT_ALIGN,
				leader: ""
			}]
		}
	}

	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Verse2");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Verse2"
		});
		myParagraphStyle.properties = {
			basedOn: myDocument.paragraphStyles.item("Verse1"),
			dropCapCharacters: 3
		}
	}
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("mVerse2");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "mVerse2"
		});
		myParagraphStyle.properties = {
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
		}
	}
	try {
		myParagraphStyle = myDocument.paragraphStyles.item("Verse3");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "Verse3"
		});
		myParagraphStyle.properties = {
			basedOn: myDocument.paragraphStyles.item("Verse1"),
			dropCapCharacters: 4
		}
	}

	try {
		myParagraphStyle = myDocument.paragraphStyles.item("bookName");
		myName = myParagraphStyle.name;
	} catch (e) {
		myParagraphStyle = myDocument.paragraphStyles.add({
			name: "bookName"
		});
		myParagraphStyle.properties = {
			appliedFont: "Lexicon No1 A Tab",
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
						tracking:90,

		}
		if (size == "large"){
			myParagraphStyle = myDocument.paragraphStyles.item("bookName")
			myParagraphStyle.properties = {
				pointSize: 10.9,
										tracking:50,

			}
		}
	}

}