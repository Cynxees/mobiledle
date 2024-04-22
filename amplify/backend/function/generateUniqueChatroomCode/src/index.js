const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'ChatroomTable';

function generateCode(length = 4) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

async function codeExists(code) {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'code-index', 
    KeyConditionExpression: 'code = :code',
    ExpressionAttributeValues: {
      ':code': code
    }
  };
  const result = await dynamoDB.query(params).promise();
  return result.Items.length > 0;
}

exports.handler = async (event, context) => {
  return 'hi'
  let uniqueCode = generateCode();

  if (!uniqueCode) {
    return 'DEFAULTCODE';
  }

  let exists = await codeExists(uniqueCode);
  if (!exists) {
    return 'DEFAULTCODE2';
  }
  let attempts = 0;

  while (exists && attempts < 10) { // Retry up to 10 times
    uniqueCode = generateCode();
    exists = await codeExists(uniqueCode);
    attempts++;
  }

  if (exists) {
    throw new Error('Failed to generate a unique code');
  }

  // Proceed to create the chatroom with the unique code
  const createParams = {
    TableName: TABLE_NAME,
    Item: {
      id: event.id || AWS.util.uuid.v4(),
      name: event.name,
      code: uniqueCode,
      ttl: event.ttl
    }
  };

  await dynamoDB.put(createParams).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: createParams.Item.id,
      code: uniqueCode
    }),
  };
};
