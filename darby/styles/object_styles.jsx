function create_object_styles() {
	var myObjectStyle;
	try {
		myObjectStyle = myDocument.objectStyles.item("Section Marker");
		myName = myObjectStyle.name;
	} catch (e) {
		myObjectStyle = myDocument.objectStyles.add({
			name: "Section Marker"
		});
		myObjectStyle.properties = {
			enabledStroke: true,
			strokeWeight: 0,
		}
	}
	try {
		myObjectStyle = myDocument.objectStyles.item("VerseMarker-frame1");
		myName = myObjectStyle.name;
	} catch (e) {
		with(myDocument.objectStyles.add({
			name: "VerseMarker-frame1"
		})) {
			enableParagraphStyle = true;
			appliedParagraphStyle = myDocument.paragraphStyles.item("VerseNum");
			enableTextWrapAndOthers: true,

			enabledStroke = true;
			strokeWeight = 0;
			enableAnchoredObjectOptions = true;
			enableTextFrameAutoSizingOptions= true;

			with(anchoredObjectSettings) {
				//spineRelative = true;
				anchorPoint = AnchorPoint.BOTTOM_RIGHT_ANCHOR;
				anchoredPosition = AnchorPosition.anchored;
				horizontalReferencePoint = AnchoredRelativeTo.TEXT_FRAME;
				horizontalAlignment = HorizontalAlignment.leftAlign;
				verticalReferencePoint = VerticallyRelativeTo.LINE_BASELINE;
				anchorXoffset = -2.5; //3
				anchorYoffset = 0;
				pinPosition = true;

			}
			enableTextFrameGeneralOptions = true;

			enableFrameFittingOptions = true;
			autoFit = true;
			FrameFittingOption.FitOptions = FitOptions.frameToContent;

			with (textFramePreferences) {
			autoSizingReferencePoint= AutoSizingReferenceEnum.TOP_LEFT_POINT;
			autoSizingType= AutoSizingTypeEnum.HEIGHT_AND_WIDTH
		}
			//textFramePreferences.useFixedColumnWidth = true;
			//textFramePreferences.textColumnFixedWidth = sidenote.width
		}
	}
	try {
		myObjectStyle = myDocument.objectStyles.item("VerseMarker-frame2");
		myName = myObjectStyle.name;
	} catch (e) {
		with(myDocument.objectStyles.add({
			name: "VerseMarker-frame2"
		})) {
			enableParagraphStyle = true;
			enableTextWrapAndOthers: true,

			appliedParagraphStyle = myDocument.paragraphStyles.item("VerseNum");
			enabledStroke = true;
			strokeWeight = 0;
			enableAnchoredObjectOptions = true;
			enableTextFrameAutoSizingOptions= true;

			with(anchoredObjectSettings) {
				//spineRelative = true;
				anchorPoint = AnchorPoint.BOTTOM_LEFT_ANCHOR;
				anchoredPosition = AnchorPosition.anchored;
				horizontalReferencePoint = AnchoredRelativeTo.TEXT_FRAME;
				horizontalAlignment = HorizontalAlignment.rightAlign;
				verticalReferencePoint = VerticallyRelativeTo.LINE_BASELINE;
				anchorXoffset = '-2.5mm'; //-3
				anchorYoffset = 0;
				pinPosition = true;

			}
			enableTextFrameGeneralOptions = true;

			enableFrameFittingOptions = true;
			autoFit = true;
			FrameFittingOption.FitOptions = FitOptions.frameToContent;
			with (textFramePreferences) {
			autoSizingReferencePoint= AutoSizingReferenceEnum.TOP_LEFT_POINT;
			autoSizingType= AutoSizingTypeEnum.HEIGHT_AND_WIDTH
		}
			//textFramePreferences.useFixedColumnWidth = true;
			//textFramePreferences.textColumnFixedWidth = sidenote.width
		}
	}


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
		enableFrameFittingOptions: true,
		textFramePreferences: {
			autoSizingReferencePoint: AutoSizingReferenceEnum.BOTTOM_CENTER_POINT,
			autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY
		},
		
	}
	
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
		enableFrameFittingOptions: true,
		textFramePreferences: {
			autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_CENTER_POINT,
			autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY
		},
		
	}

	myObjectStyle = myDocument.objectStyles.add();
	myObjectStyle.properties = {
		name: "Page Heading Small",
		enableParagraphStyle: true,
		appliedParagraphStyle: myDocument.paragraphStyles.item("Heading Small"),
		enabledStroke: true,
		enableTextWrapAndOthers: true,
		strokeWeight: 0,
		//enableAnchoredObjectOptions: true,
		//enableTextFrameAutoSizingOptions: true,
		
		enableTextFrameGeneralOptions: true,
		//enableFrameFittingOptions: true,
		textFramePreferences: {
			//autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_CENTER_POINT,
			//autoSizingType: AutoSizingTypeEnum.WIDTH_ONLY
		},
		
	}


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
		anchoredObjectSettings: {
			anchorPoint: AnchorPoint.TOP_LEFT_ANCHOR,
			anchoredPosition: AnchorPosition.anchored,
			horizontalReferencePoint: AnchoredRelativeTo.COLUMN_EDGE,
			horizontalAlignment: HorizontalAlignment.leftAlign,
			verticalReferencePoint: VerticallyRelativeTo.TOP_OF_LEADING,
			anchorXoffset: '0mm',
			anchorYoffset: '0mm',
			pinPosition: true,
		},
		enableTextFrameGeneralOptions: true,
		enableFrameFittingOptions: true,
		autoFit: true,
		FrameFittingOption: {
			FitOptions: FitOptions.frameToContent
		},
		textWrapPreferences: {
			textWrapMode: TextWrapModes.BOUNDING_BOX_TEXT_WRAP,
		},
		textFramePreferences: {
			// currently causing a crash
			//autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_LEFT_POINT,
			//autoSizingType: AutoSizingTypeEnum.HEIGHT_AND_WIDTH
		}
	}
	myObjectStyle.properties = {textWrapPreferences: {
			textWrapOffset: [0, 0, '-1mm', '1.5mm']
		}}

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
		anchoredObjectSettings: {
			anchorPoint: AnchorPoint.TOP_RIGHT_ANCHOR,
			anchoredPosition: AnchorPosition.anchored,
			horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
			horizontalAlignment: HorizontalAlignment.rightAlign,
			verticalReferencePoint: VerticallyRelativeTo.TOP_OF_LEADING,
			anchorXoffset: '0mm',
			anchorYoffset: '0mm',
			pinPosition: true,
		},
		enableTextFrameGeneralOptions: true,
		enableFrameFittingOptions: true,
		autoFit: true,
		FrameFittingOption: {
			FitOptions: FitOptions.frameToContent
		},
		textWrapPreferences: {
			textWrapMode: TextWrapModes.BOUNDING_BOX_TEXT_WRAP,
		},
		textFramePreferences: {
			//currentlyc ausinga. crash

			//autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_RIGHT_POINT,
			//autoSizingType: AutoSizingTypeEnum.HEIGHT_AND_WIDTH
		}
	}
	myObjectStyle.properties = {textWrapPreferences: {
			textWrapOffset: [0, "1.5mm", 0, 0]
		}}

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
		textFramePreferences: {
			autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY,
			autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_CENTER_POINT,
			insetSpacing: [0, 0, '4mm', 0],
		},
		textWrapPreferences: {
			textWrapMode: TextWrapModes.JUMP_OBJECT_TEXT_WRAP,
			textWrapOffset: [0, 0, "3mm", 0]
		}
	}
		myObjectStyle.properties = {textWrapPreferences: {
			textWrapOffset: [0, 0, "3mm", 0]
		}}
		if (size == "small"){
			myObjectStyle.properties = {textWrapPreferences: {
			textWrapOffset: [0, 0, "1.5mm", 0]	
		}
	}}

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
		},
	}
}