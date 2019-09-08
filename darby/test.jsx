//var doc = myDocument = app.activeDocument;

var currentInsertion = 9539
var nextInsertion = 9698
var tempIndexOffset =  2
  var selection = app.selection[0]
 $.writeln(selection.insertionPoints[0].index)
// $.writeln(selection.insertionPoints[0].index+1)
// $.writeln(selection.parentTextFrames[0].insertionPoints[-1].index)
 $.writeln(selection.parentStory.insertionPoints.itemByRange(currentInsertion,nextInsertion + tempIndexOffset).getElements()[0])


   
//         //     with (FrameFittingOption){
        //         autoFit = true;
        //         FitOptions = FitOptions.frameToContent;
        //     }


            

        //     with (TextFramePreference) {
        //     autoSizingType= AutoSizingTypeEnum.HEIGHT_AND_WIDTH
        //     autoSizingReferencePoint= AutoSizingReferenceEnum.TOP_LEFT_POINT;
            
        // }
         

 // $.writeln(noteFrame.index)


 // $.writeln(noteFrame.paragraphs[0].insertionPoints[0].index)
