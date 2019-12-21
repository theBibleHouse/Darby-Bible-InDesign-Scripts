function create_character_styles(){
var myCharacterStyle;
	try {
		myCharacterStyle = myDocument.characterStyles.item("Italics");
		myName = myCharacterStyle.name;
	} catch (e) {
		myCharacterStyle = myDocument.characterStyles.add({
			name: "Italics"
		});
		myCharacterStyle.fontStyle = "Italic";
	}

	try {
		myCharacterStyle = myDocument.characterStyles.item("VerseNum");
		myName = myCharacterStyle.name;
	} catch (e) {
		myCharacterStyle = myDocument.characterStyles.add({
			name: "VerseNum"
		});
		myCharacterStyle.properties = {
			appliedFont: "Lexicon No1 C Tab",
			fontStyle: "Normal",
			baselineShift: "1.8 pt",
			pointSize: "6.75pt",
			position: Position.NORMAL
		}
		if (size == "large"){
			myCharacterStyle = myDocument.characterStyles.item("VerseNum")
			myCharacterStyle.properties = {
				pointSize : 7,// was 7
				baselineShift: "0pt",
			}
		}
	}
	try {
		myCharacterStyle = myDocument.characterStyles.item("VerseNumM");
		myName = myCharacterStyle.name;
	} catch (e) {
		myCharacterStyle = myDocument.characterStyles.add({
			name: "VerseNumM"
		});
		myCharacterStyle.properties = {
			appliedFont: "Lexicon No1 C Tab",
			fontStyle: "Normal",
			baselineShift: "1.8 pt",
			pointSize: "6.75pt",
			
			position: Position.NORMAL
		}
		if (size == "large"){
			myCharacterStyle = myDocument.characterStyles.item("VerseNumM")
			myCharacterStyle.properties = {
				pointSize : 7,// was 7
			}
		}
	}
	try {
		myCharacterStyle = myDocument.characterStyles.item("ChapterNum");
		myName = myCharacterStyle.name;
	} catch (e) {
		myCharacterStyle = myDocument.characterStyles.add({
			name: "ChapterNum"
		});
		myCharacterStyle.properties = {
			appliedFont: "Lexicon No1 C Tab",
			fontStyle: "Normal",
			pointSize:"8.75pt",
			leading:8,
			//baselineShift:"-2pt"
		}
	}

	try {
		myCharacterStyle = myDocument.characterStyles.item("Section Marker");
		myName = myCharacterStyle.name;
	} catch (e) {
		myCharacterStyle = myDocument.characterStyles.add({
			name: "Section Marker"
		});
		myCharacterStyle.properties = {
			appliedFont: "Bible Stars"
		}
	}
	

	try {
		myCharacterStyle = myDocument.characterStyles.item("bookName");
		myName = myCharacterStyle.name;
	} catch (e) {
		myCharacterStyle = myDocument.characterStyles.add({
			name: "bookName"
		});
		myCharacterStyle.properties = {
			appliedFont: "Lexicon No1 C Tab",
			pointSize: 24,
			fontStyle: "Normal"
		}
		if(size == "large"){
		myCharacterStyle = myDocument.characterStyles.item("bookName")
		myCharacterStyle.properties = {
			pointSize:26.7,
			leading: 26.7
		}
	}
	}

	try {
		myCharacterStyle = myDocument.characterStyles.item("bold");
		myName = myCharacterStyle.name;
	} catch (e) {
		myCharacterStyle = myDocument.characterStyles.add({
			name: "bold"
		});
		myCharacterStyle.properties = {
			appliedFont: "Lexicon No1 C Tab",
			//fontStyle: "Normal"
		}
	}

	try {
		myCharacterStyle = myDocument.characterStyles.item("None");
		myName = myCharacterStyle.name;
	} catch (e) {
		myCharacterStyle = myDocument.characterStyles.add({
			
			name:"None", basedOn:app.activeDocument.characterStyles[0]
		});
		
	}

	try {
		myCharacterStyle = myDocument.characterStyles.item("SuperScript");
		myName = myCharacterStyle.name;
	} catch (e) {
		myCharacterStyle = myDocument.characterStyles.add({
			name: "SuperScript"
		});
		myCharacterStyle.properties = {
			position: Position.SUPERSCRIPT,
			fontStyle: "Italic"

		}
	}
	try {
		myCharacterStyle = myDocument.characterStyles.item("NoteSuperScript");
		myName = myCharacterStyle.name;
	} catch (e) {
		myCharacterStyle = myDocument.characterStyles.add({
			name: "NoteSuperScript"
		});
		myCharacterStyle.properties = {
			position: Position.SUPERSCRIPT,
			appliedFont: "Lexicon No1 C Tab",
			fontStyle: "Italic"

		}
	}
	//var _basedOnNone = app.activeDocument.characterStyles.add({name:"None", basedOn:app.activeDocument.characterStyles[0]})
	
}