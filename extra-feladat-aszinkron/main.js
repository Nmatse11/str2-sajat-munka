import { serial, users } from "./async.js";
import { parallel, users2 } from "./async2.js";

const counter = (number) => {
  for (let step = 0; step < number; step++) {
    serial()
  }
}

const counter2 = (number) => {
  for (let step = 0; step < number; step++) {
    parallel()
  }
}

const time0 = performance.now()
serial().then(console.log(users));
const time1 = performance.now()

const time2 = performance.now()
parallel().then(console.log(users2));
const time3 = performance.now()

const time4 = performance.now()
counter(10)
const time5 = performance.now()

const time6 = performance.now()
counter2(10)
const time7 = performance.now()

const time8 = performance.now()
counter(100)
const time9 = performance.now()

const time10 = performance.now()
counter2(100)
const time11 = performance.now()

const time12 = performance.now()
counter(1000)
const time13 = performance.now()

const time14 = performance.now()
counter2(1000)
const time15 = performance.now()

const times = [[time1-time0,time3-time2],[time5-time4,time7-time6],[time9-time8,time11-time10],[time13-time12,time15-time14]];
console.table(times);