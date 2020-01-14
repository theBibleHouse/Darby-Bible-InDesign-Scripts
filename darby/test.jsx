
var myDocument = app.activeDocument;

var la = myDocument.selection[0].parentTextFrames[0]


var g = [];
app.changeGrepPreferences = app.findGrepPreferences = null;
app.findGrepPreferences.findWhat = "\\d+";
app.findGrepPreferences.appliedCharacterStyle != myDocument.characterStyles.item("psalmChapterProcessed");
q = 	la.parentStory.findGrep()

$.writeln(q.length)

$.writeln(q[0].contents)
$.writeln(q[1].contents)
$.writeln(q[2].contents)
$.writeln(q[3].contents)

try{
    if(me.length > 0){
		for(var x=0;x<me.length; x++){
			if(me[x].appliedCharacterStyle !== myDocument.characterStyles.item("psalmChapterProcessed"))
				return me[x];
		}
		return false;
	}
} catch(e){
	return false;
}
