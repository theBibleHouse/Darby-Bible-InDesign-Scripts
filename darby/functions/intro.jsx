

function get_intro(){
	$.writeln(book_name)
	//book_name = '1John'
	var the_arr = File($.fileName).fsName.split('/');
    the_arr.splice(-2, 2);
    path = the_arr.join('/')

    my_intro = File(path + "/content/intro/"+book_name+".txt")

	my_intro.open();

	return my_intro.read()
}



