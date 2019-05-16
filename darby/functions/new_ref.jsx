function new_foot(myFrame){

	if(myFrame.name=='frame1'){
		
		add_footnotes(myFrame)

		if(myFrame.nextTextFrame.name=="frame2"){
			add_footnotes(myFrame.nextTextFrame)
		}
	}
}

function new_ref(myFrame){
	me = true
	i = 0
	
	while(me){
		//$.writeln('start search')
		me = find_number(myFrame)
		//$.writeln('end search')			
		if(me.appliedCharacterStyle == myDocument.characterStyles.item("ChapterNum")){ 
			// if this is the first number on the page then update last chapter for heading
			my_baseline = me.baseline - myDocument.gridPreferences.baselineDivision/3*2
			if(i==0){lastChapter = chapter}
				
			chapter = me.contents
			verse = 1

			dates_and_cross(myFrame, me, 1)
			move_chapter_num_to_anchored_frames(me)
		}

		else if(me.appliedCharacterStyle == myDocument.characterStyles.item("VerseNum")){ 
				//	$.writeln('verse')
			my_baseline = me.baseline
			verse = me.contents
			//					$.writeln('date and cross')

			dates_and_cross(myFrame, chapter, me)
			//					$.writeln('move to anchor')

			move_verse_numbers_to_frame(me)
		}
		if(i==300){ break }else{i++}
	}
}

function find_number(myFrame){
	app.changeGrepPreferences = app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\d+";
	me = myFrame.findGrep()

	if (me.length < 1){ return false }

	return me[0]
}

function get_array_val(array,chapter,verse){
	for(var c=0;c<array.length;c++){
		// splice will delete the item and return it.. faster for the next find.
		if(array[c][1]==chapter && array[c][2]==verse){return array.splice(c)[0][3];}
		}

	return ''
}

function dates_and_cross(myFrame, chapter, verse){
	cross_frame = myFrame.parentPage.textFrames.itemByName('ref-'+myFrame.name)

	if(cross_frame.contents.length<1){
	
		cross_frame.contents += lastdate

	}

	cross_frame.parentStory.appliedParagraphStyle = myDocument.paragraphStyles.item("crossReference-"+myFrame.name);

	try{cross_location = Math.round(cross_frame.insertionPoints[-1].baseline)}catch(e){}

	while (cross_location < Math.round(my_baseline) && !cross_frame.overflows) {
			cross_frame.contents += String.fromCharCode(13)
			try {cross_location = Math.round(cross_frame.insertionPoints[-1].baseline)} catch(e){$.writeln(e)}
		}

	if(verse != '1'){
		thisdate = get_array_val(date,chapter,verse.contents)
		thiscross = get_array_val(cross,chapter,verse.contents)
			
	}
	else {
		thisdate = get_array_val(date,chapter.contents,verse)
		thiscross = get_array_val(cross,chapter.contents,verse)
		
	}

	if(thisdate.length>0){lastdate=thisdate}

	if(cross_frame.contents.length<1 ){cross_frame.contents += String.fromCharCode(13)}
	cross_frame.contents += thisdate
	if(cross_frame.contents.length<1|| verse == 1){cross_frame.contents += String.fromCharCode(13)}
	cross_frame.contents += thiscross

	format_cross_reference_verse_numbers(cross_frame)
    cross_frame.parentStory.appliedParagraphStyle = myDocument.paragraphStyles.item("crossReference-"+myFrame.name);
	
	while_cross_frame_overflows = 0
	while(cross_frame.overflows && while_cross_frame_overflows < 100){
		while_cross_frame_overflows ++
		app.findGrepPreferences = app.changeGrepPreferences = null;
		app.findGrepPreferences.findWhat = "~b~b";
		try {
			found = cross_frame.findGrep();
			myTextToRemove = found[found.length-1].insertionPoints[0].parentStory.characters[(found[found.length-1].insertionPoints[0].index)].remove();
		} catch (e) {break}
	}

}
