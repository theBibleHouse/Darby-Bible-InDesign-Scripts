function section_headings(myFrame){

    for (h = 0; h < heading.length; h++){
		book = heading[h][0];
		chapter = heading[h][1];
		verse = heading[h][2];
		content = heading[h][3].replace('\'','’');

		if (verse == 1) {
			app.changeGrepPreferences = app.findGrepPreferences = null;
			app.findGrepPreferences.findWhat = "Chapter\\s" + chapter + "~b";

			try {
				me = myFrame.parentStory.findGrep();
				me = me[0].insertionPoints[0];
				pointone = me.index;
				me.contents = content + String.fromCharCode(13);

			} catch (e) {$.writeln("Error: unable to find heading location for " + book + " " + chapter + ":" + verse + " " + content + "\n" + e);}

		} else {
			app.changeGrepPreferences = app.findGrepPreferences = null;
			// indesing bug causing this to fail in long documents
			// patch does not seem to fix it... problem with \K\s\< it seems.
			// alternate is to do a full search and got back on the last insertion point by a 
			// few chars.

			grep = "Chapter " + chapter + "~b[^\`]+?\\K(?=\\s\\<" + verse + ")";


			app.findGrepPreferences.findWhat = grep;

			try {
				me = myFrame.parentStory.findGrep();
				me = me[0].insertionPoints[0];
				pointone = me.index;
				me.contents = content + String.fromCharCode(13);
			} catch (e) {
				// try a alternate for the bug.. ths seems to work
				// just add not at last insertion point.
				try {
					grep = "Chapter\\s" + chapter + "~b[^`]+?(?=\\s" + verse + "\\s)";

					app.findGrepPreferences.findWhat = grep;
					me = myFrame.parentStory.findGrep();
					me = me[0].insertionPoints[-1];
					pointone = me.index;
					me.contents = String.fromCharCode(13) + content;
				} catch (e){
				$.writeln("Error: unable to find heading location for "  + book + " " + chapter + ":" + verse + " " + content + "\n" + e);}
			}
		}
		try{
		me.characters.itemByRange(myFrame.insertionPoints[pointone],me.insertionPoints[pointone+content.length]);
		me.appliedParagraphStyle = myDocument.paragraphStyles.item("SectionHeading");
		me.appliedCharacterStyle = myDocument.characterStyles.item("None");
	}catch(e){$.writeln(e);}
	}
}