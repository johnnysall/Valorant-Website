import fetch from "node-fetch";


// Status Container, get all elements within it
const serverStatusContainer = document.getElementById("serverStatusContainer");
const regionDropdown = document.getElementById("regionDropdown");
const statusText = document.getElementById("statusText");
const statusColour = document.getElementById("statusColour");
const refreshStatusbtn = document.getElementById("refreshStatusbtn");


async function getAccountData(name, tag) {
    let link = "https://api.henrikdev.xyz/valorant/v1/account/" + name + "/" + tag;

    let response = await fetch(link);
    response = await response.json();
    return response;
}

async function getMMRData(region, puuid, epActFilter) {
    let link;
    if (epActFilter) {
        link = "https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/" + region + "/" + puuid + "?filter=" + epActFilter;
    } else {
        link = "https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/" + region + "/" + puuid;
    }

    let response = await fetch(link);
    response = await response.json();
    return response;
}

async function getMMRHistory(region, puuid) {
    let link = "https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr-history/" + region + "/" + puuid;

    let response = await fetch(link);
    response = await response.json();
    return response;
}

async function getMatchHistory(region, puuid, gameModeFilter) {
    let link;
    if (gameModeFilter) {
        link = "https://api.henrikdev.xyz/valorant/v3/by-puuid/matches/" + region + "/" + puuid + "?filter=" + gameModeFilter;
    } else {
        link = "https://api.henrikdev.xyz/valorant/v3/by-puuid/matches/" + region + "/" + puuid;
    }

    let response = await fetch(link);
    response = await response.json();
    return response;
}

async function getMatchData(matchID) {
    let link = "https://api.henrikdev.xyz/valorant/v2/match/" + matchID;

    let response = await fetch(link);
    response = await response.json();
    return response;
}

async function getLeaderBoard(region, nameFilter, tagFilter) {
    let link;
    if (nameFilter && tagFilter) {
        link = "https://api.henrikdev.xyz/valorant/v1/leaderboard/?" + region + "name=" + nameFilter + "&tag=" + tagFilter;
    } else {
        link = "https://api.henrikdev.xyz/valorant/v1/leaderboard/" + region;
    }

    let response = await fetch(link);
    response = await response.json();
    return response;
}

const serverStatusConst = (() => {
    async function getServerStatus(region) {
        let link = "https://api.henrikdev.xyz/valorant/v1/status/" + region;
    
        let response = await fetch(link);
        response = await response.json();
        displayStatus(response);
    }

    const displayStatus = (response) => {
        statusText.innerText = response;
    }

    return { getServerStatus, displayStatus };
})();


async function getContent() {
    let link = "https://api.henrikdev.xyz/valorant/v1/content";

    let response = await fetch(link);
    response = await response.json();
    return response;
}

let accData = await getAccountData("jsall", "9600");
let MMRData = await getMMRData("eu", accData.data.puuid, "e3a3");
let MMRHistory = await getMMRHistory("eu", accData.data.puuid);
let matchHistory = await getMatchHistory("eu", "b8742f88-d9e5-5b79-aade-bf22c868f819", "competitive");
let matchData = await getMatchData(matchHistory.data[0].metadata.matchid);
let leaderboard = await getLeaderBoard("eu");
let serverStatus = await serverStatusConst.getServerStatus("eu");
let content = await getContent();

console.log(serverStatus);

