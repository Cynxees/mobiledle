import { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { listMobileLegendsCharacters } from '../graphql/queries';
import useGetMobileLegendsCharacterImageURL from '../hooks/useGetMobileLegendsCharacterImageURL';
import MobileLegendsCharactersContext from '../contexts/MobileLegendsCharactersContext';

const client = generateClient();

const MobileLegendsCharactersProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            const response = await client.graphql({ query: listMobileLegendsCharacters });
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
            setIsLoading(false);
        };

        fetchCharacters();
    }, []);

    return (
        <MobileLegendsCharactersContext.Provider value={{ characters, isLoading }}>
            {children}
        </MobileLegendsCharactersContext.Provider>
    );
};

export default MobileLegendsCharactersProvider;
