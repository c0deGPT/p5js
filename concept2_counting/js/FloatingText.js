class FloatingText {
  constructor(text, videoX, videoY, videoWidth, videoHeight) {
    this.text = text
    do {
      this.x = random(width * 0.1, width * 0.9)
      this.y = random(height * 0.1, height * 0.7)
    } while (
      this.x > videoX - 30 && 
      this.x < videoX + videoWidth + 30 &&
      this.y > videoY - 30 && 
      this.y < videoY + videoHeight + 30
    )
    this.alpha = 255
    this.fadeSpeed = 5
    this.size = 24
  }
  
  update() {
    this.alpha -= this.fadeSpeed
  }
  
  display() {
    push()
    fill(30, 30, 30, this.alpha)
    noStroke()

    textFont('Menlo')
    textSize(this.size)
    textAlign(CENTER, CENTER)
    text(this.text, this.x, this.y)
    pop()
  }
  
  isDead() {
    return this.alpha <= 0
  }
}