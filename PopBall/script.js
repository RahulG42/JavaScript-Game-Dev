
let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let boardBounds = board.getBoundingClientRect();

let x = true;
let y = true; 
//
let leftPlayerLives=3;
let rightPlayerLives=3;
//user input
document.addEventListener('keydown',function(e)
{
    console.log("key pressed");
    if(e.key=="w")
    {
        movePaddle(leftPaddle,-window.innerHeight*0.1);
        
    }
    else if(e.key=="s")
    {
        movePaddle(leftPaddle,window.innerHeight*0.1)
    }
    else if(e.key=="ArrowUp")
    {
        movePaddle(rightPaddle,-window.innerHeight*0.1)
    }
    else if(e.key=="ArrowDown")
    {
        movePaddle(rightPaddle,window.innerHeight*0.1)
    }
})

function setColor(idx){
 let allicon= document.querySelectorAll(".fas.fa-circle");
 allicon[idx].style.color="#688de0";
}
function movePaddle(cPaddle,change)
{
    let cPaddleBounds=cPaddle.getBoundingClientRect();
    

    if(cPaddleBounds.top+change>=boardBounds.top&&cPaddleBounds.bottom+change<=boardBounds.bottom)
    {
        cPaddle.style.top=cPaddleBounds.top+change+"px";
    }
}

function moveBall() {
    let ballCord = ball.getBoundingClientRect();
    let ballTop = ballCord.top;
    let ballLeft = ballCord.left;
    let ballBottom = ballCord.bottom;
    let ballRight = ballCord.right;

    //check if collided with any player boundary

    let hasTouchedLeft = ballLeft < boardBounds.left;
    let hasTouchedRight = ballRight > boardBounds.right;

    if (hasTouchedLeft || hasTouchedRight) {
        if (hasTouchedLeft) {
            leftPlayerLives--;
             setColor(leftPlayerLives);
            if (leftPlayerLives === 0) {
                alert("Game over! Player A won the game");
                document.location.reload();
            } else {
                return resetGame();
            }
        } else {
            rightPlayerLives--;
             setColor(3+rightPlayerLives);
            if (rightPlayerLives === 0) {
                alert("Game over! Player B won the game");
                document.location.reload();
            } else {
                return resetGame();
            }
        }
    }
    function startGame() {
        requestAnimationFrame(moveBall);
    }
    
    // Function to reload the page after a delay
    function reloadWithDelay() {
        setTimeout(function() {
            location.reload();
        }, 3000); // 3 seconds delay
    }


    function resetGame() {
        ball.style.top = window.innerHeight * 0.45 + "px";
        ball.style.left = window.innerWidth * 0.45 + "px";
        x = true;
        y = true;
         requestAnimationFrame(moveBall);
        // startGame(); // Start the game again
        // reloadWithDelay();
    }

    if (ballTop <= boardBounds.top || ballBottom >= boardBounds.bottom) {
        // Vertical boundary reached
        y = !y; // Change direction
    }

    if (ballLeft <= boardBounds.left || ballRight >= boardBounds.right) {
        // Horizontal boundary reached
        x = !x; // Change direction
    }

    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();
    
    if (
        ballRight >= leftPaddleBounds.left &&
        ballLeft <= leftPaddleBounds.right &&
        ballTop <= leftPaddleBounds.bottom &&
        ballBottom >= leftPaddleBounds.top
    ) {
        x = !x;
    }
    
    if (
        ballLeft <= rightPaddleBounds.right &&
        ballRight >= rightPaddleBounds.left &&
        ballTop <= rightPaddleBounds.bottom &&
        ballBottom >= rightPaddleBounds.top
    ) {
        x = !x;
    }

    ball.style.top = y ? ballTop + 6 + "px" : ballTop - 6 + "px";
    ball.style.left = x ? ballLeft + 6 + "px" : ballLeft - 6 + "px";
    
    requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall);
