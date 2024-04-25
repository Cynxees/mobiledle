/* Amplify Params - DO NOT EDIT
	API_MOBILEDLE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEDLE_GRAPHQLAPIIDOUTPUT
	API_MOBILEDLE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */const express = require('express')

import { default as fetch, Request } from 'node-fetch';
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const AWS = require("aws-sdk");
const UUID = require('uuid')

const GRAPHQL_ENDPOINT = process.env.API_MOBILEDLE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_MOBILEDLE_GRAPHQLAPIKEYOUTPUT;

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});



const dynamoDB = new AWS.DynamoDB.DocumentClient();
const heroesTableName = "MobileLegendsCharacter-qtdtmju7fzfehbp3n7bgg3uxje-staging";





function randomizeGamemode() {
    const gamemodes = ["CLASSIC", "MIRROR"];
    return gamemodes[Math.floor(Math.random() * gamemodes.length)];
}

async function updateRoomState(stateId, gamemode, currentState, promptId, willEndAt) {
    
    console.log('Updating room state')

    const query = 'updateChatroomState'
    
    // /* GraphQL */ `
    // //   mutation CREATE_TODO($input: CreateTodoInput!) {
    // //     createTodo(input: $input) {
    // //       id
    // //       name
    // //       createdAt
    // //     }
    // //   }
    // // `;


    const variables = {
      input: {
        id: stateId,
        currentState: currentState,
        mode: gamemode,
        promptId: promptId
      }
    };

    /** @type {import('node-fetch').RequestInit} */
    const options = {
      method: 'POST',
      headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    };

    const request = new Request(GRAPHQL_ENDPOINT, options);

    const response = await fetch(request);
    const body = await response.json();

    return await body
}

async function getRandomHero() {
    
    console.log('getting random hero')
    const heroCount = 100;
    
    const randomHeroIndex = Math.floor(Math.random()*heroCount)
    
    const params = {
        TableName: heroesTableName,
        Limit: 1,
        Key: {
            id: randomHeroIndex.toString()
        }
        
    };

    console.log('fetching random hero : ', params)
    
    const hero = await dynamoDB.get(params).promise()
    console.log('got hero: ', hero)
    return hero
    
    
}

async function createPrompt(hero, gameMode) {
    console.log('creating prompt')
    let question, description;

    if (gameMode === "CLASSIC") {
        question = `What hero is described by: ${hero.name}?`;
        description = "Guess the hero based on the description.";
    } else {
        question = `Who has the ability: ${hero.name}?`;
        description = "Guess the hero based on their special ability.";
    }
    return {
        id: UUID.v1(),
        question: question,
        description: description,
        imageUrl: hero.imageUrl,
        answer: hero.name,
        type: gameMode,
        timeLimit: 30,
        ttl: 2000000000
    };
}


async function initalizeClassicGamemode(stateId){
    
    console.log('starting classic gamemode')
    
    const randomHero = await getRandomHero();
    
    const prompt = await createPrompt(randomHero.Item, "CLASSIC")
    
    const params = {
        TableName: "PromptTable",
        Item: prompt
    }
    
    try{
        dynamoDB.put(params).promise();
    } catch (err) {
    console.error("Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2));
    }
    
    try{
        
        await updateRoomState(stateId, "CLASSIC", "PLAYING", prompt.id, null)
        
        
        
    }catch(err){
        
        console.error("Unable to update room state. Error JSON:")
    }
    
    
    
    
    
}

async function startGameEvent(gamemode, stateId){
    
    console.log('starting game')
    
    if(gamemode == "CLASSIC"){
        const game  = await initalizeClassicGamemode(stateId)
        return game
    }
    
    
}

app.post('/functions', async function(req, res) {
  
  const chatroomStateId = req.body.chatroomStateId;
  
  const game = await startGameEvent("CLASSIC", chatroomStateId)
  res.json({success: 'post call succeed!', url: req.url, body: game})
  
  
  
  
});


app.listen(3000, function() {
    console.log("App started")
});


module.exports = app
