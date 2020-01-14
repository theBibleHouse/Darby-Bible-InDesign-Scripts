
function new_ref(myFrame){

	var me = true, i = 0;
	var lastNote;
	while(me){
		me = timeit(find_number,[myFrame]);
		// $.writeln(i)
		if(me == false || me == '') {break;}
		// 		$.writeln(me.contents.length)
		// $.writeln(me.contents)
		// $.writeln(me.appliedCharacterStyle.name)

		if(me.appliedCharacterStyle == myDocument.characterStyles.item("psalmChapter")){
			my_baseline = Math.round(me.baseline - myDocument.gridPreferences.baselineDivision/3*2);
			i === 0 && lastChapter = chapter;
			chapter = me.contents;
			verse = 0;
			me.appliedCharacterStyle = myDocument.characterStyles.item("psalmChapterProcessed");
			var nextChar = me.parentStory.insertionPoints[me.insertionPoints[-1].index + 1].characters[0];
			//timeit(dates_and_cross,[myFrame, me, 1]);
			//timeit(move_chapter_num_to_anchored_frames,[me]);
			//metricalChapterNumFix(myFrame);
		} else if(me.appliedCharacterStyle == myDocument.characterStyles.item("ChapterNum")){
			//$.writeln("chapter")
			// if this is the first number on the page then update last chapter for heading
			my_baseline = Math.round(me.baseline - myDocument.gridPreferences.baselineDivision/3*2);
			i === 0 && lastChapter = chapter;

			chapter = me.contents;
			verse = 1;
			var nextChar = me.parentStory.insertionPoints[me.insertionPoints[-1].index + 1].characters[0];
			timeit(dates_and_cross,[myFrame, me, 1]);
			timeit(move_chapter_num_to_anchored_frames,[me]);
			metricalChapterNumFix(myFrame);

		} else if(me.appliedCharacterStyle == myDocument.characterStyles.item("VerseNum")){
		//	$.writeln("verse")
			my_baseline = Math.round(me.baseline);
			verse = me.contents;

			timeit(dates_and_cross,[myFrame, chapter, me]);
			timeit(move_verse_numbers_to_frame,[me]);

		} else if (me.contents == 0){
		//	$.writeln("other")
			// section markers
			timeit(move_verse_numbers_to_frame,[me]);
			//asdfasdfsad;

		} else {
			// if there are not verses on the page, still want to add header date as well.
			timeit(dates_and_cross,[myFrame, chapter, 99999]);
		}

		if(i==50){ break;}else{i++;}
	}
}



function find_number(myFrame){

	app.changeGrepPreferences = app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\d+";
	try{
		var me = myFrame.findGrep();
	    if(me.length > 0){
			for(var x=0;x<me.length; x++){
				if(me[x].appliedCharacterStyle.name !== "psalmChapterProcessed"){
					return me[x];
				}
			}
			return false;
		}
		return false;
	} catch(e){
		return false;
	}
}

function get_array_val(array,chapter,verse){
	for(var c=0;c<array.length;c++){
		// splice will delete the item and return it.. faster for the next find.
		if(array[c][1]==chapter && array[c][2]==verse){return array.splice(c)[0][3];}
		}

	return false;
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


	if(cross_frame.contents.length < 1 && (thisdate && my_baseline < 18 || lastdate)){

		// if is for the first verse in the columm then we can use "this date", othersise
		// we need to add "last date" and "this date"
		// this is true if baseline is < 18.8

		cross_frame.contents += (thisdate && my_baseline < 18 || lastdate) + break_char;
		lastdate = (thisdate && my_baseline < 18) || lastdate;
		thisdate && my_baseline < 18 && thisdate = false;
	}

	if(thisdate || thiscross){

		// get current baseline.

		// if insertionPoint[-1.baseline is error, then we have "overflowed" the frame
		// with a linebreak. somehow line breaks don't count as "overflow" property.
		// and need to remove spaces in order to add new notes.
		try{
			var x = (my_baseline - Math.round(cross_frame.insertionPoints[-1].baseline));
		} catch(e){
			// $.writeln(e)
			// $.writeln("in catch")
				app.findGrepPreferences = null;
				app.findGrepPreferences.findWhat = "~b~b";
			 	found = cross_frame.findGrep();
			 	found[found.length-1].insertionPoints[0].parentStory.characters[(found[found.length-1].insertionPoints[0].index)].remove();
			 	var x = (my_baseline - Math.round(cross_frame.insertionPoints[-1].baseline));
		}

		var l = cross_frame.parentStory.appliedParagraphStyle.properties.leading*0.352778;
		// add break char until enough are added to get to verse # that belongs to the cross ref.
		x > 0 && cross_frame.contents += Array(Math.round(x/l + 1)).join(break_char);

		// add date if exists and update last date

		thisdate && (lastdate = thisdate) && (cross_frame.contents += thisdate + break_char);

		// add cross reference
		thiscross && cross_frame.contents += thiscross + break_char;
		// apply temporary paragraph style before formatting
		cross_frame.characters.itemByRange(cross_start, cross_frame.insertionPoints[-1]).appliedParagraphStyle = myDocument.paragraphStyles.item("init-crossReference-"+myFrame.name);
		cross_frame.paragraphs[-1].appliedParagraphStyle= myDocument.paragraphStyles.item("init-crossReference-"+myFrame.name);

		// format newly added references
		timeit(format_cross_reference_verse_numbers,[cross_frame]);

		// reset paragraph style
	    cross_frame.parentStory.appliedParagraphStyle = myDocument.paragraphStyles.item("crossReference-"+myFrame.name);


		app.findGrepPreferences = app.changeGrepPreferences = null;

		// keep ch:v together
		app.findGrepPreferences.findWhat = "\\d+:\\d+";
		app.changeGrepPreferences.noBreak = true;
		cross_frame.parentStory.changeGrep();


		// keep name ch together
		app.findGrepPreferences.findWhat = "\\l\\.*\\s\\d";
		app.changeGrepPreferences.noBreak = true;
		cross_frame.parentStory.changeGrep();


		// replace space with sixth space
		app.findGrepPreferences = app.changeGrepPreferences = null;
		app.findGrepPreferences.findWhat = " ";
		app.changeGrepPreferences.changeTo = "~%";
		cross_frame.parentStory.changeGrep();

		// discretionary break before (
		app.findGrepPreferences.findWhat = "~%[^~k]?(?=\\()";
		app.changeGrepPreferences.changeTo = "~%~k";
		cross_frame.parentStory.changeGrep();


		// remove ; from line endings
		// no longer happening... make it difficult to see devisions in references.
		// now will take it a step further and add a '.' to the last ref in a section.
	 	myLines = cross_frame.parentStory.lines;

	 // 	try {
		// 	for (k=0; k<myLines.length; k++){
		// 	 	if (myLines[k].length > 3){
		// 	    	if(myLines[k].characters[myLines[k].characters.length-3].contents === ";" && myLines[k].characters[myLines[k].characters.length-2].contents === SpecialCharacters.SIXTH_SPACE){
		// 	    		myLines[k].characters[myLines[k].characters.length-3].contents = "";
		// 			}
		// 		}
		// 	}
		// } catch(e){}

		// get last line
		if (myLines[-1].length > 3){
			// most do not end in a ;, but just in case, swap it with a .
			if(myLines[-1].characters[myLines[-1].characters.length-3].contents === ";" && myLines[-1].characters[myLines[-1].characters.length-2].contents === SpecialCharacters.SIXTH_SPACE){
		 		myLines[-1].characters[myLines[-1].characters.length-3].contents = ".";
		 	}
		 	else {
		 		// insert . before line break
		 		myLines[-1].insertionPoints[myLines[-1].characters.length-1].contents = ".";
		 	}
		}

		// remove breaks if references go off the end of the page.
		var while_cross_frame_overflows = 0;
		if(cross_frame.overflows){
			app.findGrepPreferences = app.changeGrepPreferences = null;
			 while(cross_frame.overflows && while_cross_frame_overflows < 100 && cross_frame.contents.length > 0){
			 	while_cross_frame_overflows ++;

			 	app.findGrepPreferences.findWhat = "~b~b";
			 	found = cross_frame.findGrep();
			 	found.length < 1 ? while_cross_frame_overflows=100 : found[found.length-1].insertionPoints[0].parentStory.characters[(found[found.length-1].insertionPoints[0].index)].remove();
			}
		}

		// finally, check if the last ref is below the last text in main text frame (haning down close to notes)
		// if it is, then we need to back out any spaces we can.

		var textFrameBaseline = myFrame.characters[-1].baseline;
		var refFrameBaseline = cross_frame.characters[-1].baseline;

		while_cross_frame_overflows = 0;
		 while(refFrameBaseline > textFrameBaseline && while_cross_frame_overflows < 100 && cross_frame.contents.length > 0){
		 	while_cross_frame_overflows ++;

		 	app.findGrepPreferences.findWhat = "~b~b";
		 	found = cross_frame.findGrep();
		 	found.length < 1 ? while_cross_frame_overflows=100 : found[found.length-1].insertionPoints[0].parentStory.characters[(found[found.length-1].insertionPoints[0].index)].remove();
			refFrameBaseline = cross_frame.characters[-1].baseline;
		}

		// 7 followed by , need kerning
		app.findGrepPreferences = app.changeGrepPreferences = null;
		app.findGrepPreferences.findWhat = "7(?=[,|\\.])";
		var myFinds = cross_frame.parentStory.findGrep();

		for (var g=0;g< myFinds.length;g++){
		   // $.writeln(myFinds[x].contents)
		    myFinds[g].insertionPoints[-1].kerningValue = -150;
		}
	}
}
