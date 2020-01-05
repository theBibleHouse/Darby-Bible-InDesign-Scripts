
var myDocument = app.activeDocument;

var la = myDocument.selection[0].parentTextFrames[0]

var x = (la.insertionPoints[910].baseline);

$.writeln(la.name)
$.writeln(x)
