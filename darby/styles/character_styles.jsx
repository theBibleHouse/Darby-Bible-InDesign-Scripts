function create_character_styles(){

	var verseNumSize = 7;
	var chapterNumSize = "8.75pt";
	var bookNameSize = 26.7;

	if (size === 'small')
	{
		verseNumSize = 6.65;
	}

	var boldFont =  "Lexicon No1 C Tab";

	myDocument.characterStyles.add({
		name: "Italics",
		fontStyle: "Italic"
	});

	myDocument.characterStyles.add({
		name: "VerseNum",
		appliedFont: boldFont,
		fontStyle: "Normal",
		baselineShift: 0,
		pointSize: verseNumSize,
		position: Position.NORMAL
	});

	myDocument.characterStyles.add({
		name: "VerseNumM",
		appliedFont: boldFont,
		fontStyle: "Normal",
		pointSize: verseNumSize,
		position: Position.NORMAL
	});

	myDocument.characterStyles.add({
		name: "ChapterNum",
		appliedFont: boldFont,
		fontStyle: "Normal",
		pointSize: chapterNumSize,
		leading: 8,
	});

	myDocument.characterStyles.add({
		name: "Section Marker",
		appliedFont: "Bible Stars"
	});

	myDocument.characterStyles.add({
		name: "bookName",
		appliedFont: boldFont,
		pointSize: bookNameSize,
		leading: bookNameSize,
		fontStyle: "Normal"
	});

	myDocument.characterStyles.add({
		name: "bold",
		appliedFont: boldFont,
	});

	myDocument.characterStyles.add({
		name:"None",
		basedOn: app.activeDocument.characterStyles[0]
	});

	myDocument.characterStyles.add({
		name: "SuperScript",
		position: Position.SUPERSCRIPT,
		fontStyle: "Italic"
	});

	myDocument.characterStyles.add({
		name: "NoteSuperScript",
		position: Position.SUPERSCRIPT,
		appliedFont: boldFont,
		fontStyle: "Italic"
	});

	myDocument.characterStyles.add({
		name: "psalmChapter",
	});

	myDocument.characterStyles.add({
		name: "psalmChapterProcessed",
	});
}