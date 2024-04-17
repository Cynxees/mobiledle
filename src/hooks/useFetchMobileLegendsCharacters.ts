import { MobileLegendsCharacter } from '../API';
import { listMobileLegendsCharacters } from '../graphql/queries';
import { generateClient } from "aws-amplify/api";

const client = generateClient()


const useFetchMobileLegendsCharacters = async () => {
  

    var characterResults : Array<MobileLegendsCharacter> = new Array<MobileLegendsCharacter>();

    // List all items
    const mobileLegendsCharactersGraphQL = await client.graphql({
        query: listMobileLegendsCharacters
    });
    
    const mobileLegendsCharacterJSON = mobileLegendsCharactersGraphQL.data.listMobileLegendsCharacters.items;

    mobileLegendsCharacterJSON.forEach(c => {

        characterResults.push(c)

    })

    return characterResults;
    

};

export default useFetchMobileLegendsCharacters;
