
var myDocument = app.activeDocument;

var tfPrefs = {
        autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY,
        autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_CENTER_POINT,
    }


var myBaseObjectStyle = myDocument.objectStyles.add({
    name:"My Base Object Style", 
    basedOn: "[None]",
    enableTextFrameAutoSizingOptions: true,
    textFramePreferences: tfPrefs,
})

var myNewObjectStyle = myDocument.objectStyles.add({
    name:"My Object Style", 
    basedOn: myBaseObjectStyle,
    textFramePreferences: tfPrefs,
    //appliedParagraphStyle: "PStyle",
})