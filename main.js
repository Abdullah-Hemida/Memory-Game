// global variables.
let wrongTries = document.querySelector(".wrong-tries span");
let totalTries = document.querySelector(".total-tries span");
let gameTime = document.querySelector(".game-time span");
let allBoxes = document.querySelectorAll(".box-container .box");
let selectedOption = document.querySelector(".level select");
let allOptions = document.querySelectorAll(".level select option");


// the defualt time for game
let timeOfGame = 200 ;
gameTime.innerHTML = timeOfGame;
// the defualt number of tries
let SelectedTries = 25;
totalTries.innerHTML = SelectedTries;
// the wrong Tries Count
let wrongTriescount = 0;
wrongTries.innerHTML = wrongTriescount;

// start game and write the name 
document.querySelector(".control-button span").onclick = function () {
    document.querySelector(".control-button").remove();
    let theName = prompt("what is your name :");
    StartTime();
    if (theName === null || theName === "") {
        document.querySelector(".person-name span").textContent = "Unknown";
    } else {
        document.querySelector(".person-name span").innerHTML = theName;
    }
}

function selectLevel() {
    //change color of selected level
    selectedOption.addEventListener("change", () => {
        allOptions.forEach((option) => {
            if (option.value === selectedOption.value) {
                // The color for every options
                selectedOption.style.color = option.dataset.color;
                gameTime.style.color = option.dataset.color;
                totalTries.style.color = option.dataset.color;
                // select the time for game
                timeOfGame = `${option.dataset.time}`;
                gameTime.innerHTML = timeOfGame ;
                // implement the number of tries
                SelectedTries = option.dataset.tries;
                totalTries.innerHTML = SelectedTries;
            }
        })
    })
}
selectLevel();

// boxes shuffling
function shuffling() {
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.order = Math.floor(Math.random() * allBoxes.length)
    }
}
shuffling();

// Click on box
let arrayOfBoxes = Array.from(allBoxes);
allBoxes.forEach((box) => {
    box.addEventListener("click", () => {       
        box.classList.add("is-fliped");
        let clickedboxes = arrayOfBoxes.filter(boxes => boxes.classList.contains("is-fliped"));
        // whene number of tries = 2
        if (clickedboxes.length === 2) {
            checkMatching(clickedboxes[0], clickedboxes[1])
            allBoxes.forEach((el) => {
                el.classList.add("stop-clicking");
                setTimeout(() => {
                    el.classList.remove("stop-clicking");
                    clickedboxes[0].classList.remove("is-fliped");
                    clickedboxes[1].classList.remove("is-fliped");
                }, 1000)
            })
        }

    })
})

// check match of selecting
let machedCount = 0;
function checkMatching(clicked1, clicked2) {
    if (clicked1.dataset.picture === clicked2.dataset.picture) {
        clicked1.classList.remove("is-fliped");
        clicked2.classList.remove("is-fliped");
        clicked1.classList.add("is-matched");
        clicked2.classList.add("is-matched");
        machedCount = machedCount + 2;
     if (machedCount === allBoxes.length) {
        GameSuccess();
        clearInterval(theGameTime);
     }
    } else {
        wrongTriescount++;
        wrongTries.innerHTML = wrongTriescount;
        if (wrongTriescount === +SelectedTries) {
            GameOver();
            clearInterval(theGameTime); 
        } 
    }
}

// set the time dowin count of game
function StartTime() {
    let theGameTime = setInterval(() => {
        timeOfGame--;
        gameTime.innerHTML = timeOfGame < 100 ? `0${timeOfGame}` : timeOfGame;
        if(timeOfGame <= 0) {
         clearInterval(theGameTime);
         GameOver();
        }
        },1000)
}
       
function GameSuccess() {
    let mySuccessPopup = `<div class="my-popup">
                         <button class="close-button onclick="closeThePupup()">X</button>
                         <span class="the-message">Game Sucsess</span>
                         <span class="the-level"> your level is: <span>${Math.round((machedCount/allBoxes.length) * 100)}%</span></span>
                         </div>`;
                  
    document.body.insertAdjacentHTML("afterbegin",mySuccessPopup);
    closePuppup();
    }

    function GameOver() {
        let myfailedPopup = `<div class="my-popup">
                             <button class="close-button onclick="closeThePupup()">X</button>
                             <span class="the-message">Game Over</span>
                             <span class="the-level"> your level is: <span>${Math.round((machedCount/allBoxes.length) * 100)}%</span></span>
                             </div>`;
                      
        document.body.insertAdjacentHTML("afterbegin",myfailedPopup);
        closePuppup();
        }

    //whene close popup
     function closePuppup() {
        let myClosButton = document.querySelector('.close-button');
        myClosButton.addEventListener("click", () => {
        let mySuccessPopup = document.querySelector(".my-popup");
        mySuccessPopup.style.display = "none";
        });
        }



