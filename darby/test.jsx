var doc = myDocument = app.activeDocument;

//   var selection = app.selection[0]
// //.writeln(selection.appliedParagraphStyle.name)
//   $.writeln(selection.insertionPoints[0].index)


// app.findGrepPreferences.findWhat = "7(?=,)"
// app.changeGrepPreferences.changeTo = "$1"
// app.changeGrepPreferences.properties.kerning = "-150"
// var myFinds = selection.parentStory.findGrep()

// for (var x=0;x< myFinds.length;x++){
//     $.writeln(myFinds[x].contents)
//     myFinds[x].insertionPoints[-1].kerningValue = -150
// }

//  $.writeln(selection.insertionPoints[0].parentTextFrames[0].name)
//  var myFrame = selection.insertionPoints[0].parentTextFrames[0]
// // $.writeln(selection.parentStory.insertionPoints.itemByRange(currentInsertion,nextInsertion + tempIndexOffset).getElements()[0])

// // get the index of the verse number (last time it is found in frame)
// app.findGrepPreferences = app.changeGrepPreferences = null
// app.findGrepPreferences.findWhat = '6';
// me = selection.insertionPoints[0].parentTextFrames[0].findGrep()

// // if nothing found then give up
// if (me.length < 1){return false;}

// // get the start and stop indexes of the paragraph
// var startIndex = me[me.length-1].insertionPoints[0].index
// var endIndex = me[me.length-1].paragraphs[0].insertionPoints[-1].index
// var searchText = myFrame.parentStory.insertionPoints.itemByRange(startIndex,endIndex).getElements()[0]

location = File($.fileName).fsName.split('/')
location.splice(-2,9)

$.writeln(location.join('/'))