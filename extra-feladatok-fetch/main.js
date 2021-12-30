const urls = ['https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json',
'https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json']

const team = 'Hungary'
const teamData = ['Group', 'Coach', 'FIFA ranking']
const playerData = ['Name', 'Position', 'Club']

let hunTeam
let playerList = []

const fetchMethod = () => {
Promise.all(urls.map((url) => fetch(url)))
.then(async([teams, players]) => {
  const teamsJson = await teams.json();
  const playersJson = await players.json();
  return [teamsJson, playersJson]
})
.then((resp) => {
  hunTeam = resp[0].sheets.Teams.filter(item => item.Team == team)[0];
  playerList = resp[1].sheets.Players
  
  createTeamTable()
  createPlayersTableHead()
  createPlayersTable()

}).catch((error) => {
  console.error('Error: ', error)
})
}

window.onload = () => {
  fetchMethod()
}

const createTeamTable = () => {
  const teamName = document.querySelector('.teamName')
  teamName.textContent = team
  const table = document.querySelector('.teamInfo')
  for (let i = 0; i < teamData.length; i++) {
  const td = document.createElement('td')
  td.textContent = `${teamData[i]}`
  td.classList.add('tableItem')
  const td2 = document.createElement('td2')
  td2.textContent = `${hunTeam[teamData[i]]}`
  td2.classList.add('teamdata')
  const tr = document.createElement('tr')
  tr.appendChild(td)
  tr.appendChild(td2)
  table.appendChild(tr)
  }
}

const createPlayersTableHead = () => {
  const tHead = document.querySelector(".thead");
  const tr = document.createElement('tr')
  tHead.appendChild(tr)
  for (let i = 0; i < playerData.length; i++) {
    const th = document.createElement('th')
    th.textContent = `${playerData[i]}`
    th.classList.add('playerinfo')
    tr.appendChild(th)}
}

const createPlayersTable = () => {
  const tBody = playersTable.querySelector(".tbody");
  for (let i = 0; i < playerList.length; i++) {
    const tr = document.createElement("tr");
    tr.classList.add("row")
    tBody.appendChild(tr);
   for (let j = 0; j < playerData.length; j++) {
      const td = document.createElement("td");
      td.textContent = `${playerList[i][playerData[j].toLowerCase()]}`
      td.classList.add('item')
      tr.appendChild(td)
    }
  }
}