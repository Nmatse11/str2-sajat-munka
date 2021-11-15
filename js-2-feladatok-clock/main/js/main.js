const checkTime = (i) => {
  if (i < 10) {i = "0" + i};
  return i;
}

const clock = () => {
  const now = new Date()
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  minute = checkTime(minute);
  second = checkTime(second);
  document.querySelector(".clock").innerHTML =  hour + ":" + minute + ":" + second;
  setTimeout(clock, 1000);
}

clock()

