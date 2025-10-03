let malaVideo
let sutrasSound
let playing = false

let shortBars = []
let barInterval = 50

let isJudgeLineJumping = false
let jumpStartTime = 0 
let jumpDuration = 200

function preload(){
  malaVideo = createVideo(['materials/mala_turn.mp4'])
  sutrasSound = loadSound(['materials/chant_sutras.MP3'])
}

function setup() {
  createCanvas(800, 600)
  malaVideo.hide()
  longBar = {
    x : 200,
    y : 470,
    width : 400,
    height : 25
  }
  judgeLine = {
    x: longBar.x + longBar.width / 2,
    y: longBar.y,
    height: longBar.height
  }
}

function draw() {
  background(240)
  image(malaVideo, 
        width/2 - malaVideo.width/10, height/2 - malaVideo.height/10 - 30, 
        malaVideo.width/5, malaVideo.height/5)
  fill(200)
  stroke(80)
  strokeWeight(1)
  rect(longBar.x, longBar.y, longBar.width, longBar.height, 30) //long bar

  drawJudgeLine()
  genNextBar()
}

function keyPressed(){
  if (key ===' '){
    for (let i = shortBars.length - 1; i >= 0; i--){
      if(shortBars[i].isInJudgeZone(judgeLine.x) && !shortBars[i].hit){
        shortBars[i].hit = true
        malaVideo.play()
        sutrasSound.play()
        console.log('trigger successfully!')

        isJudgeLineJumping = true
        jumpStartTime = millis()

        setTimeout(() => {
          malaVideo.pause()
          sutrasSound.pause()
        }, 500)
        break
      }
    }
  }
}

function drawJudgeLine(){
  let jumpOffset = 0
  
  if (isJudgeLineJumping) {
    let elapsed = millis() - jumpStartTime
    
    if (elapsed < jumpDuration) {
      let progress = elapsed / jumpDuration
      jumpOffset = sin(progress * PI) * -20
    } else {
      isJudgeLineJumping = false
    }
  }

  // judgeLine
  stroke(10)
  strokeWeight(1)
  line(judgeLine.x, judgeLine.y + 1, judgeLine.x, judgeLine.y + judgeLine.height - 1)
  
  // judgeLineMark
  noStroke()
  fill(10)
  ellipse(judgeLine.x, judgeLine.y - 10 + jumpOffset, 10)
}

function genNextBar(){
  if (frameCount % barInterval == 0) {
    shortBars.push(new shortBar(longBar.x, longBar.y, longBar.width, longBar.height));
  }

  for (let i = shortBars.length - 1; i >= 0; i--){
    shortBars[i].move()
    shortBars[i].display()
    if (shortBars[i].x + shortBars[i].sizeX> longBar.x + longBar.width){
      shortBars.splice(i, 1)
    }
  }
}

class shortBar {
  constructor(x, y, sizeX, sizeY) {
    this.x = x
    this.y = y
    this.sizeX = random(sizeX/12, sizeX/7)
    this.sizeY = sizeY
    this.speed = 2.5
    this.hit = false
  }
  move() {
    this.x += this.speed
  }
  display() {
    fill(150)
    noStroke()
    rect(this.x, this.y, this.sizeX, this.sizeY, 30)
  }
  isInJudgeZone(judgeX) {
    return judgeX >= this.x && judgeX <= this.x + this.sizeX
  }
}