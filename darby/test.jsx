
var myDocument = app.activeDocument;



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
			hyphenation: false,
			spaceBefore: ".706 mm",

			leftIndent: meta.gutter,
			rightIndent: meta.gutter,
			
			leftIndent: "0",
			justification: Justification.LEFT_ALIGN,
			tabList: [{
				position: 96.1,
				alignment: TabStopAlignment.LEFT_ALIGN,
				leader: ""
			}, {
				position: 7.9,
				alignment: TabStopAlignment.LEFT_ALIGN,
				leader: ""
			}, {
				position: 10.1,
				alignment: TabStopAlignment.LEFT_ALIGN,
				leader: ""
			}, {
				position: 12.7,
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
				rightIndent: 4.6
				leftIndent: 4.6,
		}}

		
				
		
	}