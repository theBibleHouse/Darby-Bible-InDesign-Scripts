var doc = myDocument = app.activeDocument;
//  var selection = app.selection[0]
// $.writeln(selection.insertionPoints[0].index)
// $.writeln(selection.insertionPoints[0].index+1)
// $.writeln(selection.parentStory.insertionPoints.itemByRange(selection.insertionPoints[0].index,selection.insertionPoints[0].index+1).length)
    var myObjectStyle;
    
    
myObjectStyle = myDocument.objectStyles.add();
    myObjectStyle.properties = {
        name: "VerseMarker-frame1",
        enableParagraphStyle: true,
        appliedParagraphStyle: myDocument.paragraphStyles.item("VerseNum"),
        enabledStroke: true,
        enableTextWrapAndOthers: true,
        strokeWeight: 0,
        enableTextFrameAutoSizingOptions: true,  
        enableTextFrameGeneralOptions: true,
        enableFrameFittingOptions: true,
        enableAnchoredObjectOptions: true,
    }
    myObjectStyle.properties = {
        anchoredObjectSettings : {
            anchoredPosition : AnchorPosition.anchored,
            anchorPoint : AnchorPoint.BOTTOM_RIGHT_ANCHOR,
            horizontalReferencePoint : AnchoredRelativeTo.TEXT_FRAME,
            horizontalAlignment : HorizontalAlignment.leftAlign,
            verticalReferencePoint : VerticallyRelativeTo.LINE_BASELINE,
            anchorXoffset : 3, 
            anchorYoffset : 0,
            pinPosition : true,
        }
    }
    myObjectStyle.properties = {
        textFramePreferences : {
        autoSizingType: AutoSizingTypeEnum.HEIGHT_AND_WIDTH,
        autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_LEFT_POINT
    }
}
   myObjectStyle.properties = {
    frameFittingOptions : {
        autoFit: true,           
    }
    }
        //     with (FrameFittingOption){
        //         autoFit = true;
        //         FitOptions = FitOptions.frameToContent;
        //     }


            

        //     with (TextFramePreference) {
        //     autoSizingType= AutoSizingTypeEnum.HEIGHT_AND_WIDTH
        //     autoSizingReferencePoint= AutoSizingReferenceEnum.TOP_LEFT_POINT;
            
        // }
         

 // $.writeln(noteFrame.index)


 // $.writeln(noteFrame.paragraphs[0].insertionPoints[0].index)