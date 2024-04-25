import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const heroesTableName = "MobileLegendsCharacter-qtdtmju7fzfehbp3n7bgg3uxje-staging";

function randomizeGamemode() {
    const gamemodes = ["CLASSIC", "MIRROR"];
    return gamemodes[Math.floor(Math.random() * gamemodes.length)];
}

async function updateRoomState(stateId, gameMode, state, prompt, willEndAt) {
    const params = {
        TableName: "ChatroomStateTable",
        Key: { id: stateId },
        UpdateExpression: 'set mode = :gm, currentState = :st, prompt = :pr, willEndAt = :we',
        ExpressionAttributeValues: {
            ':gm': gameMode,
            ':st': state,
            ':pr': prompt || null,
            ':we': willEndAt || null
        },
        ReturnValues: "UPDATED_NEW"
    };

    return dynamoDB.update(params).promise();
}

async function getRandomHero() {
    
    const heroCount = 100;
    
    const randomHeroIndex = Math.floor(Math.random()*heroCount)
    
    const params = {
        TableName: heroesTableName,
        Limit: 1,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: { ':id':  JSON.stringify(randomHeroIndex)},
        
    };

    const result = await dynamoDB.query(params).promise();
    return result
}

function createPrompt(hero, gameMode) {
    let question, description;

    if (gameMode === "CLASSIC") {
        question = `What hero is described by: ${hero.description}?`;
        description = "Guess the hero based on the description.";
    } else {
        question = `Who has the ability: ${hero.name}?`;
        description = "Guess the hero based on their special ability.";
    }
    return {
        question: question,
        description: description,
        imageUrl: hero.imageUrl,
        answer: hero.name,
        type: gameMode,
        timeLimit: 30,
        ttl: 2000000000
    };
}


async function initalizeClassicGamemode(){
    
    
    const randomHero = await getRandomHero();
    
    prompt = createPrompt(randomHero, "CLASSIC")
    
    const result = dynamoDB
    
    
    
    
}

async function startGameEvent(gamemode){
    
    
    if(gamemode == "CLASSIC"){
        const game  = await initalizeClassicGamemode()
        return game
    }
    
    
}

export const handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    // test
    //const randomGamemode = randomizeGamemode()
    const randomGamemode = "CLASSIC"
    
    const game = await startGameEvent(randomGamemode)
    
    
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(game),
    };
};
