﻿size = 'large'if (size == "large"){	meta = {		"gutter": 4.6,		"page_height": 210,		"page_width": 175,		"top_margin": 11.4,		"bottom_margin": 11.4,		"left_margin": 13.6,		"right_margin": 13.6,		"column_width": 48.8*2,		"reference_gutter": 0	}	line_space_adder = 2.82}else if (size == "small"){	meta = {		"gutter": 3.89,		"page_height": 178,		"page_width": 133.5,		"top_margin": 7.9,		"bottom_margin": 7.9,		"left_margin": 28.87,		"right_margin": 12.65 - 3.89,		"reference_margin":7.9,	}	line_space_adder = 2.82}var bookName, chNum = lastChNum = book_name ="";var myFiles = File.openDialog('Select files to place...', undefined, true)myDocument = timeit(document_setup,[size])timeit(create_paragraph_styles,)timeit(create_character_styles,)timeit(create_object_styles,)#include "includes.jsx"app.scriptPreferences.properties = {    //This will prevent screen refresh to the condition you…    enableRedraw:false,    //…set no interaction as dialogs would refresh teh screen    userInteractionLevel:UserInteractionLevels.NEVER_INTERACT,    }start()timeit(placeText,[myFiles, size]);#include "draft_layer.jsx"