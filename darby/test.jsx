//var doc = myDocument = app.activeDocument;

  var selection = app.selection[0]
 $.writeln(selection.insertionPoints[0].index)
 $.writeln(selection.insertionPoints[0].parentTextFrames[0].name)
 var myFrame = selection.insertionPoints[0].parentTextFrames[0]
// $.writeln(selection.parentStory.insertionPoints.itemByRange(currentInsertion,nextInsertion + tempIndexOffset).getElements()[0])

// get the index of the verse number (last time it is found in frame)
app.findGrepPreferences = app.changeGrepPreferences = null
app.findGrepPreferences.findWhat = '6';
me = selection.insertionPoints[0].parentTextFrames[0].findGrep()

me.length < 1 && return false;
// get the start and stop indexes of the paragraph
var startIndex = me[me.length-1].insertionPoints[0].index
var endIndex = me[me.length-1].paragraphs[0].insertionPoints[-1].index
$.writeln(startIndex)
$.writeln(endIndex)

var searchText = myFrame.parentStory.insertionPoints.itemByRange(startIndex,endIndex).getElements()[0]
$.writeln(searchText.contents)