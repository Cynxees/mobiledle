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

async function checkRoomState(stateId) {
    
    
    let query = /* GraphQL */ `
        query listChatroomUser($chatroomId: ID!) {
          listChatroomUser(chatroomId: $id) {
            state
          }
        }
    `;

    let variables = { id: stateId };

    let response = await sendGraphQLRequest(query, variables);
    if (response.errors) {
        console.error('Error fetching chatroom state:', response.errors);
        return;
    }

    const users = response.data.listChatroomUser;
    console.log('users: ', users)

    for(user in users){

        console.log(user.state)


    }
    
    
    
        
    
    
        
        
        
        
        
    
    
}



/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    
    const chatroomStateId = event.variables.input.chatroomStateId
    const result = await checkRoomState(chatroomStateId)
    
    return {
            statusCode: 200,
            variables: {
                input: {
                    chatroomStateId: chatroomStateId
                }
                    
            }
        }
    
    
    
};
