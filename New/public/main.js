async function getAccountData(name, tag) {
    const leaderboard = `getAccountData/${region}`
    const response = await fetch(leaderboard);
    const json = await response.json();
    console.log(json);
}

async function getMMRData(region, puuid, epActFilter) {
    const leaderboard = `getMMRData/${region}`
    const response = await fetch(leaderboard);
    const json = await response.json();
    console.log(json);
}

async function getMMRHistory(region, puuid) {
    const leaderboard = `getMMRHistory/${region}`
    const response = await fetch(leaderboard);
    const json = await response.json();
    console.log(json);
}

async function getMatchHistory(region, puuid, gameModeFilter) {
    const leaderboard = `getMatchHistory/${region}`
    const response = await fetch(leaderboard);
    const json = await response.json();
    console.log(json);
}

async function getMatchData(matchID) {
    const leaderboard = `getMatchData/${region}`
    const response = await fetch(leaderboard);
    const json = await response.json();
    console.log(json);
}

async function getLeaderBoard(region, nameFilter, tagFilter) {
    const leaderboard = `getLeaderBoard/${region}/${nameFilter}/${tagFilter}`
    const response = await fetch(leaderboard);
    const json = await response.json();



    for await (const item of json) {
        const container = document.createElement("div");
        container.classList.add("leaderboardPlayer");
        container.classList.add(`rank${item.leaderboardRank}`);
        container.id = item.TitleID;
        const name = document.createElement("div");
        name.id = "nameText";
        name.innerText = item.gameName;
        const rank = document.createElement("div");
        rank.id = "rankText";
        rank.innerText = item.leaderboardRank;
        const wins = document.createElement("div");
        wins.id = "winsText";
        wins.innerText = item.numberOfWins;
        const rating = document.createElement("div");
        rating.id = "ratingText";
        rating.innerText = item.rankedRating;

        container.appendChild(rank);
        container.appendChild(rating);
        container.appendChild(name);
        container.appendChild(wins);
        const leaderboardDiv = document.getElementById("leaderboard");
        await leaderboardDiv.appendChild(container);
    }
}

async function getServerStatus(region) {
    const leaderboard = `getServerStatus/${region}`
    const response = await fetch(leaderboard);
    const json = await response.json();

    console.log(json.data);

    let serverStatusText;
    const serverStatusDiv = document.getElementById("serverStatus");
    const serverStatusTextDiv = document.createElement("div");
    const statusCircleDiv = document.createElement("div");
    serverStatusTextDiv.classList.add("serverStatusText");

    if (json.data === undefined || json.data.length == 0) {
        serverStatusText = `${region.toUpperCase()} Servers are down: ${json.data.incidents}`;
        statusCircleDiv.classList.add(`serverDown`);
    } else {
        serverStatusText = `${region.toUpperCase()} Servers are up and running`;
        statusCircleDiv.classList.add(`serverUp`);
    }
    serverStatusTextDiv.id = "serverStatusText";
    serverStatusTextDiv.innerText = serverStatusText;

    statusCircleDiv.id = "statusCircle";


    await serverStatusDiv.appendChild(serverStatusTextDiv);
    await serverStatusDiv.appendChild(statusCircleDiv);
    console.log(serverStatusText);
}

async function getContent() {
    const leaderboard = `getContent/${region}`
    const response = await fetch(leaderboard);
    const json = await response.json();
    console.log(json);
}

// let accData = await getAccountData("jsall", "9600");
// let MMRData = await getMMRData("eu", accData.data.puuid, "e3a3");
// let MMRHistory = await getMMRHistory("eu", accData.data.puuid);
// let matchHistory = await getMatchHistory("eu", "b8742f88-d9e5-5b79-aade-bf22c868f819", "competitive");
// let matchData = await getMatchData(matchHistory.data[0].metadata.matchid);
// let leaderboard = await getLeaderBoard("eu");
// let serverStatus = await serverStatusConst.getServerStatus("eu");
// let content = await getContent();


getLeaderBoard("eu");
getServerStatus("eu");