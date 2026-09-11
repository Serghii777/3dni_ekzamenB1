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
    }, 450);
  });
}
