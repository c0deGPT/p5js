class shortBar {
  constructor(x, y, sizeX, sizeY) {
    this.x = x
    this.y = y
    this.sizeX = random(sizeX/7, sizeX/5)
    this.sizeY = sizeY
    this.speed = 1.4
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