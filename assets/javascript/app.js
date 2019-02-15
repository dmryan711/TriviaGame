function TriviaQuestion(cQuestion,cAnswer,cAnswersArray ,cIsanswered){
    this.question = cQuestion;
    this.answer = cAnswer;
    this.answerArray = cAnswersArray;
    this.isAnswered = cIsanswered;
  }

  var questionBank = [];
  var currentQuestionIndex = 0;
  var totalQuestions = 5;
  var totalCorrectQuestions = 0;
  var totalIncorrectQuestions = 0;
  const winState = "win";
  const loseState = "lose";
  const timesUpState = "timesup";
  const fixedCountDownAmount = 1; //10
  const timeOut = 1000; //3000
  var countDownAmount = 1; //10
  var countDownClock;
  var clockRunning = false;

  function gameStart(){
    var testOne = new TriviaQuestion("Question 1","correct",["incorrect 1","incorrect 2","correct", "incorrect 3"],false);
    questionBank.push(testOne);

    var testTwo = new TriviaQuestion("Question 2","correct",["incorrect 1","incorrect 2","correct", "incorrect 3"],false);
    questionBank.push(testTwo);

    var testThree = new TriviaQuestion("Question 3","correct",["incorrect 1","incorrect 2","correct", "incorrect 3"],false);
    questionBank.push(testThree);

    var testFour = new TriviaQuestion("Question 4","correct",["incorrect 1","incorrect 2","correct", "incorrect 3"],false);
    questionBank.push(testFour);
    

    //Log the question bank
    for(var i = 0;i<questionBank.length;i++){
        console.log(questionBank[i]);
    }

    //Populate question to the ui
    populateQuestion();
  }
  

  $(document).ready(function(){
    gameStart();
});


$(document).on('click', '.answer-button', function(){
     console.log("Clicked");
     stopClock();
     questionBank[currentQuestionIndex].isAnswered = true;
     
            if($(this).text() === questionBank[currentQuestionIndex].answer){
                //Got Answer Correct
                console.log("Correct");
               
                
                //resetClock();
                displayModalWithState(winState);

               
            
            //TO DO: Delete this for loop when done
                for(var i = 0;i<questionBank.length;i++){
                    console.log(questionBank[i]);
                }
        
        
            }else{
                displayModalWithState(loseState);


                //Got Answer Incorrect
                console.log("Incorrect");
            }
       
});



$("#user-action").click(function(){
    console.log("Hit");
    populateQuestion();
    $("#answer-modal").modal('toggle');

});

function populateQuestion(){
    
    removeAnswerChoices();
    if(currentQuestionIndex <= questionBank.length - 1){
        resetClock();
        startClock();
        console.log("Loading Next Question");
        //Load Question
        loadQuestion(questionBank[currentQuestionIndex]);

    }else{
        //TO DO: Game Over
        togglePlayAndSummaryScreen();
        console.log("Thats all the questions");
    }
}

function loadQuestion(questionObject){
    //Question
    $("#question-text").text(questionObject.question);
    questionObject = randomizeAnswerArray(questionObject);
    for(var i = 0; i < questionObject.answerArray.length;i++){
        $("#answers").append('<button class="btn btn-success mx-auto answer-button" id = '+ i + '>'+questionObject.answerArray[i]+'</button>');
        $("#"+i.toString()).attr('data-toggle','modal');
        $("#"+i.toString()).attr('data-target','#answer-modal');
    }
}


function randomizeAnswerArray(questionObject){
    var orginalIndex = 0;
    var newIndex = 0;
    var holderIndex = null;

  for (orginalIndex = questionObject.answerArray.length - 1; orginalIndex > 0; orginalIndex -= 1) {
    newIndex = Math.floor(Math.random() * (orginalIndex + 1));
    holderIndex = questionObject.answerArray[orginalIndex];
    questionObject.answerArray[orginalIndex] = questionObject.answerArray[newIndex];
    questionObject.answerArray[newIndex] = holderIndex;
  }
  return questionObject;
}

function removeAnswerChoices(){
    if( $("#answers").children().length > 0){
        //remove children
        $("#answers").empty();
    }else{
        console.log("Parent has children");
    }
}

function displayModalWithState(stateString){

    if(stateString === winState){
        //TO DO: Display Win modal
        console.log("Win");
        totalCorrectQuestions++;
        $("#user-message-title").text("Correct")
        $("#user-message").text("You got the answer!");

    }else if(stateString === loseState){
        //TO DO: Display Lose modal
        $("#user-message-title").text("Incorrect")
        $("#user-message").text("The correct answer was "+questionBank[currentQuestionIndex].answer);
        totalIncorrectQuestions--;


    }else if(stateString === timesUpState){
        $("#user-message-title").text("Time's Up")
        $("#user-message").text("The correct answer was "+questionBank[currentQuestionIndex].answer);
        stopClock();
        totalIncorrectQuestions--;

    }else{
        console.log("Error with stateString, no matches found");
    }


    setTimeout(function(){
        currentQuestionIndex++;
        populateQuestion();
        $("#answer-modal").modal('toggle');
    },timeOut);
}

function startClock(){

    if(!clockRunning){
        countDownClock = setInterval(countDown,1000);
        clockRunning = true;
    }
   
}


function countDown(){
    if(countDownAmount >0){
        //console.log(countDownAmount--);
        countDownAmount --;
        $("#count-down").text(countDownAmount.toString());
    }else{
        console.log("Over");
        displayModalWithState(timesUpState);
        $("#answer-modal").modal('toggle');
        //clearInterval(countDownClock);
    }       
    
}

function stopClock(){
    clearInterval(countDownClock);
    clockRunning = false;
}

function resetClock(){
    countDownAmount = fixedCountDownAmount;
    $("#count-down").text(countDownAmount.toString());
}

function togglePlayAndSummaryScreen(){
    var triviaContainer =$("#trivia-container");
    var summaryContainer =$("#summary-container");

    if(triviaContainer.hasClass("hidden")){ 
        triviaContainer.removeClass('hidden');
        summaryContainer.addClass('hidden');
    }else if(summaryContainer.hasClass("hidden")){
        resetClock();
        stopClock();
        populateResults();
        triviaContainer.addClass('hidden');
        summaryContainer.removeClass('hidden');
    }
}
function populateResults(){
    $("#results").text("You got "+ totalCorrectQuestions +" correct. " +"You got " +totalIncorrectQuestions+" incorrect");
}

function resetGame(){
    questionBank = [];
    currentQuestionIndex = 0;
    totalQuestions = 5;
    totalCorrectQuestions = 0;
    totalIncorrectQuestions = 0;
    countDownAmount = 1;
    clockRunning = false;
    gameStart();
}




   

    
    






