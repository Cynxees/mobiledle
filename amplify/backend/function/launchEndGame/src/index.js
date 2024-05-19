/* Amplify Params - DO NOT EDIT
	API_MOBILEDLE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEDLE_GRAPHQLAPIIDOUTPUT
	API_MOBILEDLE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { default: fetch, Request } = require('node-fetch');

const GRAPHQL_ENDPOINT = process.env.API_MOBILEDLE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_MOBILEDLE_GRAPHQLAPIKEYOUTPUT;


async function updateRoomState(stateId, gamemode, currentState) {
    
    console.log('Updating room state')

    const query =  /* GraphQL */ `
    mutation updateChatroomState($input: UpdateChatroomStateInput!) {
      updateChatroomState(input: $input) {
        id
        currentState
        mode
      }
    }
  `

    const variables = {
      input: {
        id: stateId,
        currentState: currentState,
        mode: gamemode,
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


async function endGame(gamemode, stateId){
    
    console.log('ending game')
    
    
    try{
        
        await updateRoomState(stateId, gamemode, "ENDED")
        
        
        
    }catch(err){
        
        console.error("Unable to update room state. Error JSON:", err)
    }
    
    
}

exports.handler = async (event, context, callback) => {
    
    let response;
    console.log('event : ', event)
    

    const chatroomStateId = event.variables.input.chatroomStateId;
    console.log(chatroomStateId)
    
    try {
        const game = await startGameEvent(gamemode, chatroomStateId);
        response = {
            statusCode: 200,
            variables: {
                input: {
                    chatroomStateId: chatroomStateId
                }
                    
            }
        };
        
        
    } catch (error) {
        console.error("Error ending game:", error);
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