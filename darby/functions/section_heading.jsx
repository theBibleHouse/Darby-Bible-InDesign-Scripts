function section_headings(myFrame){
    for (h = 0; h < heading.length; h++){
		book = heading[h][0]
		chapter = heading[h][1]
		verse = heading[h][2]
		content = heading[h][3]

		if (verse == 1) {
			app.changeGrepPreferences = app.findGrepPreferences = null;
			app.findGrepPreferences.findWhat = "Chapter\\s" + chapter + "~b";
			
			try {
				me = myFrame.parentStory.findGrep()
				me = me[0].insertionPoints[0];
				pointone = me.index
				me.contents = content + String.fromCharCode(13);
			} catch (e) {$.writeln("Error: unable to find heading location for " + line)}

		} else {
			app.changeGrepPreferences = app.findGrepPreferences = null;
			app.findGrepPreferences.findWhat = "Chapter " + chapter + "~b[^\"]+?\\K(?=\\s\\<" + verse + ")";
			try {
				me = myFrame.parentStory.findGrep()
				me = me[0].insertionPoints[0];
				pointone = me.index
				me.contents = content + String.fromCharCode(13);
			} catch (e) {$.writeln("Error: unable to find heading location for " + line)}
		}
		me.characters.itemByRange(myFrame.insertionPoints[pointone],me.insertionPoints[pointone+content.length]);
		me.appliedParagraphStyle = myDocument.paragraphStyles.item("SectionHeading");
		me.appliedCharacterStyle = myDocument.characterStyles.item("None");
	}
}