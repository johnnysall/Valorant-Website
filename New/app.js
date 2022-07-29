import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.resolve();
app.use(express.static('public'))
app.get("/", (request, response) => {
    request.sendFile('index.html' , { root : __dirname});
});

app.listen(3000, function () {
    console.log(__dirname);
    console.log("Server is running on localhost3000");
});

app.post('/api', (request, response) => {
    console.log(request);
});



// All Valorant API possible GETS
// Get Account Data
app.get('/getAccountData/:name/:tag', async (request, response) => {
    try {
        const fetchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${request.params.name}/${request.params.tag}`);
        const json = await fetchResponse.json();
        response.json(json);

    } catch (error) {
        console.log(error);
    }
});

// Get MMR Data
app.get('/getMMRData/:region/:puuid/:epActFilter', async (request, response) => {
    try {
        let fetchResponse;
        if (request.params.epActFilter == null) {
            fetchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${request.params.region}/${request.params.puuid}?filter=${request.params.epActFilter}`);
        } else {
            fetchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${request.params.region}/${request.params.puuid}`);
        }
        const json = await fetchResponse.json();
        response.json(json);

    } catch (error) {
        console.log(error);
    }
});

// Get MMR History
app.get('/getMMRHistory/:region/:puuid', async (request, response) => {
    try {
        const fetchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr-history/${request.params.region}/${request.params.puuid}`);
        const json = await fetchResponse.json();
        response.json(json);

    } catch (error) {
        console.log(error);
    }
});

// Get Match History
app.get('/getMatchHistory/:region/:puuid/:gameModeFilter', async (request, response) => {
    try {       
        let fetchResponse;
        if (request.params.gameModeFilter == null) {
            fetchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v3/by-puuid/matches/${request.params.region}/${request.params.puuid}?filter=${request.params.gameModeFilter}`);
        } else {
            fetchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v3/by-puuid/matches/${request.params.region}/${request.params.puuid}`);
        }
        const json = await fetchResponse.json();
        response.json(json);

    } catch (error) {
        console.log(error);
    }
});

// Get Match Data
app.get('/getMatchData/:matchID', async (request, response) => {
    try {
        const fetchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v2/match//${request.params.matchID}`);
        const json = await fetchResponse.json();
        response.json(json);

    } catch (error) {
        console.log(error);
    }
});

// Get Leaderboard of certain region
app.get('/getLeaderBoard/:region/:nameFilter/:tagFilter', async (request, response) => {
    try {
        let fetchResponse;
        if (request.params.nameFilter == null && request.params.tagFilter == null) {
            fetchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v1/leaderboard/${request.params.region}name=${request.params.nameFilter}&tag=${request.params.tagFilter}`);
        } else {
            fetchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v1/leaderboard/${request.params.region}`);
        }
        const json = await fetchResponse.json();
        response.json(json);

    } catch (error) {
        console.log(error);
    }
});

// Get Server Status
app.get('/getServerStatus/:region', async (request, response) => {
    try {
        let fetchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v1/status/${request.params.region}`);
        const json = await fetchResponse.json();
        response.json(json);

    } catch (error) {
        console.log(error);
    }
});

// Get Content - skins, characters etc
app.get('/getContent', async (request, response) => {
    try {
        let fetchResponse = await fetch("https://api.henrikdev.xyz/valorant/v1/content");
        const json = await fetchResponse.json();
        response.json(json);

    } catch (error) {
        console.log(error);
    }
});