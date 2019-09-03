
function new_ref(myFrame){
	var me = true, i = 0;
	
	while(me){
	
		me = timeit(find_number,[myFrame])
		if(me.appliedCharacterStyle == myDocument.characterStyles.item("ChapterNum")){ 
			
			// if this is the first number on the page then update last chapter for heading
			my_baseline = Math.round(me.baseline - myDocument.gridPreferences.baselineDivision/3*2)
				
			i === 0 && lastChapter = chapter

			chapter = me.contents
			verse = 1

			timeit(dates_and_cross,[myFrame, me, 1])
			timeit(move_chapter_num_to_anchored_frames,[me])

		} else if(me.appliedCharacterStyle == myDocument.characterStyles.item("VerseNum")){ 
			my_baseline = Math.round(me.baseline)
			verse = me.contents

			timeit(dates_and_cross,[myFrame, chapter, me])
			timeit(move_verse_numbers_to_frame,[me])
		
		} else if (me.contents == 0){
			// section markers
			timeit(move_verse_numbers_to_frame,[me]);
			//asdfasdfsad;

		} else {
			// if there are not verses on the page, still want to add header date as well.
			timeit(dates_and_cross,[myFrame, chapter, 99999])
		}

		if(i==50){ break }else{i++}
	}
}


function sectionMarkers(myFrame) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	if (book_name.toUpperCase() != 'PSALMS') {
		app.findGrepPreferences.findWhat = "0(?=\\n|~b)";

		try {
			if (myFinds = myFrame.findGrep() != "") {
				myFinds = myFrame.findGrep();
				flq = myFinds.length;

				while (flq--) {

					var new_note = myFinds[flq].paragraphs[0].insertionPoints[0].textFrames.add({
						appliedObjectStyle: myDocument.objectStyles.item("Section Marker"),
						appliedParagraphStyle: myDocument.paragraphStyles.item("Section Marker")
					});
					myFinds[flq].parentStory.insertionPoints.itemByRange(myFinds[flq].texts[0].insertionPoints[0].index + 1, myFinds[flq].texts[0].insertionPoints[-1].index + 1).texts[0].move(LocationOptions.atBeginning, new_note.insertionPoints[0]);
					new_note.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Section Marker");
					new_note.fit(FitOptions.frameToContent);
					
					new_note.geometricBounds = [new_note.geometricBounds[0], new_note.geometricBounds[3] - 3, new_note.geometricBounds[2], new_note.geometricBounds[3]];
				}
			}
		} catch (e) {}

	} else {
		app.findGrepPreferences.findWhat = "(0)(?= PSALM)";
		app.changeGrepPreferences.appliedCharacterStyle = myDocument.characterStyles.item("Section Marker");
		app.changeGrepPreferences.changeTo = "$1";
		myFrame.parentStory.changeGrep();
	}
}

function find_number(myFrame){

	app.changeGrepPreferences = app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\d+";

	try{
		var me = myFrame.findGrep();
		return me.length < 1 ? false : me[0]
	} catch(e){ return false }
}

function get_array_val(array,chapter,verse){
	for(var c=0;c<array.length;c++){
		// splice will delete the item and return it.. faster for the next find.
		if(array[c][1]==chapter && array[c][2]==verse){return array.splice(c)[0][3];}
		}

	return false
}

function dates_and_cross(myFrame, chapter, verse){

	// get new content from array


	var thisdate = verse !== 1 ? timeit(get_array_val,[date,chapter,verse.contents]) : timeit(get_array_val,[date,chapter.contents,verse]);
	var thiscross = verse !== 1 ? timeit(get_array_val,[cross,chapter,verse.contents]) : timeit(get_array_val,[cross,chapter.contents,verse]);
				
	var break_char = String.fromCharCode(13);
	var cross_frame = myFrame.parentPage.textFrames.itemByName('ref-'+myFrame.name);
	var cross_start = cross_frame.insertionPoints[-1];

	// add last date and apply paragraph style. only if date is added.
	cross_frame.contents.length < 1 && (cross_frame.parentStory.appliedParagraphStyle = myDocument.paragraphStyles.item("init-crossReference-"+myFrame.name));
	cross_frame.contents.length < 1 && (thisdate || lastdate) && (cross_frame.contents += (thisdate || lastdate) + break_char) && (lastdate = thisdate || lastdate) && (thisdate = false);

	if(thisdate || thiscross){

		// get current baseline.
		
		var x = (my_baseline - Math.round(cross_frame.insertionPoints[-1].baseline))
		var l = cross_frame.parentStory.appliedParagraphStyle.properties.leading*0.352778
	
		// add break char until enough are added to get to verse # that belongs to the cross ref.
		x > 0 && cross_frame.contents += Array(Math.round(x/l + 1)).join(break_char);

		// add date if exists and update last date
		thisdate && (lastdate = thisdate) && (cross_frame.contents += thisdate + break_char);
		
		// if verse is 1 add in a extra line break
		//verse === 1 && cross_frame.contents += break_char;

		// add cross reference
		thiscross && cross_frame.contents += thiscross + break_char;
		// apply temporary paragraph style before formatting
		cross_frame.characters.itemByRange(cross_start, cross_frame.insertionPoints[-1]).appliedParagraphStyle = myDocument.paragraphStyles.item("init-crossReference-"+myFrame.name);
		cross_frame.paragraphs[-1].appliedParagraphStyle= myDocument.paragraphStyles.item("init-crossReference-"+myFrame.name);
		
		// format newly added references
		timeit(format_cross_reference_verse_numbers,[cross_frame]);
		
		// reset paragraph style
	    cross_frame.parentStory.appliedParagraphStyle = myDocument.paragraphStyles.item("crossReference-"+myFrame.name);
		
		// no break on v 12; ch 1; etc, if there is no verse specified
		app.findGrepPreferences = app.changeGrepPreferences = null;
		//app.findGrepPreferences.findWhat = "~k\\l+\\s\\d+;";
		//app.changeGrepPreferences.noBreak = true;
		//cross_frame.parentStory.changeGrep()

		// keep ch:v together
		app.findGrepPreferences.findWhat = "\\d+:\\d+"
		app.changeGrepPreferences.noBreak = true;
		cross_frame.parentStory.changeGrep()


		// keep name ch together
		app.findGrepPreferences.findWhat = "\\l\\.*\\s\\d"
		app.changeGrepPreferences.noBreak = true;
		cross_frame.parentStory.changeGrep()

		// replace space with sixth space
		app.findGrepPreferences.findWhat = " ";
		app.changeGrepPreferences.changeTo = "~%";
		cross_frame.parentStory.changeGrep()

		// remove ; from line endings
	 	myLines = cross_frame.parentStory.lines;

	 	try {
			for (k=0; k<myLines.length; k++){
			 	if (myLines[k].length > 3){
			    	if(myLines[k].characters[myLines[k].characters.length-3].contents === ";" && myLines[k].characters[myLines[k].characters.length-2].contents === SpecialCharacters.SIXTH_SPACE){
			    		myLines[k].characters[myLines[k].characters.length-3].contents = "";
					}
				}
			}
		} catch(e){}

		// remove breaks if references go off the end of the page.

		if(cross_frame.overflows){
			var while_cross_frame_overflows = 0
			app.findGrepPreferences = app.changeGrepPreferences = null;
			 while(cross_frame.overflows && while_cross_frame_overflows < 100 && cross_frame.contents.length > 0){
			 	while_cross_frame_overflows ++
			
			 	app.findGrepPreferences.findWhat = "~b~b";
			 	found = cross_frame.findGrep();
			 	found.length < 1 ? while_cross_frame_overflows=100 : found[found.length-1].insertionPoints[0].parentStory.characters[(found[found.length-1].insertionPoints[0].index)].remove();
			}	
		}
	}
}
