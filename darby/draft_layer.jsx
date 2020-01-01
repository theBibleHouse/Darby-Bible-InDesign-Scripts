

var doc = app.activeDocument;
var newLayer = doc.layers.add({name:"draft"});
var pages = doc.pages;

doc.layers[-1].move(LocationOptions.AT_BEGINNING);

for (var x=0; x < pages.length; x++){

    var newFrame = doc.pages[x].textFrames.add();
    newFrame.properties =
    {
        geometricBounds : [200,25,70,170 ],
        strokeWidth : 0,
        fillColor : "black",
        contents : "draft"  ,
    };
    newFrame.itemLayer = newLayer;
    newFrame.texts[0].fillTint= 7;
    newFrame.texts[0].pointSize= 100;
    newFrame.texts[0].tracking=400;
 }

