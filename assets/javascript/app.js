$(document).ready(function() {

$("#start_button").click(function(){
  $(this).hide();
  //triviaGame.nextQuestion()//
  triviaGame.timerTrivia()
  //this.randomQuestions = this.randomQuestionList();
});
// Clicking a wrong answer
    $("#answers").on("click", "#incorrect", function() {trivia.clickedAnswer("wrong")});

    // Clicking the correct answer
    $("#answers").on("click", "#correct", function() {trivia.clickedAnswer("correct")});

    // Resets the game (this button appears when the game is over.)
    $("#question").on("click", "#playagain", function() {trivia.resetGame()});

//Variables//
var triviaGame = {

triviaQuestions: 0,

counter: 11,

randomQuestons: [],

currentQuestion: 0,

wins: 0,

losses: 0,


//array of trivia questions//
strangerQuestions: [{
question: "What night did Will Byers go missing?",
answers: ["October 20th", "October 31st", "November 6th", "November 15th" ],
image:  "assets/images/question1.gif",
validAnswer: 2
}, {
question:"The mysterious research facility in Hawkins poses as The Department of _______?",
answers: ["Homeland Security", "Energy", "Public Health Services", "Education"],
validAnswer: 1

}, {
question:"Who is the actress who plays Joyce Byers?",
answers: ["Jennifer Grey", "Elisabeth Shue", "Ally Sheedy", "Winona Ryder"],
validAnswer: 3

}, {
question:"How did Barb cut her hand shortly before she was taken by the monster?",
answers: ["Broken wine glass", "Opening a beer can", "Tripping near the pool", "Steve Harringtons knife"],
validAnswer: 1

}, {
question:"What year do the events of the first season take place in?",
answers: ["1982", "1983", "1984", "1989"],
validAnswer: 1

 }, {
question:"Who opened the gate to the Upside Down?",
answers: ["Dr. Brenner", "The Demogorgon", "Eleven", "Chief Hopper"],
validAnswer: 2

}, {
question:"Which is Eleven's favorite food?",
answers: ["Hot Pockets", "Pop Tarts", "Eggo Waffles", "Pancakes"],
validAnswer: 2

}, {
question:"Of these choices, who was the first to enter the Upside Down?",
answers: ["Nancy Wheeler", "Jim Hopper", "Joyce Byers", "Mike Wheeler"],
validAnswer: 0

}, {
question:"Joyce was able to communicate with her son Will through the use of which of these?",
answers: ["Ouija board", "Walkie Talkie", "Bonfire", "Electricity"],
validAnswer: 3

}, {
question:"What does Steve Harrington use to style his hair?",
answers: ["Leave-In Conditioner", "Farrah Fawcett Spray", "Revlon Flex Shampoo", "Stiff Stuff Gel"],
validAnswer: 1
 
},],



//Timer Countdown function//
timerTrivia: function() {
  let count = 11;            
  this.counter = setInterval(function() {
    if (count > -1) {
      $("#timer").html("Time remaining: " + count + " seconds");
      count--;
      }
    else {
      clearInterval(triviaGame.counter);
      triviaGame.clickedAnswer("noAnswer");
      }
    }, 1000);
},

//Function to hide number of right and wrong answers until the end//
startGame: function() {
    
},

//Function to pick a question from the array//
loadQuestion: function () {
    this.currentQuestion = this.randomQuestions[this.triviaQuestions];
    $("#timer").html("Time remaining: " + count + " seconds");
    //add new question if use hasn't answered all 10//
    if(this.triviaQuestions < this.randomQuestions.length) {
      this.timer();
      $("#question").text(this.triviaQuestions[this.currentQuestion].question);
      this.randomizeAnswers(this.currentQuestion);
      } 
      else{
        this.finishGame();
      }
},

finishGame: function() {
  $("#question").html("<button id='playagain' class='btn btn-primary'>Play Again</button>");            
    },

clickedAnswer: function (userAnswer) {
    $("#question").empty ();
    $("#answers").empty();
    $("#imageGif").html(this.strangerQuestions[this.currentQuestion].image)
    clearInterval(this.counter);
    this.completedQuestions++;

    $('#question').on('click', 'button', function(e){
    userAnswer = $(this).data("id");
    strangerQuestion[0].validAnswer;

    if(userAnswer != strangerQuestions[0].validAnswer) {
      $('#incorrect').text("Wrong Answer! The correct answer is" + this.triviaQuestions[this.currentQuestion].validAnswer);
    } 
      else if (userAnswer === strangerQuestions[0].validAnswer) {
        $('#correct').text("Correct!!!");
    }
      else{
        $("incorrect").html("You ran out of time!")
      }

  });

    setTimeout(function(){
        $("#imageGif").empty();
        $("incorrect").empty();
        $("correct").empty();
        triviaGame.addQuestion()

    }, 5000);

},

//Function to get answers//
randomizeAnswers: function(questionNumber) {
            let array = this.randomFour();
            $("#answers").html("<ol><li></li><li></li><li></li><li></li></ol>");
            for (var i = 0; i<3; i++) {
                $("ol").children().eq(array[i]).text(trivia.gameQuestions[questionNumber].incorrectAnswers[i]);
                $("ol").children().eq(array[i]).attr("id", "wrong");
            }
            $("ol").children().eq(array[3]).text(trivia.gameQuestions[questionNumber].correctAnswer);
            $("ol").children().eq(array[3]).attr("id", "correct");
        },
randomQuestionList: function() {
            var randomSeven = [];
            while (randomSeven.length < 7) {
                let number = Math.floor(Math.random()*this.gameQuestions.length);
                if (randomSeven.indexOf(number) === -1) {
                    randomSeven.push(number);
                }
            }
            return randomSeven;
        },
        // This function resets the game
        resetGame: function() {
            this.wins = 0;
            this.losses = 0;
            this.completedQuestions = 0;
            this.currentQuestion = 0;
            this.randomQuestions = this.randomQuestionList();            
            this.addQuestion();

        },
        // Calls Giphy API and posts gif after a question has been answered, or timer runs out
        giphyAPI: function(searchTerm) {
            var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=zJ4WnHswLS4shydUPsDoUOqYFXlN1IaB&limit=1&q=" + searchTerm;      
            $.ajax({
                url: giphyURL,
                method: "GET",
                }).done(function(response) {
                    $("#gif").html("<img id='gifinsert' class='img-responsive' src='" + response.data[0].images.downsized_large.url + "'/>");
                }
            );
        }
    };

    // ---------------FUNCTION TO RUN ON PAGELOAD--------------
    triviaGame.startGame();

      
    
});




