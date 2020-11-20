class Timer {
  constructor(StartTime = Date.now()) {
    this.startTime = StartTime;
  }
  count(currTime) {
    const time = currTime - this.startTime;
    const seconds = time / 1000;
    return seconds;
  }
}
