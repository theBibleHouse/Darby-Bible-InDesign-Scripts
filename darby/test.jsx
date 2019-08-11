

function me(mystring,secondstring){
    $.writeln("first: " + mystring)
    $.writeln("second: " + secondstring)
    return "result"
}


function timeit(func,args){
    
    // start time
    var startTime = new Date(); 
    
    // excecute function
    var result = func.apply(null,args);
    
    // get function name
    var name=func.toString();
    var reg=/function ([^\(]*)/;
    name = reg.exec(name)[1];

    // end time
    var endTime = new Date();

    var timeDiff = (endTime - startTime)/1000; //in ms

    // get seconds 
    var seconds = name + " > "+ timeDiff + " seconds";
    
    $.writeln(seconds)
    return result
}



var x = timeit(me,["test","test2"])

$.writeln(x)