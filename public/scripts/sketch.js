// global variables
let mic, amp, socket;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // setup socket
  // put ip address in to connect
  socket = io.connect('http://XXX.XXX.X.XXX:3000');

  // get mic data
  mic = new p5.AudioIn();
  mic.start();

  // to make the bg col fluxuate fromblack to white on sound
  // let col = map(micVal, 0, 30, 0, 255);
  let col = 60;
  background(col);

  // get amplitude and set it to the mic
  amp = new p5.Amplitude();
  amp.setInput(mic);
  socket.on('stranger', strangerDrawing);
}

// capturing socket mic data
function strangerSounds() {
  let data = {
    micVal: mic.getLevel(),
    ampVal: amp.getLevel()
  };

  socket.emit('stranger', data);

}
// drawing with stranger voice data
function strangerDrawing(data) {
  // blue ball with diagnal bottomright to top left movement
  noStroke();
  fill(color(0, 100, 200));
  ellipse(
    constrain(0, width - data.micVal * 5 * width, width),
    constrain(height - data.micVal * height * 5, 0, height),
    10,
    10
  );

  // larger yellow ball that moves from right to left horizontally
  fill(color(255, 204, 0));
  ellipse(
    constrain(0, width - data.micVal * 5 * width, width),
    75,
    80,
    80
  );
}

// drawing with host mic data
function draw() {
  micLevel = mic.getLevel();
  let micVal = Math.floor(micLevel * 100);


// if the mic is on send data to server
  if(micLevel){
    strangerSounds();
  }

  // color changing triangle
  let randomCol = map(micVal, 0, 10, 50, 255);
  console.log(randomCol, micVal);
  let colorTri = color(0, 0, randomCol);
  noStroke();
  fill(colorTri);
  triangle(100, 100, 320, 100, 310, 80);

  // red circle in middle
  stroke(color('white'));
  fill(color(255,0,0));
  ellipse(width/2, height/2 , 20+micLevel*200, 20+amp.getLevel()*200);


  // white line top moves from left to right at an angle
  stroke(150);
  line(round(micLevel * width), 0, round(micLevel * 100), height);
}
