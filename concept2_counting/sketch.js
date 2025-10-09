let malaVideo
let sutrasSound
let videoX, videoY, videoWidth, videoHeight
let playing = false

let shortBars = []
let barInterval = 50

let isJudgeLineJumping = false
let jumpStartTime = 0 
let jumpDuration = 200

let hitRecords = []
let recordStartTime = 0
let floatingTexts = []

function preload(){
  malaVideo = createVideo(['materials/mala_turn.mp4'])
  sutrasSound = loadSound(['materials/chant_sutras.MP3'])
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  malaVideo.hide()
  videoWidth = 320
  videoHeight = 320
  videoX = width/2 - videoWidth/2
  videoY = height/2 - videoHeight/2 - 70

  longBar = {
    width : 200,
    height : 30
  }
  longBar.x = width/2 - longBar.width/2
  longBar.y = height - 230

  judgeLine = {
    x: longBar.x + longBar.width / 2,
    y: longBar.y,
    height: longBar.height
  }

  recordStartTime = millis()
}

function draw() {
  background(240)

  image(malaVideo, videoX, videoY, videoWidth, videoHeight)
  fill(200)
  stroke(80)
  strokeWeight(1)
  rect(longBar.x, longBar.y, longBar.width, longBar.height, 30) //long bar

  drawJudgeLine()
  genNextBar()

  fill(0)
  textSize(16)
  text('Press SPACE', longBar.x + 52, longBar.y + 80) //prompt

  updateFloatingTexts()
}

function keyPressed() {
  if (key ===' '){
    for (let i = shortBars.length - 1; i >= 0; i--){
      if(shortBars[i].isInJudgeZone(judgeLine.x) && !shortBars[i].hit){
        shortBars[i].hit = true

        let currentTime = millis()
        let timePassed = currentTime - recordStartTime

        let record = new HitRecord(timePassed)
        hitRecords.push(record)

        let floatingText = new FloatingText(
          record.formattedTime,
          videoX,
          videoY,
          videoWidth,
          videoHeight
        )
        floatingTexts.push(floatingText)
        console.log(`trigger_timing: ${record.formattedTime}`)

        malaVideo.play()
        sutrasSound.play()
        console.log('trigger successfully!')

        isJudgeLineJumping = true
        jumpStartTime = millis()

        setTimeout(() => {
          malaVideo.pause()
          sutrasSound.pause()
        }, 500) //video stops after trigger for some time
        break
      }
    }
  }
}

function drawJudgeLine() {
  let jumpOffset = 0
  
  if (isJudgeLineJumping) {
    let elapsed = millis() - jumpStartTime
    
    if (elapsed < jumpDuration) {
      let progress = elapsed / jumpDuration
      jumpOffset = sin(progress * PI) * -40
    } else {
      isJudgeLineJumping = false
    }
  }

  // judgeLine
  stroke(10)
  strokeWeight(0.5)
  line(judgeLine.x, judgeLine.y + 1, judgeLine.x, judgeLine.y + judgeLine.height - 1)
  
  // judgeLineMark
  noStroke()
  fill(10)
  ellipse(judgeLine.x, judgeLine.y - 15 + jumpOffset, 15)
}

function genNextBar(){
  if (frameCount % barInterval == 0) {
    let ShortBar = new shortBar(longBar.x, longBar.y, longBar.width, longBar.height)
    shortBars.push(ShortBar);
  }

  for (let i = shortBars.length - 1; i >= 0; i--){
    shortBars[i].move()
    shortBars[i].display()
    if (shortBars[i].x + shortBars[i].sizeX> longBar.x + longBar.width){
      shortBars.splice(i, 1)
    }
  }
}

function updateFloatingTexts(){
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    floatingTexts[i].update()
    floatingTexts[i].display()
    
    if (floatingTexts[i].isDead()) {
      floatingTexts.splice(i, 1)
    }
  }
}

function formatTime(ms) {
  let seconds = (ms / 1000).toFixed(2)
  return `${seconds}s`
}

