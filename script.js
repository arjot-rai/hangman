var arrayList = ["CAT", "DOG", "PROGRAMMER", "COMPUTER"];
var trash = [];
var cur = "";
var partialResult = [];
var errno = 0;
var errorDict ={
    1: "head",
    2: "body-hang",
    3: "arm-1",
    4: "arm-2",
    5: "leg-1",
    6: "leg-2"
}
function randomWord(){

    if(arrayList.length == 0){

        while(trash.length > 0){
            let l = trash.pop();
            arrayList.push(l);
        }
  
    }

    var index = Math.floor(Math.random()*(arrayList.length));
    let el = arrayList[index]
    trash.push(el);
    arrayList.splice(index, 1);
    return el;
}

function game(c){
    if(cur.indexOf(c) > -1){
        let i = 0;
        while(i < cur.length){
            if(cur.charAt(i) === c){
                partialResult[i] = c;
            }
            i += 1;
        }
        $(".output").empty();
        $(".output").append("<p>" + partialResult.join(' ') + "</p>")
  
        if(cur == partialResult.join('')){
            setTimeout(won, 1000);
        }
    }
    else{
        errno += 1;
        console.log(errno);
        var child = $(".container svg").children("." + errorDict[errno]);
        child.css("display", "inline");
        console.log(child)
        if(errno == 6){
            setTimeout(lost, 1000);
        }
    }
}


function clear(){

    $(".head, .body-hang, .arm-1, .arm-2, .leg-1, .leg-2").css("display", "none");
}

function lost(){
    errno = 0;
    alert("You Lose!!")
}

function won(){
    errno = 0;
    alert("You Win!!")
}

function main(){
    errno = 0;
    
    cur = randomWord();
    let i = 0;
    partialResult = [];
    while(i < cur.length){
        partialResult.push("__");
        i += 1;
    }
    $(".output").append("<p>" + partialResult.join(' ') + "</p>");
}



$("document").ready(function(){
    main();
    $(".new-start").click(function(){
        errno = 0;
        clear();
        $(".output").empty();
        main();
    })
    $(".start-over").click(function(){
        $(".output").empty();
        var empty = [];
        var i = 0;
        while(i < cur.length){
            empty.push("__");
            i += 1;
        }
        $(".output").append("<p>" + empty.join(" ") + "</p>");
    })
    $(".solve").click(function(){
        errno = 0;
        $(".output").empty();
        temp = cur.split('');
        $(".output").append("<p>" + temp.join(" ") + "</p>");
    })
    $("li").click(function(){
        let c = $(this).text(); 
        console.log(c);
        game(c);
    })  
})

// add more words
