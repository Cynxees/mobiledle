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

async function addUserPoints(userId, addedPoints) {
    
    
    const fetchQuery = /* GraphQL */ `
        query GetChatroomUser($id: ID!) {
          getChatroomUser(id: $id) {
            id
            points
          }
        }
    `;

    const fetchVariables = { id: userId };

    let response = await sendGraphQLRequest(fetchQuery, fetchVariables);
    if (response.errors) {
        console.error('Error fetching chatroom state:', response.errors);
        return;
    }

    const currentPoints = response.data.getChatroomUser.points;
    const newPoints = parseInt(currentPoints) + parseInt(addedPoints);
    
    console.log('Updating user, with points: ', newPoints)

    const query =  /* GraphQL */ `
        mutation updateChatroomUser($input: UpdateChatroomUserInput!) {
          updateChatroomUser(input: $input) {
            id
            points
          }
        }
      `

    const variables = {
      input: {
        id: userId,
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
    //console.log(`EVENT: ${JSON.stringify(event)}`);
    //const message = JSON.parse(event.Records[0].Sns.Message);
    //console.log('event message: ', message)
    //
    //await updateRoomState(message.stateId)
    //
    //return;
    
    
    const { httpMethod, path, body } = event;
    let response;

    if (httpMethod === "POST" && path === "/reward") {
    const { chatroomUserId, points } = JSON.parse(body);
    console.log('body: ', body)
    console.log('chatroomuserid: ', chatroomUserId)
    console.log('points: ', points)
    

        try {
            const temp = await addUserPoints(chatroomUserId, points);
            response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ success: 'Points added successfully!', temp })
            };
            
            
        } catch (error) {
            console.error("Error adding points:", error);
            response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ error: 'Failed to add ponts: '+error })
            };
        }
    } else {
        // Default response for other methods or paths
        response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: "Unsupported method or path." })
        };
    }

    return response;
    
    
};
