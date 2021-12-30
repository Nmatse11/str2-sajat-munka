'use strict';
const maxReplayNumber2 = 2;
const replayNumber2 = 0;
let users2 = [];

const createUsersArray2 = (response, callback) => {
  const result = JSON.parse(response.responseText);
  users2.push(...result.users)
}

const request2 = (method, url) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      createUsersArray2(xhr);
    } else if (replayNumber2 < maxReplayNumber2) {
      setTimeout (function () {
        replayNumber += 1
        createUsersArray2(xhr)
      }, 5000);
    } else if (replayNumber2 == maxReplayNumber2) {
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


const parallel = async () => {   
  const fetchA = request2('GET', './json/users1.json', createUsersArray2);
  const fetchB = request2('GET', './json/users2.json', createUsersArray2);
  const fetchC = request2('GET', './json/users3.json', createUsersArray2);
  return (await fetchA, fetchB, fetchC);
}

export {parallel, users2}

