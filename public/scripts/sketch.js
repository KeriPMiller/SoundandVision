// global variables
let mic, amp, socket;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // setup socket
  // put ip address in to connect
  socket = io.connect('http://XXX.XXX.X.XXX:3000');

  // get audio
  mic = new p5.AudioIn();
  mic.start();

  // get amplitude and set it to the mic
  amp = new p5.Amplitude();
  amp.setInput(mic);
}

// capturing socket mic data
function strangerSounds() {
  let data = {
    micVal: mic.getLevel(),
    ampVal: amp.getLevel()
  };
  noStroke();
  fill(color(255,0,0));
  ellipse(width/2, Math.floor(data.micVal * 200), 20+data.ampVal*200, 20+data.ampVal*200);

  socket.emit('stranger', data);

}

// drawing with host mic data
function draw() {
  micLevel = mic.getLevel();
  let micVal = Math.floor(micLevel * 100);
  // to make the bg col fluxuate fromblack to white on sound
  let col = map(micVal, 0, 30, 0, 255);
  background(col);

// if the mic is on send data to server
  if(micLevel){
    strangerSounds();
  }
  // blue ball with diagnal bottomright to top left movement
  noStroke();
  fill(color(0, 100, 200));
  ellipse(
    constrain(0, width - micLevel * 5 * width, width),
    constrain(height - micLevel * height * 5, 0, height),
    10,
    10
  );

  // larger yellow ball that moves from right to left horizontally
  fill(color(255, 204, 0));
  ellipse(
    constrain(0, width - micLevel * 5 * width, width),
    75,
    80,
    80
  );

  // white line top moves from left to right at an angle
  stroke(150);
  line(round(micLevel * width), 0, round(micLevel * 100), height);
}
