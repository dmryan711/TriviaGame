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
  const fixedCountDownAmount = 10;
  const timeOut = 3000;
  var countDownAmount = 10;
  var countDownClock;
  var clockRunning = false;

  
  

  $(document).ready(function(){
    var testOne = new TriviaQuestion("Question 1","correct",["incorrect 1","incorrect 2","correct", "incorrect 3"],false);
    questionBank.push(testOne);

    var testTwo = new TriviaQuestion("Question 2","correct",["incorrect 1","incorrect 2","correct", "incorrect 3"],false);
    questionBank.push(testTwo);

    var testThree = new TriviaQuestion("Question 3","correct",["incorrect 1","incorrect 2","correct", "incorrect 3"],false);
    questionBank.push(testThree);

    var testFour = new TriviaQuestion("Question 4","correct",["incorrect 1","incorrect 2","correct", "incorrect 3"],false);
    questionBank.push(testFour);
    // var testTwo = new TriviaQuestion("When do we want it","now","bullshit 1","bullshit 2","bullshit 3",false);
    // questionBank.push(testTwo);

    //Log the question bank
    for(var i = 0;i<questionBank.length;i++){
        console.log(questionBank[i]);
    }

    //Populate question to the ui
    populateQuestion();
});


$(document).on('click', '.answer-button', function(){
     console.log("Clicked");
        
            if($(this).text() === questionBank[currentQuestionIndex].answer){
                //Got Answer Correct
                console.log("Correct");
                questionBank[currentQuestionIndex].isAnswered = true;
                currentQuestionIndex++;
                totalCorrectQuestions++;
                //resetClock();
                stopClock();
                displayModalWithState(winState);

               
            
            //TO DO: Delete this for loop when done
                for(var i = 0;i<questionBank.length;i++){
                    console.log(questionBank[i]);
                }
        
        
            }else{
                totalIncorrectQuestions--;
                displayModalWithState(loseState);


            //TO DO: Alert you got it wrong.
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
    
    if(currentQuestionIndex <= questionBank.length - 1){
        resetClock();
        startClock();
        console.log("Loading Next Question");
        removeAnswerChoices();
        //Load Question
        loadQuestion(questionBank[currentQuestionIndex]);

    }else{
        //TO DO: Game Over
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
        $("#user-message").text("You answered correct!");

    }else if(stateString === loseState){
        //TO DO: Display Lose modal
        $("#user-message").text("You answered incorrectly!");
        console.log("Lose");


    }else{
        console.log("Error with stateString, no matches found");
    }

    setTimeout(function(){
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




   

    
    






