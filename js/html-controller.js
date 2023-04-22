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

function toggleMusic(){
    if (audiopaused){
        audi.play();
        document.getElementById('audio-toggle').textContent = 'Pause Music';
    } else {
        audi.pause();
        document.getElementById('audio-toggle').textContent = 'Play Music';
    }
    audiopaused = !audiopaused;
}

function togglem(){
    if (localStorage.getItem('musicon') == 'dontplay'){
        localStorage.setItem('musicon','play');
    } else {
        localStorage.setItem('musicon','dontplay');
    }
    toggleMusic();
}

function togglesfx(){
    if (localStorage.getItem('sfxon') == 'dontplay'){
        localStorage.setItem('sfxon','play');
    } else {
        localStorage.setItem('sfxon','dontplay');
    }
}