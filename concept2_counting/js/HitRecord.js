class HitRecord {
  constructor(timePassed) {
    this.timePassed = timePassed
    this.formattedTime = formatTime(timePassed)
  }
}