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
        console.log('sending graphql : ', options);
        const request = new Request(GRAPHQL_ENDPOINT, options);
        console.log('request: ', request);
        const response = await fetch(request);
        console.log('response: ', response);
        return response.json();
    } catch (error) {
        console.error('Network or other error:', error);
        return { errors: [error] };
    }
}

async function updateRoomState(stateId) {
    
    
    let query = /* GraphQL */ `
        query GetChatroomState($id: ID!) {
          getChatroomState(id: $id) {
            id
            users{
                id
            }
          }
        }
    `;

    let variables = { id: stateId };

    let response = await sendGraphQLRequest(query, variables);
    if (response.errors) {
        console.error('Error fetching chatroom state:', response.errors);
        return;
    }

    const users = response.data.getChatroomState.users;
    console.log('users: ', users)

    query =  /* GraphQL */ `
            mutation updateChatroomUser($input: UpdateChatroomUserInput!) {
              updateChatroomUser(input: $input) {
                id
                state
              }
            }
      `
      
    
    
    for(var i = 0; i < users.length; i++){
        
        
        const user = users[i]
        console.log('user: ', user.id)
        
        
        variables = {
          input: {
            id: user.id,
            state: "PLAYING",
          }
        };
        
        
        let updateResponse = await sendGraphQLRequest(query, variables);
        if (updateResponse.errors) {
            console.error('Error updating chatroomUser state:', response.errors);
            return;
        }
        
        
        
    }
    
    
    
        
    
    
        
        
        
        
        
    
    
}



/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    
    const chatroomStateId = event.variables.input.chatroomStateId
    await updateRoomState(chatroomStateId)
    
    return {
            statusCode: 200,
            variables: {
                input: {
                    chatroomStateId: chatroomStateId
                }
                    
            }
        }
    
    
    
};
