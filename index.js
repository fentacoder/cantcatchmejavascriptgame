var dotHealth = 3;
var intervalId = 0;
var badClicks = 0;
var currentXPos = 250;
var currentYPos = 250;
var newXPos = 0;
var newYPos = 0;
var degreeToRotate = 0;
var movingDistance = 50;
var colorList = ['red','green','lightgreen','blue','lightblue','grey','black','yellow','gold','brown','silver','orange','white'];
var degreeList = [-180,-170,-160,-150,-140,-130,-120,-110,-100,-90,-80,
    -70,-60,-50,-40,-30,-20,-10,
    0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180];
var displacementList = [50,100,150];

function startGame(){
    $('#preGame').hide();
    $('#gameOverDiv').hide();
    $('#gameContainer').show();
    $('#dotStatus').show();
    $('#dot').show();

    dotHealth = 3;
    badClicks = 0;

    $('#dotStatus').text(`Dot Health: ${dotHealth} Bad Clicks: ${badClicks}`);
    

}

function updateStatus(){
    $('#dotStatus').text(`Dot Health: ${dotHealth} Bad Clicks: ${badClicks}`);
}

function gameOver(flag){
    clearInterval(intervalId);

    $('#gameContainer').hide();
    $('#dotStatus').hide();
    $('#dot').hide();
    $('#gameOverDiv').show();

    if(flag == 0){
        $('#winOrLose').attr('style','color: red;');
        $('#winOrLose').text('You lose...');
    }else{
        $('#winOrLose').attr('style','color: green;');
        $('#winOrLose').text('You win!');
    }
}

function randomizeColor(){
    var color = colorList[Math.floor(Math.random() * colorList.length)];
    return color;
}

function changeColor(){
    //change the background color
    //$('#gameContainer').fadeOut();
    var newColor = randomizeColor();
    var dotColor = randomizeColor();
    $('#gameContainer').attr('style', `background-color: ${newColor};`);
    $('#dot').attr('style', `background-color: ${dotColor};`);
    //$('#gameContainer').fadeIn();    
}

function getRandomDegreee(){
    var degree = degreeList[Math.floor(Math.random() * degreeList.length)];
    return degree;
}

function getRandomDisplacement(){
    var displacement = displacementList[Math.floor(Math.random() * displacementList.length)];
    return displacement;
}

function calculateDisplacement(direction){
    $('#dot').attr('class', 'dot-active');
    movingDistance = getRandomDisplacement();
    var tempX = movingDistance * (Math.cos(degreeToRotate));
    var tempY = movingDistance * (Math.cos(degreeToRotate));


    if(direction == 0){
        //rotate to the left, x is also negative
        newXPos = currentXPos - tempX;

        //set the new Y coordinate
        if(degreeToRotate < 90 && degreeToRotate > -90){
            newYPos = currentYPos - tempY; 
        }else{
            newYPos = currentYPos + tempY;
        }

    }else{
        //rotate to the right
        newXPos = currentXPos + tempX;

        //set the new Y coordinate
        if(degreeToRotate < 90 && degreeToRotate > -90){
            newYPos = currentYPos - tempY; 
        }else{
            newYPos = currentYPos + tempY;
        }

        
    }
}

function animateDot(){
    $('#dot').animate(
        {
            top: `+=${newYPos}`,
            left: `+=${newXPos + 200}`
        },1000,function(){
            $('#dot').attr('class','game-dot');

            //set the current position for the next cycle
            currentXPos = newXPos;
            currentYPos = newYPos;
        }
    );
}

function calculateNewLocation(){
    degreeToRotate = getRandomDegreee();

    if(degreeToRotate == 90){
        newXPos = currentXPos + movingDistance;
        newYPos = currentYPos;
    }else if(degreeToRotate == -90){
        newXPos = currentXPos - movingDistance;
        newYPos = currentXPos;
    }else if(degreeToRotate == 0){
        newXPos = currentXPos;
        newYPos = currentYPos - movingDistance;
    }else if(degreeToRotate == 180 || degreeToRotate == -180){

        newXPos = currentXPos;
        newYPos = currentYPos + movingDistance;
    }else{
        if(degreeToRotate < 0){
            calculateDisplacement(0); 
        }else if(degreeToRotate > 0){
            calculateDisplacement(1);
        }
    }
    
    animateDot();

    if($('#dot').attr('offsetX') < 0 || $('#dot').attr('offsetY') < 0){
        $('#dot').attr('offsetX', 250);
        $('#dot').attr('offsetY', 250);
    }
}

function moveDot(){
    changeColor();
    
    //sets the new location for the dot
    calculateNewLocation();
}

$(document).ready(function () {
    $('#gameContainer').hide();
    $('#dotStatus').hide();
    $('#gameOverDiv').hide();
    
    $('#startBtn').on('click', function () {
        startGame();

        
        intervalId = setInterval(moveDot,1500);  
    });

    $('#restartBtn').on('click', function () {
        currentXPos = 250;
        currentYPos = 250;

        startGame();
        intervalId = setInterval(moveDot,1500);
    });
    
    $('#gameContainer').on('click', function (e) {
        console.log('gameContainer id: ',e.target.id);
        badClicks++;
        updateStatus();

        if(badClicks == 10){
            gameOver(0);
        }
    });

    $('#dot').on('click',function(e){
        if(e.target.id == 'dot'){
            dotHealth--;
            updateStatus();

            if(dotHealth == 0){
                gameOver(1);
            }
        }
    });




























});