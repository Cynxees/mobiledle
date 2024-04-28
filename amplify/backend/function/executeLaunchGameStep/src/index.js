/* Amplify Params - DO NOT EDIT
	API_MOBILEDLE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEDLE_GRAPHQLAPIIDOUTPUT
	API_MOBILEDLE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    
    const stepArn = "arn:aws:states:ap-southeast-1:881734199479:stateMachine:GameLoopState"
    const params = {
        stateMachineArn: stepArn,
        input: JSON.stringify(event),
        name: 'Execution-' + Date.now()
    };
    
    try {
        const data = await stepfunctions.startExecution(params).promise();
        return { executionArn: data.executionArn, startDate: data.startDate };
    } catch (error) {
        console.error('Error starting step function:', error);
        throw error;
    }
    
};
