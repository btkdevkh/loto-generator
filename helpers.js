export const countDown = (minuteToSecond, htmlEl) => {
  let dateObj = new Date(minuteToSecond * 1000); // To milliseconds
  let hours = dateObj.getUTCHours();
  let minutes = dateObj.getUTCMinutes();
  let seconds = dateObj.getSeconds();

  let format = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  htmlEl.textContent = `${format}`;
};

export const getTimer = (min, htmlEl, resetFlashBtn) => {
  let minute = min;
  let second = 60;

  htmlEl.textContent = `00:${minute < 10 ? `0${minute}` : minute}:${
    second < 10 ? `0${second}` : second
  }`;

  minute--;

  const timer = setInterval(() => {
    second--;

    if (second === 0) {
      minute--;
      second = 60;

      if (minute === -1) {
        clearInterval(timer);
        resetFlashBtn(false);

        minute = 0;
        second = 0;
      }
    }

    htmlEl.textContent = `00:${minute < 10 ? `0${minute}` : minute}:${
      second < 10 ? `0${second}` : second
    }`;
  }, 1000);
};
