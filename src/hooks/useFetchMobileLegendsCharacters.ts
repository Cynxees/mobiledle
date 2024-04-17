import { listMobileLegendsCharacters } from '../graphql/queries';
import { MobileLegendsCharacter } from '../types/MobileLegendsCharacter';
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

        const tempCharacter = new MobileLegendsCharacter(c.id, c.name, c.alias, c.gender, c.role, c.specialty, c.lane, c.year, c.region, c.goldPrice, c.diamondPrice, c.ticketPrice, null, null, null)

        characterResults.push(tempCharacter)

    })

    return characterResults;
    

};

export default useFetchMobileLegendsCharacters;
