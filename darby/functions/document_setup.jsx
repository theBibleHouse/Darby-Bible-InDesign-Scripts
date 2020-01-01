function document_setup(size) {
	var myDocument;

	switch (size) {
		case "small":


			myDocument = app.documents.add();
			myDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.millimeters; 
			myDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;
			myDocument.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
			myDocument.documentPreferences.properties = {
            	pageWidth : meta.page_width,
            	pageHeight : meta.page_height,
            	createPrimaryTextFrame : false,
            };

            myDocument.pages[0].marginPreferences.properties = {
	        top : meta.top_margin,
	        left: meta.right_margin,
	        right: meta.left_margin,
	        bottom: meta.bottom_margin
	        };

			//myDocument = app.documents.add(true, app.documentPresets.item("Darby Bible"));
			with(myDocument.gridPreferences){
				baselineStart = 0; // 5.2mm for small
				baselineDivision = "9.995pt";
				baselineShown = true;
				baselineGridRelativeOption=BaselineGridRelativeOption.TOP_OF_MARGIN_OF_BASELINE_GRID_RELATIVE_OPTION;
				var languageWithVendors = app.languagesWithVendors.itemByName("English: USA");
			    languageWithVendors.hyphenationVendor = "Proximity";
			    myDocument.textDefaults.appliedLanguage = languageWithVendors;
			}

			break;
		case "large":
			//myDocument = app.documents.add(true, app.documentPresets.item("Darby Bible Plus"));
			myDocument = app.documents.add();
			// no spreads..
			myDocument.documentPreferences.facingPages = false;

			myDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.millimeters;
			myDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;
			myDocument.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
			myDocument.documentPreferences.properties = {
            	pageWidth : meta.page_width,
            	pageHeight : meta.page_height,
            	createPrimaryTextFrame : false,
            };

	        myDocument.pages[0].marginPreferences.properties = {
	        top : meta.top_margin,
	        left: myDocument.documentPreferences.pageWidth/2-meta.column_width/2-meta.left_margin,
	        right: myDocument.documentPreferences.pageWidth/2-meta.column_width/2-meta.right_margin,
	        bottom: meta.bottom_margin
	        };

			with(myDocument.gridPreferences){
				baselineStart = 0; // 5.2mm for small
				baselineDivision = "10.607pt";
				baselineShown = true;
				baselineGridRelativeOption=BaselineGridRelativeOption.TOP_OF_MARGIN_OF_BASELINE_GRID_RELATIVE_OPTION;

				var languageWithVendors = app.languagesWithVendors.itemByName("English: USA");
			    languageWithVendors.hyphenationVendor = "Proximity";
			    myDocument.textDefaults.appliedLanguage = languageWithVendors;
			}
			break;
		default:
			myDocument = app.documents.add(true, app.documentPresets.item("Darby Bible"));
	}
	// show hidden chars
	myDocument.textPreferences.showInvisibles = true;
	return myDocument;
}