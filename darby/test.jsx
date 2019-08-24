
book_name = 'ruth'

function get_array_val(array,chapter,verse){
    var data = []
    for(var c=0;c<array.length;c++){
        if(array[c][1]==chapter && array[c][2]==verse){
            $.writeln(array[c])
            data.push(array[c]);
        }
    }
    var result = data.length < 1 ? false : data
    return result
}


function get_content_array(file){
    me = File($.fileName).fsName.split('/')

    me.splice(-1,3)

    file = File(me.join('/') + '/' + 'content' + '/' + file + '.txt')

    file.open("r")
    array = []
    do {
        line = file.readln().split("\t");

        if (line[0].toUpperCase() == book_name.toUpperCase()) {
          
        array.push(line)
        }
    } while (file.eof == false);

    return array
}


note = get_content_array('note')
//note = note.reverse()

var test = get_array_val(note,1,1)
$.writeln(test.length)
for(var x=0;x <test.length;x++){
                $.writeln(test[x])
                $.writeln(test[x].slice(5)          )
                                $.writeln(test[x].slice(1,2)          )
                                                $.writeln(test[x].slice(2,3)          )
        }
