/* Amplify Params - DO NOT EDIT
	API_MOBILEDLE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEDLE_GRAPHQLAPIIDOUTPUT
	API_MOBILEDLE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { default: fetch, Request } = require('node-fetch');
const AWS = require("aws-sdk");
const UUID = require('uuid')
const heroesTableName = "MobileLegendsCharacter-qtdtmju7fzfehbp3n7bgg3uxje-staging";

const GRAPHQL_ENDPOINT = process.env.API_MOBILEDLE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_MOBILEDLE_GRAPHQLAPIKEYOUTPUT;

const dynamoDB = new AWS.DynamoDB.DocumentClient();


function randomizeGamemode() {
    const gamemodes = ["CLASSIC", "MIRROR"];
    return gamemodes[Math.floor(Math.random() * gamemodes.length)];
}

async function updateRoomState(stateId, gamemode, currentState, promptId, willEndAt) {
    
    console.log('Updating room state')

    const query =  /* GraphQL */ `
    mutation updateChatroomState($input: UpdateChatroomStateInput!) {
      updateChatroomState(input: $input) {
        id
        currentState
        mode
        promptId
        willEndAt
      }
    }
  `

    const variables = {
      input: {
        id: stateId,
        currentState: currentState,
        mode: gamemode,
        promptId: promptId,
        willEndAt: willEndAt
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
    
    console.log('Updating room state, option: ', options)

    const request = new Request(GRAPHQL_ENDPOINT, options);

    const response = await fetch(request);
    const body = await response.json();

    console.log('Updating room state, body: ', body)
    return await body
}

function getRandomHeroId() {
    
    console.log('getting random hero')
    const heroCount = 100;
    
    const randomHeroIndex = Math.floor(Math.random()*heroCount)
    
    

    
    return randomHeroIndex.toString()
    
    
}

function createPrompt(heroIndex, gameMode) {
    console.log('creating prompt')
    let question, description;
    
    

    if (gameMode === "CLASSIC") {
        question = `Guess the Hero`;
        description = "";
    }
    
    
    return {
        id: UUID.v1(),
        mobileLegendsCharacterId: heroIndex,
        question: question,
        description: description,
        type: gameMode,
        timeLimit: 30,
        ttl: 2000000000
    };
}


async function initalizeClassicGamemode(stateId, waitTime, event){
    
    console.log('starting classic gamemode')
    
    const randomHeroIndex = getRandomHeroId();
    
    const prompt = createPrompt(randomHeroIndex, "CLASSIC")
    
    const params = {
        TableName: "PromptTable",
        Item: prompt
    }
    
    const currentEpoch = Math.floor(new Date().getTime() / 1000)
    const willEndAt = currentEpoch + waitTime  
    
    console.log('start: ', currentEpoch, ' end: ', willEndAt)
    
    try{
        await dynamoDB.put(params).promise();
    } catch (err) {
    console.error("Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2));
    }
    
    try{
        
        await updateRoomState(stateId, "CLASSIC", "PLAYING", prompt.id, willEndAt)
        
        
        
    }catch(err){
        
        console.error("Unable to update room state. Error JSON:")
    }
    
    
    
    
    
}

async function startGameEvent(gamemode, stateId, waitTime, event){
    
    console.log('starting game')
    
    
    if(gamemode == "CLASSIC"){
        const game  = await initalizeClassicGamemode(stateId, waitTime, event)
        return game
    }
    
    
}

exports.handler = async (event, context, callback) => {
    
    let response;
    const waitTime = 120
    console.log('event : ', event)
    

    const chatroomStateId = event.variables.input.chatroomStateId;

    console.log(chatroomStateId)
    try {
        const game = await startGameEvent("CLASSIC", chatroomStateId, waitTime, event);
        response = {
            statusCode: 200,
            variables: {
                input: {
                    chatroomStateId: chatroomStateId,
                    waitTime: waitTime
                }
                    
            }
        };
        
        
    } catch (error) {
        console.error("Error starting game:", error);
        response = {
            statusCode: 500,
            variables: {
                input: {
                    chatroomStateId: chatroomStateId
                }
                    
            }
        }
    }
    

    return response;
};