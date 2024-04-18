import { useEffect } from 'react';
import { MobileLegendsCharacter } from '../API';
import { listMobileLegendsCharacters } from '../graphql/queries';
import { generateClient } from "aws-amplify/api";
import useGetMobileLegendsCharacterImageURL from './useGetMobileLegendsCharacterImageURL';

const client = generateClient()


const useFetchMobileLegendsCharacters = async () => {
  

    var characterResults : Array<MobileLegendsCharacter> = new Array<MobileLegendsCharacter>();

    const mobileLegendsCharactersGraphQL = await client.graphql({
        query: listMobileLegendsCharacters
    });
    
    const mobileLegendsCharacterJSON = mobileLegendsCharactersGraphQL.data.listMobileLegendsCharacters.items;



    mobileLegendsCharacterJSON.forEach(c => {

        
        characterResults.push(c)

    })

    characterResults.forEach(async (character) => {
        try{

            const imageUrl = await useGetMobileLegendsCharacterImageURL(character);
        
            character.imageUrl = '/noPicture.png'
            character.imageUrl = imageUrl
        }catch(e){
            console.log("ERROR Loading Image")
        }
    });
        

    return characterResults.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);
    

};

export default useFetchMobileLegendsCharacters;
