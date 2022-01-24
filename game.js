var gamePattern=[];
var buttonColors = ["red", "blue", "green", "yellow" ];
var userClickedPattern=[];
var level=0;
console.log(level);
$(document).on("load",function(){
   $("h1".text("Press A Key to Start")); 
});

function nextSequence(){
   userClickedPattern=[];
   var randomNumber = Math.floor(Math.random()*4)
   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
   $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
   console.log(level);
   level+=1;
   $("h1").text("level "+level);

}

$(".btn").click(function(){
   userChosenColour= $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1)
});


function playSound(name){
   var audio = new Audio('sounds/'+name+'.mp3');
   audio.play();
}

function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
   setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
  }, 100);

}

$(document).keydown(function(event){
   if(level===0){
   nextSequence();}
});



function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
      console.log("correct");
      if(userClickedPattern.length===gamePattern.length){
         userClickedPattern=[];
         setTimeout(function () {
            nextSequence()
        }, 1000);
      }
   }

   else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
         $("body").removeClass("game-over")
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
   }

}

function startOver(){
   level=0;
   gamePattern=[];
}

