const Notifications = document.querySelector(".not"),
  btn = document.querySelectorAll(".btns .btn"),
  controls = document.querySelector(".controls"),
  ghost = document.getElementById("ghost"),
  display = document.getElementById("clock");

const toastDetails = {
  timer: 5000,
  success: {
    icon: "fa-circle-check",
    text: "Hi : Alarm Set Successfully On",
  },
  error: {
    icon: "fa-circle-xmark",
    text: "Hi : Alarm Cleared Successfully was",
  },
};

const audio = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
);
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;
const times = [];

function updateTime() {
  const date = new Date();
  const hour = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  const seconds = formatTime(date.getSeconds());

  display.innerText = `${hour} : ${minutes} : ${seconds}`;
}
setInterval(updateTime, 1000);

function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}

function setAlarmTime(value) {
  alarmTime = value;
}

function clearAlarm() {
  audio.pause();
  if (alarmTime) {
    clearTimeout(alarmTimeout);
    createToast("error");
  }
}

const createToast = (id) => {
  const { icon, text } = toastDetails[id];
  const toast = document.createElement("li");

  var datetimeLocalValue = document.getElementById("datetimeLocal").value;
  var dateObject = new Date(datetimeLocalValue);
  var hour = formatTime(dateObject.getHours());
  var minutes = formatTime(dateObject.getMinutes());

  toast.className = `toast ${id}`;
  toast.innerHTML = `<div class="column">
	<i class="fa-solid ${icon}"></i>
	<span>${text} <strong>${hour} : ${minutes}</strong></span>
	</div>
	<i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  Notifications.appendChild(toast);
  toast.timeId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeId) clearTimeout(toast.timeId);
  setTimeout(() => toast.remove(), 500);
};

function setAlarm() {
  if (alarmTime) {
    const current = new Date();
    const timeToAlarm = new Date(alarmTime);

    if (timeToAlarm > current) {
      const timeOut = timeToAlarm.getTime() - current.getTime();
      times.push(timeOut);

      alarmTimeout = setTimeout(() => audio.play(), timeOut);
      createToast("success");
    } else {
      alert("Enter A Valid Numb.er");
    }
  }
}

ghost.addEventListener("click", () => {
  controls.classList.toggle("hide");
});
