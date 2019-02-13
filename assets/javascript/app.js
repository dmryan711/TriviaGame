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

                //Load next question
                populateQuestion();
            
            //TO DO: Delete this for loop when done
                for(var i = 0;i<questionBank.length;i++){
                    console.log(questionBank[i]);
                }
        
                //TO DO: Alert, you got it correct!, you have x questions to go. Next Question button.
        
        
        
            }else{
                totalIncorrectQuestions--;

            //TO DO: Alert you got it wrong.
                //Got Answer Incorrect
                console.log("Incorrect");
            }
       
});

function populateQuestion(){
      
    if(currentQuestionIndex <= questionBank.length - 1){
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
        $("#answers").append('<button class="btn btn-success mx-auto answer-button">'+questionObject.answerArray[i]+'</button>');
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



   

    
    






