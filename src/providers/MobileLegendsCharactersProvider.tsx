import { useQuery } from 'react-query';
import { generateClient } from "aws-amplify/api";
import { listMobileLegendsCharacters } from '../graphql/queries';
import useGetMobileLegendsCharacterImageURL from '../hooks/useGetMobileLegendsCharacterImageURL';
import { useUser } from './UserProvider';

const fetchCharacters = async () => {
    const client = generateClient();
    const response = await client.graphql({ query: listMobileLegendsCharacters });
    const characterResults = response.data.listMobileLegendsCharacters.items;
    
   
    
    console.log('fetching characters')
    const fetchImagePromises = characterResults.map(async character => {
        try {
            const imageUrl = await useGetMobileLegendsCharacterImageURL(character);
            character.imageUrl = imageUrl;
        } catch (error) {
            console.error("ERROR Loading Image", error);
        }
        return character;
    });

    let updatedCharacterResults = await Promise.all(fetchImagePromises);
    updatedCharacterResults = updatedCharacterResults.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    console.log('characters fetched')
    return updatedCharacterResults;
};

export const useMobileLegendsCharacters = () => {
    // console.log('using characters')
    const temp = useQuery('characters', fetchCharacters, {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
    // console.log('query: ', temp)
    return temp
};
