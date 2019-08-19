//
// timer function. unfortunatly there are no decorators in js for id,
// but we can call a function with this function to time it.
// 
// example: 
// 
// function me(arg1, arg2) // as many args are needed..
//    {
//        $.writeln(arg1); $.writeln(arg2);
//    }
//
// call function with args as array in timeit function. 
//
// timeit(me,['one','two'])
//


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
    var seconds = name + ","+ timeDiff + ",seconds";
    
    $.writeln(seconds)
    return result
}

