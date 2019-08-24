function new_foot(myFrame){

	
	if(myFrame.name=='frame1'){
		add_footnotes(myFrame)
		if(myFrame.nextTextFrame.name=="frame2"){
			add_footnotes(myFrame.nextTextFrame)
		}
	}
}

function get_foot_array_val(array,chapter,verse){
	var data = []
    for(var c=0;c<array.length;c++){
        if(array[c][1]==chapter && array[c][2]==verse){data.push(array[c]);}
    }
    var result = data.length < 1 ? false : data
    return result
}


var alpha = 'z'
function alpha_increment()
{
    alpha = alpha === 'z' ? 'a' : String.fromCharCode(alpha.charCodeAt()+1)
    return alpha       
}


function add_footnotes(myFrame){

/*

	1. get all numbers on page, loop through them. use lastchapter and chapter to know what chapter numbers are there.
	2. for each reference check the array and remove it when found. add in the note letter in the verse.
	3. add it to the text box
	4. verify that verse number is still on the page. 
	5. if it is not on the page anymore then reduce text frame size until it is back. link text frame to next page so that 
	   the excess text and flow over.

	at the end print out anything that is left in the note/date/cross arrays to see what was not found.

*/

	// get all numbers on page.
	app.changeGrepPreferences = app.findGrepPreferences = null;
	app.findGrepPreferences.findWhat = "\\d+";
	var numbers = myFrame.findGrep();

	// loop through them, one at a time.
	// check if they are still on the page. don't use grep, just check index/baseline?
	// if still on the page, then add the note. Don't care if it changed col, etc.
	var lastverse = 0
	var lastnote = ''
	for(var me=0; me < numbers.length;me++){

		if(numbers[me].appliedCharacterStyle == myDocument.characterStyles.item("ChapterNum")){ 

			chapter = numbers[me].contents
			verse = 1

		} else if(numbers[me].appliedCharacterStyle == myDocument.characterStyles.item("VerseNum")){ 
			verse = numbers[me].contents
		}

		var thisnote = timeit(get_foot_array_val,[note,chapter,verse]) 

		if(thisnote){

			
			if(!myFrame.parentPage.textFrames.itemByName('note-frame').isValid){
				var footframe = addFootnoteTextFrame(myFrame.parentPage)
			} else {
				footframe = myFrame.parentPage.textFrames.itemByName('note-frame')	
			}

			
			for(var x=0;x < thisnote.length;x++){

				
				// get reference only if verse changed
				
				verse !== lastverse && footframe.contents += thisnote[x].slice(1,2) + "." + thisnote[x].slice(2,3) + String.fromCharCode(8201)  

				// add marker if notes are not the same
				thisnote !== lastnote && marker = alpha_increment()
				thisnote !== lastnote && footframe.contents += marker + thisnote[x].slice(5) + String.fromCharCode(8203, 8194, 8203)
				// em space 8195
				// en space 8194
				// thin space 8201

				// if notes are the same, put the marker in the new place as well... in the verse.
				// add the marker to the verse.
				
				lastverse = verse
				lastnote = thisnote[x]
			}

			if(myFrame.parentPage.textFrames.itemByName('note-frame').isValid){
		
		footframe.parentStory.characters.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("Footnote")
		
		timeit(footnoteSuperscript,[footframe]);
		timeit(bold,[footframe, "\\d+:\\d+"])
		timeit(noBreak,[footframe, "\\d+:\\d+\\s\\l\\s[\\l\\u]+"]);
	}


		}
	

		
		
	}
	
	
	// 		
}