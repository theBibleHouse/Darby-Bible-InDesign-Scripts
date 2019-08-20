function new_foot(myFrame){

	if(myFrame.name=='frame1'){
		add_footnotes(myFrame)
		if(myFrame.nextTextFrame.name=="frame2"){
			add_footnotes(myFrame.nextTextFrame)
		}
	}
}

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
				//	$.writeln('verse')
			my_baseline = Math.round(me.baseline)
			verse = me.contents

			timeit(dates_and_cross,[myFrame, chapter, me])
			timeit(move_verse_numbers_to_frame,[me])
		}
		if(i==300){ break }else{i++}
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


	thisdate = verse !== 1 ? timeit(get_array_val,[date,chapter,verse.contents]) : timeit(get_array_val,[date,chapter.contents,verse]);
	thiscross = verse !== 1 ? timeit(get_array_val,[cross,chapter,verse.contents]) : timeit(get_array_val,[cross,chapter.contents,verse]);
				
	var break_char = String.fromCharCode(13);
	var cross_frame = myFrame.parentPage.textFrames.itemByName('ref-'+myFrame.name);

	// add last date and apply paragraph style. only if date is added.
	cross_frame.contents.length < 1 && (cross_frame.parentStory.appliedParagraphStyle = myDocument.paragraphStyles.item("crossReference-"+myFrame.name));
	cross_frame.contents.length < 1 && (thisdate || lastdate) && (cross_frame.contents += (thisdate || lastdate) + break_char) && (lastdate = thisdate || lastdate) && (thisdate = false);

	// get current baseline.
	var cross_start = cross_frame.insertionPoints[-1];
	var cross_location = Math.round(cross_start.baseline);

	//$.writeln(chapter,verse.contents,my_baseline,cross_location,cross_frame.parentStory.appliedParagraphStyle.properties.leading*0.352778)
	//$.writeln((my_baseline - cross_location))
	var x = (my_baseline - cross_location)
	var l = cross_frame.parentStory.appliedParagraphStyle.properties.leading*0.352778
	//$.writeln(x/l)
	
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
	
	// format newly added references
	timeit(format_cross_reference_verse_numbers,[cross_frame]);
	
	// reset paragraph style
    cross_frame.parentStory.appliedParagraphStyle = myDocument.paragraphStyles.item("crossReference-"+myFrame.name);
		
	// remove breaks if references go off the end of the page.

	// while_cross_frame_overflows = 0
	// while(cross_frame.overflows && while_cross_frame_overflows < 100 && cross_frame.contents.length > 0){
	// 	while_cross_frame_overflows ++
	// 	app.findGrepPreferences = app.changeGrepPreferences = null;
	// 	app.findGrepPreferences.findWhat = "~b~b";
	// 	found = cross_frame.findGrep();
	// 	found.length < 1 ? while_cross_frame_overflows=100 : found[found.length-1].insertionPoints[0].parentStory.characters[(found[found.length-1].insertionPoints[0].index)].remove();
	// }	

}
