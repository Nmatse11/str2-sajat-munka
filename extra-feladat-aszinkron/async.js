'use strict';
const maxReplayNumber = 2;
let replayNumber = 0;
let users = [];

const createUsersArray = (response, callback) => {
  const result = JSON.parse(response.responseText);
  users.push(...result.users)
}

const request = (method, url) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      createUsersArray(xhr);
    } else if (replayNumber < maxReplayNumber) {
      setTimeout (function () {
        replayNumber += 1
        createUsersArray(xhr)
      }, 5000);
    } else if (replayNumber == maxReplayNumber) {
      replayNumber = 0;
      console.log('The json file is not available')
    }
  }
  xhr.onerror = () => {
    console.log('Error')
  }
  xhr.open(method, url, false);
  xhr.send();
}

const serial = async () => { 
  const fetchA = request('GET', './json/users1.json', createUsersArray);
  const fetchB = request('GET', './json/users2.json', createUsersArray);
  const fetchC = request('GET', './json/users3.json', createUsersArray);
  await fetchA
  await fetchB
  await fetchC
}

export {serial, users}
