function mouse_position(){
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

    mousepos = [posX,posY-pushdown];

    //console.log(mousetrail);

    if (mousedown){
        addpoint();
        //console.log(mousetrail);
    }
}

function goleaderboard(){
    window.open('https://skparab1.github.io/inkball/leaderboard.html?forcepush='+mapnum);
}