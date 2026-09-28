let capture;

const density = [ "@", "%", "%", "#", "#", "*", "*", "+", "+", "=", "=", "-", "-", ":", ":", ".", ".", " ", " "]; 

let screenArray = [];
let screenWidth; 
let screenHeight;

let cellSize = 15;
let cols, rows;

let colours;

async function setup() {
  
  colours = {
    "white": color(255),
    "green": color(0, 255, 0),
    "cyan": color(0, 255, 255),
    "magenta": color(255, 0, 255),
    "red": color(255, 0, 0),
    "yellow": color(255, 200, 0),
    "black": color(0)
  };

  screenWidth = windowWidth;
  screenHeight = windowHeight;

  createCanvas(screenWidth, screenHeight);
  
  capture = createCapture(VIDEO);
  capture.size(screenWidth, screenHeight);
  capture.hide();
  
  textFont('monospace');
  textSize(cellSize);
  textAlign(CENTER, CENTER);
  
  cols = floor(screenWidth / cellSize);
  rows = floor(screenHeight / cellSize);
  
  for (let i = 0; i < cols; i++) {
    screenArray[i] = [];
    for (let j = 0; j < rows; j++) {
      screenArray[i][j] = '0';
    }
  }
}

function draw() {
  background(colours["black"]);
  
  capture.loadPixels();
  
  if (capture.pixels.length ===  0) return;
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(colours["white"]); // Determines colour of 
      noStroke();
  
      let sx = floor(i * (capture.width / cols));
      let sy = floor(j * (capture.height / rows));
      
      const pixelIndex = (sx + sy * capture.width) * 4;
      
      const r = capture.pixels[pixelIndex + 0];
      const g = capture.pixels[pixelIndex + 1];
      const b = capture.pixels[pixelIndex + 2];
      
      const avg = (r + g + b) / 3;
      
      const len = density.length;
 
      const cIndex = constrain(floor(map(avg, 0, 255, len, 0)), 0, len - 1);
      const character = density[cIndex];
      
      screenArray[i][j] = character;
      
      let x = i * cellSize + cellSize / 2;
      let y = j * cellSize + cellSize / 2;
      
      // if (character == '.' || character == ':') fill(colours["green"]);
      
      text(screenArray[i][j], x, y);
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    saveCanvas('myAsciiImage', 'jpg');
  }
}