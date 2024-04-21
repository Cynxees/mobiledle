import { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { listMobileLegendsCharacters } from '../graphql/queries';
import useGetMobileLegendsCharacterImageURL from '../hooks/useGetMobileLegendsCharacterImageURL';
import MobileLegendsCharactersContext from '../contexts/MobileLegendsCharactersContext';

const client = generateClient();

const MobileLegendsCharactersProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log('fetching characters...')

    useEffect(() => {
        const fetchCharacters = async () => {
            console.log('first fetch...')
            const response = await client.graphql({ query: listMobileLegendsCharacters });
            console.log('2:', response)
            const characterResults = response.data.listMobileLegendsCharacters.items;


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
            setCharacters(updatedCharacterResults.sort((a, b) => parseInt(a.id) - parseInt(b.id)));
            setCharacters(characterResults)
            setIsLoading(false);
        };

        fetchCharacters().catch((e) => {
            console.error('fetch characters error: ',e)
        });
    }, []);

    return (
        <MobileLegendsCharactersContext.Provider value={{ characters, isLoading }}>
            {children}
        </MobileLegendsCharactersContext.Provider>
    );
};

export default MobileLegendsCharactersProvider;
