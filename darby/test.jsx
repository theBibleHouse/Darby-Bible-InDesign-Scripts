
var myDocument = app.activeDocument;
var myFrame = myDocument.selection[0]

app.findGrepPreferences = app.changeGrepPreferences = null;
app.findGrepPreferences.position = Position.SUPERSCRIPT;
app.findGrepPreferences.leftIndent > "7mm";
app.findGrepPreferences.findWhat = "(\\d+)\\s";

me = myFrame.parentStory.findGrep()

$.writeln(me.length)