function create_object_styles() {
	var myObjectStyle;

	myObjectStyle = myDocument.objectStyles.add({
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
    });

    myObjectStyle.properties = {
        anchoredObjectSettings : {
            anchoredPosition : AnchorPosition.anchored,
            anchorPoint : AnchorPoint.BOTTOM_RIGHT_ANCHOR,
            horizontalReferencePoint : AnchoredRelativeTo.TEXT_FRAME,
            horizontalAlignment : HorizontalAlignment.leftAlign,
            verticalReferencePoint : VerticallyRelativeTo.LINE_BASELINE,
            anchorXoffset : -meta.gutter + 1.6,
            anchorYoffset : 0,
            pinPosition : true,
        },

        textFramePreferences : {
	        autoSizingType: AutoSizingTypeEnum.HEIGHT_AND_WIDTH,
	        autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_LEFT_POINT
	    },

     	frameFittingOptions : {
        	autoFit: true,
        	FitOptions: FitOptions.frameToContent
    	}
    };

    myObjectStyle = myObjectStyle.duplicate();

	myObjectStyle.properties = {
		name: "VerseMarker-frame2",
        anchoredObjectSettings : {
            anchorPoint : AnchorPoint.BOTTOM_LEFT_ANCHOR,
            horizontalAlignment : HorizontalAlignment.rightAlign,
        },
    };

	myObjectStyle = myDocument.objectStyles.add();
	myObjectStyle.properties = {
		name: "Page Number",
		enableParagraphStyle: true,
		appliedParagraphStyle: myDocument.paragraphStyles.item("Page Num Large"),
		enabledStroke: true,
		enableTextWrapAndOthers: true,
		strokeWeight: 0,
		enableAnchoredObjectOptions: true,
		enableTextFrameAutoSizingOptions: true,
		enableTextFrameGeneralOptions: true,
		enableFrameFittingOptions: true
	};

	myObjectStyle.properties = {
		textFramePreferences: {
			autoSizingReferencePoint: AutoSizingReferenceEnum.BOTTOM_CENTER_POINT,
			autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY
		}
	};

	myObjectStyle = myDocument.objectStyles.add();
	myObjectStyle.properties = {
		name: "Page Heading",
		enableParagraphStyle: true,
		appliedParagraphStyle: myDocument.paragraphStyles.item("Heading Large"),
		enabledStroke: true,
		enableTextWrapAndOthers: true,
		strokeWeight: 0,
		enableAnchoredObjectOptions: true,
		enableTextFrameAutoSizingOptions: true,
		enableTextFrameGeneralOptions: true,
		enableFrameFittingOptions: true
	};

	myObjectStyle.properties = {
		textFramePreferences: {
			autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_CENTER_POINT,
			autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY
		}
	};

	myObjectStyle = myDocument.objectStyles.add();
	myObjectStyle.properties = {
		name: "Page Heading Small",
		enableParagraphStyle: true,
		appliedParagraphStyle: myDocument.paragraphStyles.item("Heading Small"),
		enabledStroke: true,
		enableTextWrapAndOthers: true,
		strokeWeight: 0,
		enableTextFrameGeneralOptions: true,
	};

	myObjectStyle = myDocument.objectStyles.add();
	myObjectStyle.properties = {
		name: "Chapter Marker",
		enableParagraphStyle: true,
		appliedParagraphStyle: myDocument.paragraphStyles.item("ChapterNum"),
		enabledStroke: true,
		enableTextWrapAndOthers: true,
		strokeWeight: 0,
		enableAnchoredObjectOptions: true,
		enableTextFrameAutoSizingOptions: true,
		enableTextFrameGeneralOptions: true,
		enableFrameFittingOptions: true,
	};

	myObjectStyle.properties = {
		anchoredObjectSettings: {
			anchorPoint: AnchorPoint.TOP_LEFT_ANCHOR,
			anchoredPosition: AnchorPosition.anchored,
			horizontalReferencePoint: AnchoredRelativeTo.COLUMN_EDGE,
			horizontalAlignment: HorizontalAlignment.leftAlign,
			verticalReferencePoint: VerticallyRelativeTo.TOP_OF_LEADING,
			anchorXoffset: -meta.gutter,
			anchorYoffset: '0mm',
			pinPosition: true,
		},

		frameFittingOptions : {
			autoFit: true,
			FitOptions: FitOptions.frameToContent
		},

		textWrapPreferences: {
			textWrapMode: TextWrapModes.BOUNDING_BOX_TEXT_WRAP,
		}
	};

	myObjectStyle.properties = {
		textWrapPreferences: {
			textWrapOffset: [0, 0, '-1mm', '1.6mm']
		},
	};

	myObjectStyle = myDocument.objectStyles.add();
	myObjectStyle.properties = {
		name: "Chapter Marker Right",
		enableParagraphStyle: true,
		appliedParagraphStyle: myDocument.paragraphStyles.item("ChapterNum"),
		enabledStroke: true,
		enableTextWrapAndOthers: true,
		strokeWeight: 0,
		enableAnchoredObjectOptions: true,
		enableTextFrameAutoSizingOptions: true,
		enableTextFrameGeneralOptions: true,
		enableFrameFittingOptions: true
	};

	myObjectStyle.properties = {
		anchoredObjectSettings: {
			anchorPoint: AnchorPoint.TOP_LEFT_ANCHOR,
			anchoredPosition: AnchorPosition.anchored,
			horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
			horizontalAlignment: HorizontalAlignment.leftAlign,
			verticalReferencePoint: VerticallyRelativeTo.TOP_OF_LEADING,
			anchorXoffset: -meta.gutter,
			anchorYoffset: '0mm',
			pinPosition: true,
		},

		FrameFittingOption: {
			autoFit: true,
			FitOptions: FitOptions.frameToContent
		},

		textWrapPreferences: {
			textWrapMode: TextWrapModes.BOUNDING_BOX_TEXT_WRAP,
		}
	};

	myObjectStyle.properties = {
		textWrapPreferences: {
			textWrapOffset: [0, 0, '-1mm', '1.6mm']
		},
	};

	myObjectStyle = myDocument.objectStyles.add();
	myObjectStyle.properties = {
		name: "Book Name Frame",
		enableTextFrameBaselineOptions: true,
		enableTextFrameGeneralOptions: true,
		enableAnchoredObjectOptions: true,
		enableFrameFittingOptions: true,
		enableTextFrameAutoSizingOptions: true,
		enableParagraphStyle: true,
		enableStoryOptions: true,
		enableTextWrapAndOthers: true,
		enabledStroke: true,
		strokeWeight: 0,
	};

	myObjectStyle.properties = {
		textFramePreferences: {
			autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY,
			autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_CENTER_POINT,
			insetSpacing: [0, 0, '2mm', 0],
		},

		textWrapPreferences: {
			textWrapMode: TextWrapModes.JUMP_OBJECT_TEXT_WRAP,
		},
	};

	myObjectStyle.properties = {
		textWrapPreferences: {
			textWrapOffset: [0, 0, '6mm', 0] // this is the min. when frame is created this is adjusted to hit the next basline.
		},
		textFramePreferences: {
			insetSpacing: [0, 0, '2mm', 0],
		},
	};

	if (size == "small"){
		myObjectStyle.properties = {
			textWrapPreferences: {
				textWrapOffset: [0, 0, "1.5mm", 0]
			}
		};
	}

	myObjectStyle = myDocument.objectStyles.add();
	myObjectStyle.properties = {
		name: "Section Heading",
		appliedParagraphStyle: myDocument.paragraphStyles.item("SectionHeading"),
		enableTextFrameBaselineOptions: true,
		enableTextFrameGeneralOptions: true,
		enableAnchoredObjectOptions: true,
		enableFrameFittingOptions: true,
		enableTextFrameAutoSizingOptions: true,
		enableParagraphStyle: true,
		enableStoryOptions: true,
		enableTextWrapAndOthers: true,
		enabledStroke: true,
		strokeWeight: 0,
	};

	myObjectStyle.properties = {
		textFramePreferences: {
			autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY,
			autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_CENTER_POINT,
		},

		textWrapPreferences: {
			textWrapMode: TextWrapModes.JUMP_OBJECT_TEXT_WRAP,
		},

		anchoredObjectSettings: {
			anchorPoint: AnchorPoint.TOP_RIGHT_ANCHOR,
			anchoredPosition: AnchorPosition.anchored,
			horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
			horizontalAlignment: HorizontalAlignment.rightAlign,
			verticalReferencePoint: VerticallyRelativeTo.TOP_OF_LEADING,
			anchorXoffset: '0mm',
			anchorYoffset: '0mm',
			pinPosition: true,
		}
	};

	myObjectStyle = myDocument.objectStyles.add();
	myObjectStyle.properties = {
		name: "Foot Note Frame",
		appliedParagraphStyle: myDocument.paragraphStyles.item("Footnote"),
		enableTextFrameBaselineOptions: true,
		enableTextFrameGeneralOptions: true,
		enableAnchoredObjectOptions: true,
		enableFrameFittingOptions: true,
		enableTextFrameAutoSizingOptions: true,
		enableParagraphStyle: true,
		enableStoryOptions: true,
		enableTextWrapAndOthers: true,
		enabledStroke: true,
		strokeWeight: 0,
	};

	myObjectStyle.properties = {
		textFramePreferences: {
			autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY,
			autoSizingReferencePoint: AutoSizingReferenceEnum.BOTTOM_CENTER_POINT,
		},

		textWrapPreferences: {
			textWrapMode: TextWrapModes.BOUNDING_BOX_TEXT_WRAP,
		},
	};

	myObjectStyle.properties = {
		textFramePreferences: {
			insetSpacing : [.65*myDocument.gridPreferences.baselineDivision.toFixed(2), meta.page_width / 2 - meta.column_width / 2 - meta.left_margin-meta.gutter/2, 0, meta.page_width / 2 - meta.column_width / 2 - meta.left_margin-meta.gutter/2],
		}
	};
}