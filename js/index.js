
class CountdownTimer {
  constructor({ selector, targetDate }) {
      
    this.selector = selector
    this.targetDate = targetDate
    this.intervalId = null;
    
    this.start() //запускает все экземпляры класса
  }

  start() {

    const targetDateMillisec = new Date(this.targetDate).getTime();
    console.log("targetTime", targetDateMillisec)
    this.pasteMarkupTamplate()
    

    this.intervalId = setInterval(() => {

      const currentTime = Date.now();
      if (targetDateMillisec <= currentTime) {
          return
      }

      const deltaTime = targetDateMillisec - currentTime;
      const convertedTime = this.getTimeComponents(deltaTime);
      console.log(convertedTime);
      this.pasteTimerComponents(this.getMarkupElements(), convertedTime)

    }, 1000);

  }

  setMarkupTamplate() {
    return ` <div class="field">
            <span class="value" data-value="days">00</span>
            <span class="label">Days</span>
        </div>

        <div class="field">
            <span class="value" data-value="hours">00</span>
            <span class="label">Hours</span>
        </div>

        <div class="field">
            <span class="value" data-value="mins">00</span>
            <span class="label">Minutes</span>
        </div>

        <div class="field">
            <span class="value" data-value="secs">00</span>
            <span class="label">Seconds</span>
        </div>`
  }
  
  pad(value) {
    return String(value).padStart(2, '0');
  }
  
  getTimeComponents(deltaTime) {
    const days = this.pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((deltaTime % (1000 * 60)) / 1000));
    
    return { days, hours, mins, secs }  
  }

  getTimerBlockByIdEl() {
    const timerBlockByIdEl = document.querySelector(`${this.selector}`)

    return timerBlockByIdEl
  }
  
  pasteMarkupTamplate() {
    this.getTimerBlockByIdEl().insertAdjacentHTML('beforeend', this.setMarkupTamplate())
  }

  getMarkupElements() {
    const daysEl = document.querySelector(`${this.selector} [data-value="days"]`)
    const hoursEl = document.querySelector(`${this.selector} [data-value="hours"]`)
    const minsEl = document.querySelector(`${this.selector} [data-value="mins"]`)
    const secsEl = document.querySelector(`${this.selector} [data-value="secs"]`)

    return { daysEl, hoursEl, minsEl, secsEl }
  }
  
  pasteTimerComponents(getMarkupElements, convertedTime) {
    const { daysEl, hoursEl, minsEl, secsEl } = this.getMarkupElements()
    const { days, hours, mins, secs } = convertedTime
    daysEl.textContent = days
    hoursEl.textContent = hours
    minsEl.textContent = mins
    secsEl.textContent = secs
  }

}

//------------------ Экземпляры таймеров ------------------ 

const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2022'),
});
// timer1.start(); //рендерит и запускает текущий таймер

const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Nov 17, 2021'),
});
// timer2.start(); //рендерит и запускает текущий таймер


