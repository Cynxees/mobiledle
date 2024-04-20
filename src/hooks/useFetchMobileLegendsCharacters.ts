import { listMobileLegendsCharacters } from '../graphql/queries';
import { generateClient } from "aws-amplify/api";
import useGetMobileLegendsCharacterImageURL from './useGetMobileLegendsCharacterImageURL';

const client = generateClient()


const useFetchMobileLegendsCharacters = async () => {
  


    const mobileLegendsCharactersGraphQL = await client.graphql({
        query: listMobileLegendsCharacters
    });
    
    const characterResults  = mobileLegendsCharactersGraphQL.data.listMobileLegendsCharacters.items;


    const fetchImagePromises = characterResults.map(async character => {
        try {
            const imageUrl = await useGetMobileLegendsCharacterImageURL(character);
            character.imageUrl = imageUrl;
        } catch (error) {
            console.error("ERROR Loading Image", error);
        }
        return character; 
    });


    const updatedCharacterResults = await Promise.all(fetchImagePromises);
    return updatedCharacterResults.sort((a, b) => parseInt(a.id) - parseInt(b.id));


    

};

export default useFetchMobileLegendsCharacters;
