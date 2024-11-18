let charachterX = 450; // pocetna x pozicija
let charachterY = 50; // pocetna Y pozicija
let velocityY = 0;
let acceleration = 0.3; // Gravity
let maxLandingSpeed = 10; // Maksimalna brzina sletanja
let gameState = "start";
let landed = false;
let x = 100;
let y = 100;
let starX = [];
let starY = [];
let starAlpha = [];
let width = 600;
let height = 600;

function setup() {
  //image found on Pinterest https://www.pinterest.com/pin/639370478386354613/
  bg = loadImage("gradient.png");
  createCanvas(width, height);
  frameRate(30);
  //following 7 lines of code are inspired by Garrit's starry sky at:
  //https://pixelkind.github.io/foundationsofprogramming//programming/15-07-example
  for (let i = 0; i < 300; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    starX.push(x);
    starY.push(y);
    starAlpha.push(alpha);
  }
}

// drawing the ship
function charachter(x, y) {
  push();
  scale(0.5);

  // Ship legs
  push();
  fill(231, 84, 129);
  stroke(81, 40, 137);
  strokeWeight(4);
  triangle(x + 103, y + 239, x + 120, y + 249, x + 90, y + 277);
  triangle(x + 177, y + 239, x + 164, y + 249, x + 197, y + 277);
  ellipse(x + 136, y + 180, 150);
  pop();

  // Ship body
  push();
  fill(120, 62, 169);
  stroke(81, 40, 137);
  strokeWeight(5);
  arc(x + 140, y + 160, 299, 140, 0, PI, CHORD);
  pop();

  push();
  fill(156, 81, 183);
  stroke(81, 40, 137);
  strokeWeight(5);
  ellipse(x + 140, y + 160, 300, 70);
  pop();

  // Alien's ball
  push();
  fill(255, 230, 230);
  stroke(81, 40, 137);
  strokeWeight(3);
  translate(x + 135, y + 130);
  rotate(2.75);
  arc(0, 0, 150, 150, 0, PI + QUARTER_PI, CHORD);
  pop();

  push();
  fill(255, 230, 230);
  noStroke();
  arc(x + 135, y + 156, 137, 17, 0, PI, CHORD);
  pop();

  // Ears
  push();
  fill(0, 146, 87);
  stroke(0, 106, 78);
  ellipse(x + 96, y + 92, 20);
  ellipse(x + 174, y + 92, 20);
  pop();

  // Alien face
  push();
  fill(0, 146, 87);
  stroke(0, 106, 78);
  rect(x + 130, y + 145, 10, 19);
  ellipse(x + 135, y + 115, 90, 70);
  pop();

  // Eyes
  push();
  noStroke();
  fill(30, 40, 40);
  translate(x + 114, y + 112);
  rotate(-0.5);
  ellipse(0, 0, 15, 25);
  pop();

  push();
  noStroke();
  fill(30, 40, 40);
  translate(x + 153, y + 112);
  rotate(0.5);
  ellipse(0, 0, 15, 25);
  pop();

  // White part of the eyes
  push();
  fill(240, 230, 230);
  noStroke();
  ellipse(x + 113, y + 109, 5);
  pop();

  push();
  fill(240, 230, 230);
  noStroke();
  ellipse(x + 153, y + 109, 5);
  pop();

  // Nose
  push();
  noStroke();
  fill(30, 40, 40);
  ellipse(x + 134, y + 127, 12, 5);
  pop();

  // Dots on the ship
  push();
  fill(240, 230, 230);
  noStroke();
  ellipse(x + 37, y + 198, 8);
  ellipse(x + 85, y + 210, 8);
  ellipse(x + 133, y + 214, 8);
  ellipse(x + 181, y + 210, 8);
  ellipse(x + 229, y + 202, 8);
  pop();

  pop(); // End scaling
}

//following 7 lines of code are inspired by Garrit's starry sky at:
//https://pixelkind.github.io/foundationsofprogramming//programming/15-07-example

function drawStars() {
  noStroke();
  for (let index in starX) {
    fill(255, 255, 255, starAlpha[index] * 255);
    ellipse(starX[index], starY[index], 2);
  }
}

// Crtanje pozadine
function drawBackground() {
  background(bg);
  fill(255,255,255);
  drawStars();
}

//start screen
function drawStartScreen() {
  background(bg);
  fill(255,255,255);
  drawStars();
  textFont("bebas");
  textSize(40);
  fill(255);
  textAlign(CENTER);
  text("Press Start to Begin", x + 205, y + 60);
  textFont("montserrat");
  textSize(12);
  text(
    "The goal is to land the ship safely.You can adjust the ships' speed by pressing the space key.",
    x + 95,
    y + 200,
    220
  );
  fill(240, 240, 250);
  noStroke();
  textSize(30);
  rect(x + 140, y + 113, 125, 50, 10);
  fill(46,42,96);
  textFont("bebas");
  text("START", x + 202, y + 150);
}

//game over screen
function drawGameOverScreen() {
  background(70, 0, 100);
  textFont("bebas");
  textSize(32);
  fill(255, 255, 255);
  drawStars();
  textAlign(CENTER);
  text("Crash Landing! Try Again", x + 205, y + 120);
  fill(230, 230, 250);
  rect(x + 140, y + 180, 125, 40, 10);
  fill(70, 0, 100);
  textFont("montserrat");
  textSize(20);
  text("RETRY", x + 202, y + 207);
}

//repeat button for a successful landing
function drawRepeatButton() {
  fill(230, 230, 250);
  textFont("bebas");
  rect(x + 140, y + 40, 120, 40, 10);
  textAlign(CENTER);
  text("Yay! You have landed successfully!", x + 200, y + 5);
  fill(7, 7, 60);
  textSize(20);
  textFont("montserrat");
  text("REPEAT", x + 200, y + 67);
}

//the following 5 lines of code were acquired through chatgpt
function draw() {
 
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    drawBackground();
    charachter(charachterX, charachterY);

    // gravity
    velocityY += acceleration; 
    charachterY += velocityY;

    //  checking if the ship landed
    if (charachterY >= 570) {
      charachterY = 570; //where the ship is supposed to land, stops movement at that position
      if (Math.abs(velocityY) <= maxLandingSpeed) {
        landed = true; // Successful landing
        drawRepeatButton();
      } else {
        landed = false; //if it lands too fast
        gameState = "gameover";
      }
      velocityY = 0;
    }
  } else if (gameState === "gameover") {
    drawGameOverScreen();
  }
}

//space key down
function keyPressed() {
  if (gameState === "playing" && keyCode === 32) {
    velocityY = -2; // da bi se brod pomerio ka gore
  }
}

// for all the buttons
function mousePressed() {
  if (gameState === "start") {
    if (
      mouseX > x + 143 &&
      mouseX < x + 256 &&
      mouseY > y + 116 &&
      mouseY < y + 165
    ) {
      gameState = "playing";
      charachterY = 50; // Reset on starting position
      velocityY = 0;
    }
  } else if (gameState === "gameover") {
    if (
      mouseX > x + 140 &&
      mouseX < x + 256 &&
      mouseY > y + 180 &&
      mouseY < y + 220
    ) {
      gameState = "start";
    }
  } else if (landed) {
    if (
      mouseX > x + 140 &&
      mouseX < x + 256 &&
      mouseY > y + 20 &&
      mouseY < y + 60
    ) {
      gameState = "start";
      landed = false;
    }
  }
}
