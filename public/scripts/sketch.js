var mic, amplitude;

function setup() {
  createCanvas(windowWidth, 300);
  mic = new p5.AudioIn()
  mic.start();
  amplitude = new p5.Amplitude()
}

function draw() {
  background(65);
  micLevel = mic.getLevel();

  noStroke();
  fill(color(0, 100, 200))
  ellipse(
    constrain(0, width - micLevel * 5 * width, width),
    constrain(height - micLevel * height * 5, 0, height),
    10,
    10
  );

  fill(color(255,204,0))
  ellipse(
    constrain(0, width-micLevel * 5 * width, width),
    75,
    80,
    80
  );

  stroke(150)
  line(round(micLevel*width), 0, round(micLevel*100), height);
}
