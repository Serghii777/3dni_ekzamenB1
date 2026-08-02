// Таймер на 2 хвилини від моменту відкриття сторінки
const TIMER_DURATION = 2 * 60 * 1000;
const TIMER_END = Date.now() + TIMER_DURATION;

const nodes = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const pad = (value) => String(value).padStart(2, "0");

let timerInterval;

function updateTimer() {
  const distance = Math.max(0, TIMER_END - Date.now());

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  nodes.days.textContent = pad(days);
  nodes.hours.textContent = pad(hours);
  nodes.minutes.textContent = pad(minutes);
  nodes.seconds.textContent = pad(seconds);

  if (distance <= 0 && timerInterval) {
    clearInterval(timerInterval);
  }
}

updateTimer();
timerInterval = setInterval(updateTimer, 250);

// Відстеження натискання кнопки Telegram
const telegramButton = document.getElementById("telegram-button");

if (telegramButton) {
  telegramButton.addEventListener("click", function (event) {
    event.preventDefault();

    const telegramUrl = this.href;

    if (typeof fbq === "function") {
      fbq("track", "Lead");
    }

    setTimeout(function () {
      window.location.href = telegramUrl;
    }, 700);
  });
}