$(document).ready(function() {

function initialScreen() {
    startTrivia = "<p class='text-center main-button-container'><a class='btn btn-danger btn-sm start-button' href='#' role='button'>Start Trivia</a></p>";
    $(".triviaArea").html(startTrivia);

    
 }


initialScreen();


})

//Variables//

var startTrivia;

var gameHtml; 

var counter = 20;

//Array of questions//
var questionArray = [
"1. What night did Will Byers go missing?",
"2. The mysterious research facility in Hawkins poses as The Department of _______?",
"3. Who is the actress who plays Joyce Byers?",
"4. How did Barb cut her hand shortly before she was taken by the monster?",
"5. What year do the events of the first season take place in?",
"6. Who opened the gate to the Upside Down?",
"7. Which is Eleven's favorite food?",
"8. Of these choices, who was the first to enter the Upside Down?",
"9. Joyce was able to communicate with her son Will through the use of which of these?",
"10.What does Steve Harrington use to style his hair?",];

//Array of Answers//
var answerArray = [
//1//
["October 20th", "October 31st", "November 6th", "November 15th",],
//2//
["Homeland Security", "Energy", "Public Health Services", "Education",],
//3//
["Jennifer Grey", "Elisabeth Shue", "Ally Sheedy", "Winona Ryder",],
//4//
["Broken wine glass", "Opening a beer can", "Tripping near the pool", "Steve Harringtons knife",],
//5//
["1982", "1983", "1984", "1989",],
//6//
["Dr. Brenner", "The Demogorgon", "Eleven", "Chief Hopper",],
//7//
["Hot Pockets", "Pop Tarts", "Eggo Waffles", "Pancakes",],
//8//
["Nancy Wheeler", "Jim Hopper", "Joyce Byers", "Mike Wheeler",],
//9//
["Ouija board", "Walkie Talkie", "Bonfire", "Electricity",],
//10//
["Leave-In Conditioner", "Farrah Fawcett Spray", "Revlon Flex Shampoo", "Stiff Stuff Gel",],
];

//Array of Images//
var imageArray = ["<img class='center-block img-right' src='assets/images/question1.gif'>",
  "<img class='center-block img-right' src='assets/images/question2.gif'>",
  "<img class='center-block img-right' src='assets/images/question3.gif'>",
  "<img class='center-block img-right' src='assets/images/question4.gif'>",
  "<img class='center-block img-right' src='assets/images/question5.gif'>",
  "<img class='center-block img-right' src='assets/images/question6.gif'>",
  "<img class='center-block img-right' src='assets/images/question7.gif'>",
  "<img class='center-block img-right' src='assets/images/question8.gif'>",
  "<img class='center-block img-right' src='assets/images/question9.gif'>",
  "<img class='center-block img-right' src='assets/images/question10.gif'>",
  ];

//Array of correct Answers//
var correctAnswers = [
"C. November 6th",
"B. Energy",
"D. Winona Ryder",
"B. Opening a beer can",
"B. 1983",
"C. Eleven",
"C. Eggo Waffles",
"A. Nancy Wheeler",
"D. Electricity",
"B. Farrah Fawcett Spray",
];

var questionCounter = 0;

var selectedAnswer;

var theTimer;

var correctTally = 0;

var incorrectTally = 0;

var unansweredTally = 0;

//Start button that starts timer, shows question, answers and hides elements//
$("body").on("click", ".start-button", function(event){
    event.preventDefault();  
    generateHTML();

    timerWrapper();
    hideElement();


}); 

//function for clicking the answers//
$("body").on("click", ".answer", function(event){
    //answeredQuestion = true;
    selectedAnswer = $(this).text();
    if(selectedAnswer === correctAnswers[questionCounter]) {
        

        clearInterval(theTimer);
        generateWin();
    }
    else {
        
        clearInterval(theTimer);
        generateLoss();
    }
}); 

//reset button on click function//
$("body").on("click", ".reset-button", function(event){
    resetGame();
}); 


//Function to hide badge image//
function hideElement(){
    $("#badge").hide();
}

//function to generate HTML for running out of time//
function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".triviaArea").html(gameHTML);
    setTimeout(wait, 4000);  
}

//function to generate HTML for answering correctly//
function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".triviaArea").html(gameHTML);
    setTimeout(wait, 4000);  
}

//function to generate HTML for answering wrong//
function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".triviaArea").html(gameHTML);
    setTimeout(wait, 4000); 
}

//function to generate HTML for the questions//
function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
    $(".triviaArea").html(gameHTML);
}

//function to wait before cycle through question array//
function wait() {
    if (questionCounter < 9) {
    questionCounter++;
    generateHTML();
    counter = 20;
    timerWrapper();
    }
    else {
        finalScreen();
    }
}

//function for 20 second timer//
function timerWrapper() {
    theTimer = setInterval(twentySeconds, 1000);
    function twentySeconds() {
        if (counter === 0) {
            clearInterval(theTimer);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

//function to display the final screen with the tally of correct answers//
function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-danger btn-sm  reset-button' href='button' role='button'>Reset The Quiz!</a></p>";
    $(".triviaArea").html(gameHTML);
}

//function to reset game//
function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 20;
    generateHTML();
    timerWrapper();
}



