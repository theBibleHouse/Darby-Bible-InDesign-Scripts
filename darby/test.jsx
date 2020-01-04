
var myDocument = app.activeDocument;

var startindex = myDocument.selection[0].insertionPoints[0].index
$.writeln(myDocument.selection[0].insertionPoints[0].index) // start index
