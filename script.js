/* =====================================
   HATWA CRICKET CLUB V2
   Made By Ajay Yadav
===================================== */

// ==========================
// Screens
// ==========================

const screens = document.querySelectorAll(".screen");

function showScreen(id){

    screens.forEach(screen=>{
        screen.classList.remove("active");
    });

    const page = document.getElementById(id);

    if(page){
        page.classList.add("active");
    }else{
        console.error(id + " screen not found");
    }

}

// ==========================
// Buttons
// ==========================

const playBtn = document.getElementById("playBtn");
const tournamentBtn = document.getElementById("tournamentBtn");
const historyBtn = document.getElementById("historyBtn");
const settingBtn = document.getElementById("settingBtn");
const aboutBtn = document.getElementById("aboutBtn");

const playerBackBtn = document.getElementById("playerBackBtn");
const playerNextBtn = document.getElementById("playerNextBtn");

const setupBackBtn = document.getElementById("setupBackBtn");
const tossPageBtn = document.getElementById("tossPageBtn");

const tossBackBtn = document.getElementById("tossBackBtn");

const historyBackBtn = document.getElementById("historyBackBtn");
const aboutBackBtn = document.getElementById("aboutBackBtn");
const settingBackBtn = document.getElementById("settingBackBtn");

// ==========================
// Home
// ==========================

playBtn.onclick = ()=>{

    showScreen("playerScreen");

};

tournamentBtn.onclick = ()=>{

    alert("Tournament Coming Soon");

};

historyBtn.onclick = ()=>{

    showScreen("historyScreen");

};

settingBtn.onclick = ()=>{

    showScreen("settingsScreen");

};

aboutBtn.onclick = ()=>{

    showScreen("aboutScreen");

};

// ==========================
// Back Buttons
// ==========================

playerBackBtn.onclick = ()=>{

    showScreen("homeScreen");

};

setupBackBtn.onclick = ()=>{

    showScreen("playerScreen");

};

tossBackBtn.onclick = ()=>{

    showScreen("setupScreen");

};

historyBackBtn.onclick = ()=>{

    showScreen("homeScreen");

};

aboutBackBtn.onclick = ()=>{

    showScreen("homeScreen");

};

settingBackBtn.onclick = ()=>{

    showScreen("homeScreen");

};

// ==========================
// Player Next
// ==========================

playerNextBtn.onclick = ()=>{

    const batsman =
    document.getElementById("batsmanSelect").value;

    const bowler =
    document.getElementById("bowlerSelect").value;

    if(batsman===""){

        alert("Select Batsman");

        return;

    }

    if(bowler===""){

        alert("Select Bowler");

        return;

    }

    localStorage.setItem("batsman",batsman);
    localStorage.setItem("bowler",bowler);

    document.getElementById("batsmanName").innerText=batsman;

    document.getElementById("bowlerName").innerText=bowler;

    showScreen("setupScreen");

};

// ==========================
// Setup
// ==========================

tossPageBtn.onclick=()=>{

    showScreen("tossScreen");

};// ==========================
// Match Setup
// ==========================

let totalOvers=2;

let difficulty="Easy";

const overBtns=document.querySelectorAll(".overBtn");

overBtns.forEach(btn=>{

btn.onclick=function(){

overBtns.forEach(x=>x.classList.remove("active"));

this.classList.add("active");

totalOvers=parseInt(this.dataset.over);

};

});

const difficultyBtns=document.querySelectorAll(".difficultyBtn");

difficultyBtns.forEach(btn=>{

btn.onclick=function(){

difficultyBtns.forEach(x=>x.classList.remove("active"));

this.classList.add("active");

difficulty=this.dataset.level;

};

});

console.log("Overs :",totalOvers);

console.log("Difficulty :",difficulty);// =====================================
// TOSS SYSTEM
// =====================================

const coin = document.getElementById("coin");

const headBtn = document.getElementById("headBtn");
const tailBtn = document.getElementById("tailBtn");

const tossResult = document.getElementById("tossResult");

const batBowlChoice = document.getElementById("batBowlChoice");

const batFirstBtn = document.getElementById("batFirstBtn");
const bowlFirstBtn = document.getElementById("bowlFirstBtn");

const startMatchBtn = document.getElementById("startMatchBtn");

let playerBatting = true;

let tossDone = false;

function playToss(choice){

if(tossDone) return;

tossDone = true;

coin.classList.add("spin");

headBtn.disabled = true;
tailBtn.disabled = true;

setTimeout(()=>{

coin.classList.remove("spin");

const result = Math.random()<0.5 ? "HEAD":"TAIL";

if(choice===result){

tossResult.innerHTML="🎉 You Won The Toss";

batBowlChoice.style.display="block";

}else{

tossResult.innerHTML="😔 Computer Won The Toss";

playerBatting=Math.random()<0.5;

startMatchBtn.style.display="block";

}

},2000);

}

headBtn.onclick=()=>{

playToss("HEAD");

};

tailBtn.onclick=()=>{

playToss("TAIL");

};

batFirstBtn.onclick=()=>{

playerBatting=true;

batBowlChoice.style.display="none";

startMatchBtn.style.display="block";

};

bowlFirstBtn.onclick=()=>{

playerBatting=false;

batBowlChoice.style.display="none";

startMatchBtn.style.display="block";

};

startMatchBtn.onclick=()=>{

showScreen("matchScreen");

startMatch();

};// =====================================
// MATCH VARIABLES
// =====================================

let runs = 0;

let wickets = 0;

let balls = 0;

let target = 0;

let innings = 1;

let maxBalls = totalOvers * 6;

const runText = document.getElementById("scoreRuns");

const overText = document.getElementById("scoreOvers");

const targetText = document.getElementById("targetScore");

const inningsText = document.getElementById("inningsNo");

const resultText = document.getElementById("ballResult");

const commentary = document.getElementById("commentary");

const crr = document.getElementById("crr");

const needRuns = document.getElementById("needRuns");

const ballsLeft = document.getElementById("ballsLeft");

const rrr = document.getElementById("rrr");

const ball = document.getElementById("ball");

const shotBtns = document.querySelectorAll(".shotBtn");

function startMatch(){

runs = 0;

wickets = 0;

balls = 0;

target = 0;

innings = 1;

maxBalls = totalOvers * 6;

updateScore();

commentary.innerHTML="🏏 Match Started";

}// =====================================
// SCORE UPDATE
// =====================================

function updateScore(){

runText.innerHTML = runs + "/" + wickets;

overText.innerHTML =
Math.floor(balls/6) + "." + (balls%6);

inningsText.innerHTML = innings;

if(target>0){

targetText.innerHTML = target;

needRuns.innerHTML =
Math.max(target-runs,0);

ballsLeft.innerHTML =
maxBalls-balls;

let left=maxBalls-balls;

if(left>0){

rrr.innerHTML=
((target-runs)/left*6).toFixed(2);

}

}else{

targetText.innerHTML="--";

needRuns.innerHTML="--";

ballsLeft.innerHTML=maxBalls-balls;

rrr.innerHTML="0.00";

}

crr.innerHTML=
balls===0 ? "0.00" :
(runs/balls*6).toFixed(2);

}// =====================================
// BALL ANIMATION + SHOT LOGIC
// =====================================

const outcomes = [0,1,2,3,4,6,"W"];

const comments = {

0:"Dot Ball!",
1:"Quick Single!",
2:"Excellent Running!",
3:"Great Running Between Wickets!",
4:"FOUR!! Beautiful Shot!",
6:"SIX!! What A Hit!",
W:"OUT!!"

};

function bowlBall(shot){

ball.style.display="block";

ball.style.top="90px";

ball.style.left="50%";

let pos=90;

const timer=setInterval(()=>{

pos+=8;

ball.style.top=pos+"px";

if(pos>=250){

clearInterval(timer);

ball.style.display="none";

finishBall(shot);

}

},20);

}

function finishBall(shot){

let chance=Math.random();

let result;

if(difficulty==="Easy"){

if(chance<0.10){

result="W";

}else{

result=outcomes[Math.floor(Math.random()*6)];

}

}

else if(difficulty==="Medium"){

if(chance<0.18){

result="W";

}else{

result=outcomes[Math.floor(Math.random()*6)];

}

}

else{

if(chance<0.28){

result="W";

}else{

result=outcomes[Math.floor(Math.random()*6)];

}

}

balls++;

if(result==="W"){

wickets++;

resultText.innerHTML="❌ WICKET";

commentary.innerHTML=comments.W;

}

else{

runs+=result;

resultText.innerHTML=result;

commentary.innerHTML=comments[result];

}

updateScore();

checkMatch();

}// =====================================
// SHOT BUTTONS
// =====================================

shotBtns.forEach(btn=>{

btn.onclick=function(){

if(ball.style.display==="block") return;

const shot=this.dataset.shot;

commentary.innerHTML=

"Batsman Played "+shot+" Shot";

bowlBall(shot);

};

});// =====================================
// MATCH END
// =====================================

function checkMatch(){

// First Innings Finish

if(innings===1){

if(wickets>=10 || balls>=maxBalls){

target=runs+1;

innings=2;

runs=0;

wickets=0;

balls=0;

playerBatting=!playerBatting;

commentary.innerHTML=

"🏏 Second Innings Started";

updateScore();

return;

}

}

// Second Innings

if(innings===2){

if(runs>=target){

matchFinish("🎉 YOU WIN");

return;

}

if(wickets>=10 || balls>=maxBalls){

if(runs>=target){

matchFinish("🎉 YOU WIN");

}else{

matchFinish("😔 COMPUTER WINS");

}

}

}

}// =====================================
// RESULT
// =====================================

function matchFinish(title){

document.getElementById("winnerTitle").innerHTML=title;

document.getElementById("team1Score").innerHTML=

target>0 ?

(target-1)+" Runs"

:

runs+" Runs";

document.getElementById("team2Score").innerHTML=

runs+" Runs";

saveHistory(title);

showScreen("resultScreen");

}

document.getElementById("playAgainBtn").onclick=function(){

location.reload();

};

document.getElementById("homeResultBtn").onclick=function(){

showScreen("homeScreen");

};// =====================================
// HISTORY
// =====================================

function saveHistory(result){

let history=

JSON.parse(localStorage.getItem("history")) || [];

history.unshift({

date:new Date().toLocaleString(),

result:result

});

localStorage.setItem(

"history",

JSON.stringify(history)

);

loadHistory();

}

function loadHistory(){

const box=document.getElementById("historyList");

let history=

JSON.parse(localStorage.getItem("history")) || [];

if(history.length===0){

box.innerHTML="<p>No Match Played Yet</p>";

return;

}

box.innerHTML="";

history.forEach(match=>{

box.innerHTML+=`

<div class="historyItem">

<h3>${match.result}</h3>

<p>${match.date}</p>

</div>

`;

});

}

loadHistory();

// =====================================
// DARK MODE
// =====================================

document.getElementById("darkToggle").onchange=function(){

document.body.classList.toggle("dark");

};// =====================================
// REAL BOWLING ENGINE
// =====================================

const runOptions = [0,1,2,3,4,6];

function aiBall(){

    let wicketChance = 10;

    if(difficulty==="Medium") wicketChance = 18;

    if(difficulty==="Hard") wicketChance = 28;

    let random = Math.floor(Math.random()*100);

    if(random < wicketChance){

        return "W";

    }

    return runOptions[Math.floor(Math.random()*runOptions.length)];

}

function playDelivery(){

    ball.style.display="block";

    ball.style.transition="none";

    ball.style.top="90px";

    ball.style.left="50%";

    ball.offsetHeight;

    ball.style.transition="all .6s linear";

    ball.style.top="260px";

    setTimeout(()=>{

        ball.style.display="none";

        let result = aiBall();

        applyResult(result);

    },650);

}// =====================================
// APPLY RESULT
// =====================================
function applyResult(result){

    // Sound Play
    playSound(result);

    balls++;

    if(result==="W"){

        wickets++;

        resultText.innerHTML="❌ WICKET";
        commentary.innerHTML="Outstanding bowling!";

    }else{

        runs += result;
        resultText.innerHTML=result;

        switch(result){

            case 0:
                commentary.innerHTML="Dot Ball";
                break;

            case 1:
                commentary.innerHTML="Single";
                break;

            case 2:
                commentary.innerHTML="Two Runs";
                break;

            case 3:
                commentary.innerHTML="Three Runs";
                break;

            case 4:
                commentary.innerHTML="FOUR!!";
                break;

            case 6:
                commentary.innerHTML="SIX!!";
                break;
        }
    }

    updateScore();
    checkMatch();
}

}// =====================================
// SHOTS
// =====================================

shotBtns.forEach(btn=>{

    btn.onclick=function(){

        if(ball.style.display==="block") return;

        const shot=this.dataset.shot;

        commentary.innerHTML="Playing "+shot+"...";

        playDelivery();

    };

});// =====================================
// SOUND
// =====================================

const batSound=new Audio("bat.mp3");

const fourSound=new Audio("four.mp3");

const sixSound=new Audio("six.mp3");

const wicketSound=new Audio("wicket.mp3");
const crowdSound=new Audio("crowd.mp3");

function playSound(result){

    if(result==="W"){

        wicketSound.play();

        return;

    }

    batSound.play();

    if(result===4){

        fourSound.play();

    }

    if(result===6){

        sixSound.play();

    }

}// =====================================
// STARTUP
// =====================================

window.onload=function(){

    loadHistory();

    showScreen("homeScreen");

    console.log("Hatwa Cricket Club V2 Loaded");

};

// =====================================
// SAVE SETTINGS
// =====================================

const darkToggle=document.getElementById("darkToggle");

darkToggle.checked=

localStorage.getItem("dark")=="true";

if(darkToggle.checked){

    document.body.classList.add("dark");

}

darkToggle.onchange=function(){

    document.body.classList.toggle("dark");

    localStorage.setItem("dark",this.checked);

};
