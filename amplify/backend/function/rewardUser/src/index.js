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

async function addUserPoints(id, chatroomId, userId, ttl, addedPoints) {
    
    
    const fetchQuery = /* GraphQL */ `
        query GetChatroomUser($id: ID!) {
          getChatroomUser(id: $id) {
            id
            points
          }
        }
    `;

    const fetchVariables = { id: id };

    let response = await sendGraphQLRequest(fetchQuery, fetchVariables);
    if (response.errors) {
        console.error('Error fetching chatroom state:', response.errors);
        return;
    }

    const currentPoints = response.data.getChatroomUser.points;
    const newPoints = parseInt(currentPoints) + parseInt(addedPoints);
    
    console.log('Updating user, with points: ', newPoints)

    const query =  /* GraphQL */ `
        mutation UpdateChatroomUser($input: UpdateChatroomUserInput!) {
          updateChatroomUser(input: $input) {
            id
            chatroomId
            userId
            ttl
            points
            
          }
        }
      `

    const variables = {
      input: {
        id: id,
        chatroomId: chatroomId,
        userId: userId,
        ttl: ttl,
        points: newPoints,
      }
    };
    
    let updateResponse = await sendGraphQLRequest(query, variables);
    if (updateResponse.errors) {
        console.error('Error updating chatroom user:', updateResponse.errors);
        return;
    }
}



/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    const chatroomStateId = event.variables.input.chatroomStateId
    const chatroomId = event.variables.input.chatroomId
    const chatroomUserId = event.variables.input.chatroomUserId
    const userId = event.variables.input.userId
    const chatroomUserTtl = event.variables.input.chatroomUserTtl
    const points = event.variables.input.points

    console.log(chatroomStateId, chatroomId, chatroomUserId, userId, chatroomUserTtl, points)
    

    try {
        const temp = await addUserPoints(chatroomUserId, chatroomId, userId, chatroomUserTtl, points);
        return {
            statusCode: 200,
            variables: {
                input: {
                    chatroomStateId: chatroomStateId
                }
                    
            }
        }
        
        
    } catch (error) {
        console.error("Error adding points:", error);
        return {
            statusCode: 500,
            variables: {
                input: {
                    chatroomStateId: chatroomStateId
                }
                    
            }
        }
    }

    
    
};
