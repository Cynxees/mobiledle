/* Amplify Params - DO NOT EDIT
	API_MOBILEDLE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEDLE_GRAPHQLAPIIDOUTPUT
	API_MOBILEDLE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const GRAPHQL_ENDPOINT = process.env.API_MOBILEDLE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_MOBILEDLE_GRAPHQLAPIKEYOUTPUT;

const { default: fetch, Request } = require('node-fetch');

async function sendGraphQLRequest(query, variables) {
    const options = {
        method: 'POST',
        headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    };

    try {
        const request = new Request(GRAPHQL_ENDPOINT, options);
        const response = await fetch(request);
        return response.json(); // Return the parsed JSON response
    } catch (error) {
        console.error('Network or other error:', error);
        return { errors: [error] };
    }
}

async function updateRoomState(stateId, state) {
    
    

    const query =  /* GraphQL */ `
        mutation updateChatroomState($input: UpdateChatroomStateInput!) {
          updateChatroomState(input: $input) {
            id
            currentState
          }
        }
      `

    const variables = {
      input: {
        id: stateId,
        state: state,
      }
    };
    
    let updateResponse = await sendGraphQLRequest(query, variables);
    if (updateResponse.errors) {
        console.error('Error updating chatroom state:', response.errors);
    }
    
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    
    
    const chatroomStateId = event.variables.input.chatroomStateId;
    const state = event.variables.input.state;
    
    await updateRoomState(chatroomStateId, state)
    
    return {
            statusCode: 200,
            variables: {
                input: {
                    chatroomStateId: chatroomStateId
                }
                    
            }
        }
    
    
    
};
