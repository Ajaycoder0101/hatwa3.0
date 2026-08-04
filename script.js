/* ==========================================
   HATWA CRICKET CLUB
   Made By Ajay Yadav
   script.js Part 1
========================================== */


// ============================
// SCREEN CONTROL
// ============================
document.addEventListener("DOMContentLoaded", function(){


const playBtn = document.getElementById("playBtn");


playBtn.onclick = function(){

    showScreen("playerScreen");

};



function showScreen(id){

    document.querySelectorAll(".screen").forEach(screen=>{

        screen.classList.remove("active");

    });


    document.getElementById(id).classList.add("active");

}


});
const screens = document.querySelectorAll(".screen");


function showScreen(id){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });


    document.getElementById(id)
    .classList.add("active");

}



// ============================
// HOME BUTTONS
// ============================
document.getElementById("playerNextBtn")
.onclick=function(){

    let batsman =
    document.getElementById("batsmanSelect").value;


    let bowler =
    document.getElementById("bowlerSelect").value;


    if(batsman=="" || bowler==""){

        alert("Please Select Players");

        return;

    }


    // Name show

    document.getElementById("batsmanImage")
    .alt=batsman;


    document.getElementById("bowlerImage")
    .alt=bowler;


    showScreen("setupScreen");

};



// ============================
// PLAYER SCREEN
// ============================


document.getElementById("playerBackBtn")
.onclick=function(){

    showScreen("homeScreen");

};



document.getElementById("playerNextBtn")
.onclick=function(){

    let batsman =
    document.getElementById("batsmanSelect").value;


    let bowler =
    document.getElementById("bowlerSelect").value;


    if(batsman=="" || bowler==""){

        alert("Please Select Players");

        return;

    }


    document.getElementById("batsmanImage")
    .src="images/batsman.png";


    document.getElementById("bowlerImage")
    .src="images/bowler.png";


    showScreen("setupScreen");


};



// ============================
// SETUP SCREEN
// ============================


document.getElementById("setupBackBtn")
.onclick=function(){

    showScreen("playerScreen");

};



let selectedOvers = 2;

let difficulty="Easy";



document.querySelectorAll(".overBtn")
.forEach(btn=>{


    btn.onclick=function(){


        document.querySelectorAll(".overBtn")
        .forEach(b=>b.classList.remove("active"));


        this.classList.add("active");


        selectedOvers =
        Number(this.dataset.over);


    };


});



document.querySelectorAll(".difficultyBtn")
.forEach(btn=>{


    btn.onclick=function(){


        document.querySelectorAll(".difficultyBtn")
        .forEach(b=>b.classList.remove("active"));


        this.classList.add("active");


        difficulty =
        this.dataset.level;


    };


});



// ============================
// TOSS PAGE
// ============================


document.getElementById("tossPageBtn")
.onclick=function(){

    showScreen("tossScreen");

};



document.getElementById("tossBackBtn")
.onclick=function(){

    showScreen("setupScreen");

};/* ==========================================
   TOSS SYSTEM
   script.js Part 2
========================================== */


let tossWinner = "";

let playerChoice = "";



// ============================
// TOSS FUNCTION
// ============================


function playToss(choice){


    let coin =
    document.getElementById("coin");


    coin.classList.add("spin");



    setTimeout(()=>{


        coin.classList.remove("spin");


        let result =
        Math.random()>0.5 ? "HEAD" : "TAIL";



        if(choice===result){


            tossWinner="You";


            document.getElementById("tossResult")
            .innerHTML =
            "🎉 You Won The Toss";


            document.getElementById("batBowlChoice")
            .style.display="block";


        }

        else{


            tossWinner="Computer";


            document.getElementById("tossResult")
            .innerHTML =
            "😔 Computer Won The Toss";


            // Computer automatic decision

            setTimeout(()=>{


                startMatch("Computer");


            },1500);


        }



    },1000);



}



// ============================
// HEAD TAIL BUTTON
// ============================


document.getElementById("headBtn")
.onclick=function(){

    playToss("HEAD");

};



document.getElementById("tailBtn")
.onclick=function(){

    playToss("TAIL");

};



// ============================
// BAT/BOWL CHOICE
// ============================


document.getElementById("batFirstBtn")
.onclick=function(){


    playerChoice="Bat";


    document.getElementById("startMatchBtn")
    .style.display="block";


};



document.getElementById("bowlFirstBtn")
.onclick=function(){


    playerChoice="Bowl";


    document.getElementById("startMatchBtn")
    .style.display="block";


};



// ============================
// START MATCH
// ============================


document.getElementById("startMatchBtn")
.onclick=function(){


    startMatch();


};





function startMatch(){


    showScreen("matchScreen");



    document.getElementById("inningsNo")
    .innerHTML="1";



    document.getElementById("scoreRuns")
    .innerHTML="0/0";



    document.getElementById("scoreOvers")
    .innerHTML="0.0";



    document.getElementById("targetScore")
    .innerHTML="--";



    document.getElementById("ballResult")
    .innerHTML=
    "Match Started 🏏";



    document.getElementById("commentary")
    .innerHTML=
    "First innings begins";



}/* ==========================================
   BATTING ENGINE
   script.js Part 3
========================================== */


// MATCH VARIABLES

let runs = 0;

let wickets = 0;

let balls = 0;

let innings = 1;

let target = 0;



// Possible outcomes

const ballOutcomes = [

0,1,2,3,4,6,"W"

];



// ============================
// PLAY BALL
// ============================


function playBall(shot){


    // Ball Animation

    let ball =
    document.getElementById("ball");


    ball.classList.remove("move");


    void ball.offsetWidth;


    ball.classList.add("move");



    setTimeout(()=>{


        let result =
        ballOutcomes[
        Math.floor(Math.random()*ballOutcomes.length)
        ];



        // BAT ANIMATION

        let bat =
        document.getElementById("batsmanImage");


        bat.classList.add("hit");


        setTimeout(()=>{

            bat.classList.remove("hit");

        },400);



        if(result==="W"){


            wickets++;


            document.getElementById("ballResult")
            .innerHTML="❌ WICKET!";


            document.getElementById("commentary")
            .innerHTML=
            "Great delivery by bowler";


        }

        else{


            runs += result;



            if(result===6){


                document.getElementById("ballResult")
                .innerHTML=
                "🚀 SIX!!!";


            }


            else if(result===4){


                document.getElementById("ballResult")
                .innerHTML=
                "🏏 FOUR!!!";


            }


            else{


                document.getElementById("ballResult")
                .innerHTML=
                result+" Runs";


            }



            document.getElementById("commentary")
            .innerHTML=
            "Shot: "+shot;



        }



        balls++;



        updateScore();



        checkInnings();



    },800);



}



// ============================
// SHOT BUTTONS
// ============================


document.querySelectorAll(".shotBtn")
.forEach(btn=>{


    btn.onclick=function(){


        let shot =
        this.dataset.shot;


        playBall(shot);


    };


});



// ============================
// SCORE UPDATE
// ============================


function updateScore(){



    document.getElementById("scoreRuns")
    .innerHTML =
    runs+"/"+wickets;



    let over =
    Math.floor(balls/6);



    let ball =
    balls%6;



    document.getElementById("scoreOvers")
    .innerHTML =
    over+"."+ball;



}/* ==========================================
   INNINGS & RESULT SYSTEM
   script.js Part 4
========================================== */


let team1Score = 0;

let team2Score = 0;

let maxBalls = 0;



// ============================
// CHECK INNINGS
// ============================


function checkInnings(){


    maxBalls = selectedOvers * 6;



    // First innings end

    if(innings===1){


        if(balls>=maxBalls || wickets>=10){


            team1Score = runs;


            target = team1Score + 1;



            startSecondInnings();


        }


    }



    // Second innings

    else{


        if(runs>=target){


            showResult(
            "🎉 Team 2 Won!"
            );


        }


        else if(balls>=maxBalls || wickets>=10){


            team2Score = runs;


            if(team2Score===team1Score){


                showResult(
                "🤝 Match Tie"
                );


            }

            else{


                showResult(
                "🏆 Team 1 Won!"
                );


            }

        }

    }


}




// ============================
// SECOND INNINGS
// ============================


function startSecondInnings(){


    innings=2;


    runs=0;

    wickets=0;

    balls=0;



    document.getElementById("inningsNo")
    .innerHTML="2";



    document.getElementById("targetScore")
    .innerHTML=target;



    document.getElementById("ballResult")
    .innerHTML=
    "Second Innings Started 🏏";



    document.getElementById("commentary")
    .innerHTML=
    "Target: "+target+" Runs";


    updateScore();


}




// ============================
// RESULT SCREEN
// ============================


function showResult(message){



    document.getElementById("winnerTitle")
    .innerHTML=message;



    document.getElementById("team1Score")
    .innerHTML=
    team1Score;



    document.getElementById("team2Score")
    .innerHTML=
    runs;



    showScreen("resultScreen");


}



// ============================
// PLAY AGAIN
// ============================


document.getElementById("playAgainBtn")
.onclick=function(){


    runs=0;

    wickets=0;

    balls=0;

    innings=1;

    target=0;


    showScreen("tossScreen");


};



// HOME FROM RESULT

document.getElementById("homeResultBtn")
.onclick=function(){


    showScreen("homeScreen");


};/* ==========================================
   SCORE DETAILS + SETTINGS
   script.js Part 5
========================================== */


// ============================
// RUN RATE UPDATE
// ============================


function updateMatchInfo(){


    // Current Run Rate

    let crr = 0;


    if(balls>0){

        crr =
        (runs / balls) * 6;

    }



    document.getElementById("crr")
    .innerHTML =
    crr.toFixed(2);



    // Second innings details

    if(innings===2){


        let need =
        target - runs;


        let ballsRemain =
        (selectedOvers*6)-balls;



        document.getElementById("needRuns")
        .innerHTML =
        need;



        document.getElementById("ballsLeft")
        .innerHTML =
        ballsRemain;



        let rrr = 0;


        if(ballsRemain>0){

            rrr =
            (need/ballsRemain)*6;

        }



        document.getElementById("rrr")
        .innerHTML =
        rrr.toFixed(2);


    }


}




// Update old function

let oldUpdateScore = updateScore;



updateScore = function(){


    oldUpdateScore();


    updateMatchInfo();


};





// ============================
// BETTER COMMENTARY
// ============================


function getCommentary(result){


    let text = [

        "Beautiful shot!",
        "Good timing!",
        "Excellent bowling!",
        "What a delivery!",
        "Crowd goes crazy!",
        "Great cricket!"

    ];



    return text[
        Math.floor(Math.random()*text.length)
    ];


}



// ============================
// SETTINGS
// ============================


document.getElementById("settingBackBtn")
.onclick=function(){

    showScreen("homeScreen");

};



document.getElementById("aboutBackBtn")
.onclick=function(){

    showScreen("homeScreen");

};




// ============================
// DARK MODE
// ============================


document.getElementById("darkToggle")
.onclick=function(){


    document.body.classList.toggle("dark");


};/* ==========================================
   SOUND + EFFECTS + AI SYSTEM
   script.js Part 6
========================================== */


// ============================
// SOUND FILES
// ============================


const sounds = {

    bat : new Audio("sounds/bat.mp3"),

    four : new Audio("sounds/four.mp3"),

    six : new Audio("sounds/six.mp3"),

    wicket : new Audio("sounds/wicket.mp3"),

    crowd : new Audio("sounds/crowd.mp3")

};



// ============================
// PLAY SOUND
// ============================


function playSound(name){


    let sound = sounds[name];


    if(sound){


        sound.currentTime=0;


        sound.play()
        .catch(()=>{});


    }

}





// ============================
// SPECIAL EFFECT
// ============================


function showEffect(text){


    let effect =
    document.createElement("div");


    effect.className="gameEffect";


    effect.innerHTML=text;


    document.body.appendChild(effect);



    setTimeout(()=>{


        effect.remove();


    },1200);


}




// ============================
// OVERRIDE PLAY BALL EFFECT
// ============================


let oldPlayBall = playBall;



playBall = function(shot){


    oldPlayBall(shot);



    setTimeout(()=>{


        let resultText =
        document.getElementById("ballResult")
        .innerHTML;



        if(resultText.includes("SIX")){


            playSound("six");

            showEffect("🚀 SIX!!!");

        }


        else if(resultText.includes("FOUR")){


            playSound("four");

            showEffect("🏏 FOUR!!!");

        }


        else if(resultText.includes("WICKET")){


            playSound("wicket");

            showEffect("❌ WICKET");

        }


        else{


            playSound("bat");

        }



        // Vibration

        if(
        document.getElementById("vibrationToggle")
        .checked
        ){

            if(navigator.vibrate){

                navigator.vibrate(100);

            }

        }



    },900);


};





// ============================
// CROWD SOUND
// ============================


document.getElementById("crowdToggle")
.onclick=function(){


    if(this.checked){


        playSound("crowd");


    }


};





// ============================
// SOUND ON/OFF
// ============================


document.getElementById("soundToggle")
.onclick=function(){


    if(!this.checked){


        Object.values(sounds)
        .forEach(sound=>{


            sound.pause();


        });


    }


};/* ==========================================
   AI BOWLER + PLAYER DATA
   script.js Part 7
========================================== */


// ============================
// PLAYER NAME VARIABLES
// ============================


let batsmanName = "";

let bowlerName = "";




// ============================
// SAVE PLAYER DATA
// ============================


function loadPlayers(){


    batsmanName =
    document.getElementById("batsmanSelect")
    .value;



    bowlerName =
    document.getElementById("bowlerSelect")
    .value;



    document.getElementById("batsmanImage")
    .alt = batsmanName;



    document.getElementById("bowlerImage")
    .alt = bowlerName;


}





// Player select ke time

document.getElementById("playerNextBtn")
.addEventListener("click",()=>{


    loadPlayers();


});






// ============================
// AI DIFFICULTY
// ============================


function aiChance(){


    if(difficulty==="Easy"){


        return Math.random();


    }


    else if(difficulty==="Medium"){


        return Math.random()*0.7;


    }


    else{


        return Math.random()*0.5;


    }


}






// ============================
// AI BOWLING MESSAGE
// ============================


function bowlingStyle(){


    let balls=[

        "Fast Yorker 🥎",

        "Bouncer 🔥",

        "Swing Ball 🌪️",

        "Spin Delivery 🌀",

        "Full Toss"

    ];



    return balls[
    Math.floor(Math.random()*balls.length)
    ];

}





// ============================
// COMMENTARY UPDATE
// ============================


function aiCommentary(){


    document.getElementById("commentary")
    .innerHTML =

    bowlerName+
    " bowls "+

    bowlingStyle();


}






// ============================
// BEFORE EVERY BALL
// ============================


let oldBallPlay = playBall;


playBall=function(shot){



    aiCommentary();



    oldBallPlay(shot);



};/* ==========================================
   TOURNAMENT + LOCAL STORAGE
   script.js Part 8
========================================== */


// ============================
// TOURNAMENT DATA
// ============================


let tournamentTeams = [

    "Hatwa Warriors",
    "Prayagraj Kings",
    "UP Strikers",
    "Cricket Challengers"

];


let currentMatch = 1;

let matchHistory = [];




// ============================
// LOAD SAVED DATA
// ============================


function loadGameData(){


    let data =
    localStorage.getItem("hatwaHistory");


    if(data){


        matchHistory =
        JSON.parse(data);


    }


}





// ============================
// SAVE MATCH RESULT
// ============================


function saveMatchResult(){


    let matchData={


        match:
        currentMatch,


        team1:
        "Hatwa Warriors",


        team2:
        "Opponent",


        score1:
        team1Score,


        score2:
        runs,


        date:
        new Date().toLocaleDateString()


    };



    matchHistory.push(matchData);



    localStorage.setItem(

        "hatwaHistory",

        JSON.stringify(matchHistory)

    );


}






// ============================
// UPDATE RESULT FUNCTION
// ============================


let oldShowResult = showResult;



showResult=function(message){



    oldShowResult(message);



    saveMatchResult();



};






// ============================
// SHOW MATCH HISTORY
// ============================


function showHistory(){


    let data =
    document.createElement("div");


    data.className="historyBox";



    if(matchHistory.length===0){


        data.innerHTML=
        "No Match Played";


    }

    else{


        data.innerHTML=
        "<h2>Match History</h2>";



        matchHistory.forEach(match=>{


            data.innerHTML +=

            `

            <p>

            Match ${match.match}

            <br>

            ${match.score1}

            VS

            ${match.score2}

            <br>

            ${match.date}

            </p>

            `;


        });


    }



    document.body.appendChild(data);


}




loadGameData();/* ==========================================
   MOBILE CONTROL + FINAL FIX
   script.js Part 9
========================================== */


// ============================
// MOBILE TOUCH SHOT
// ============================


let touchStart = 0;


document.addEventListener(
"touchstart",
function(e){


    touchStart =
    e.touches[0].clientX;


});



document.addEventListener(
"touchend",
function(e){


    let touchEnd =
    e.changedTouches[0].clientX;



    let diff =
    touchEnd - touchStart;



    if(Math.abs(diff)>50){



        if(diff>0){


            playBall("drive");


        }

        else{


            playBall("pull");


        }


    }


});






// ============================
// RESTART MATCH
// ============================


function resetMatch(){


    runs=0;

    wickets=0;

    balls=0;

    innings=1;

    target=0;


    team1Score=0;

    team2Score=0;



    document.getElementById("scoreRuns")
    .innerHTML="0/0";



    document.getElementById("scoreOvers")
    .innerHTML="0.0";



    document.getElementById("targetScore")
    .innerHTML="--";



    document.getElementById("inningsNo")
    .innerHTML="1";


}





// PLAY AGAIN BUTTON UPDATE


document.getElementById("playAgainBtn")
.onclick=function(){


    resetMatch();


    showScreen("playerScreen");


};






// ============================
// HOME BUTTON
// ============================


document.getElementById("matchBackBtn")
.onclick=function(){


    let confirmExit =
    confirm(
    "Exit current match?"
    );


    if(confirmExit){


        showScreen("homeScreen");


    }


};






// ============================
// PREVENT ZOOM ON DOUBLE TAP
// ============================


let lastTouch = 0;


document.addEventListener(
"touchend",
function(event){


    let now =
    new Date().getTime();



    if(now-lastTouch<=300){


        event.preventDefault();


    }



    lastTouch=now;


},
false);/* ==========================================
   FINAL SETUP
   HATWA CRICKET CLUB
   Made By Ajay Yadav
========================================== */


// ============================
// CHECK IMAGE LOADING
// ============================


document.querySelectorAll("img")
.forEach(img=>{


    img.onerror=function(){


        console.log(
        "Image missing:",
        this.src
        );


    };


});




// ============================
// AUTO START SETTINGS
// ============================


window.onload=function(){


    showScreen("homeScreen");


    console.log(
    "🏏 Hatwa Cricket Club Loaded"
    );


};




// ============================
// PLAY BUTTON EFFECT
// ============================


document.querySelectorAll("button")
.forEach(btn=>{


    btn.addEventListener(
    "click",
    function(){


        this.style.transform="scale(.95)";


        setTimeout(()=>{


            this.style.transform="";


        },100);



    });


});console.log("Script Loaded");

document.getElementById("playerNextBtn").onclick=function(){

    console.log("Next button clicked");

    showScreen("tossScreen");

};