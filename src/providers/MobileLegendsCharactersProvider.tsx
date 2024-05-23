import { useQuery } from 'react-query';
import { generateClient } from "aws-amplify/api";
import { listMobileLegendsCharacters } from '../graphql/queries';
import useGetMobileLegendsCharacterImageURL from '../hooks/useGetMobileLegendsCharacterImageURL';
import { useUser } from './UserProvider';
import { MobileLegendsCharacter } from '../API';
import { MobileLegendsHero } from '../types/MobileLegendsHero';
import { list, getUrl } from 'aws-amplify/storage';

const getMobileLegendsCharacterImageKeys = async (hero : MobileLegendsHero) => {
    
    const categories = ["icons", "cards", "banners", "skills", "extras"];
    const imageKeys = {
        icons: [],
        cards: [],
        banners: [],
        skills: [],
        extras: [],
    };

    for (const category of categories) {
        const prefix = `data/${hero.id} - ${hero.name}/${category.charAt(0).toUpperCase() +category.substring(1)}`;
        let continuationToken = null;
        do {
            const response = await list({
                prefix,
                options: {
                    accessLevel: "guest",
                    nextToken: continuationToken,
                },
            });
            if (response.items && response.items.length > 0) {
                imageKeys[category].push(...response.items.map(item => item.key));
            }
            continuationToken = response.nextToken;
        } while (continuationToken);
    }

    return imageKeys;
}

const fetchCharacters = async () => {
    let time = Date.now()
    console.log('fetching characters')
    const client = generateClient();
    const characterResults = await client.graphql({ 
        query: listMobileLegendsCharacters,
        variables: {
            limit: 150
        }
    
    
    }).then((res) => {

        let items = [] as MobileLegendsHero[];
        res.data.listMobileLegendsCharacters.items.map(item => {

            if(parseInt(item.id)<= 90){
                
                items.push(new MobileLegendsHero(item.id, item.name, item.alias, item.gender, item.role, item.specialty, item.lane, item.region, item.goldPrice, item.ticketPrice, item.diamondPrice, item.year, item.rangeType, item.damageType, item.resource, item.hairColor, item.species)) 

            } 
                

        })

        return items
        

    })

    console.log('finished fetching characters: ', Date.now() - time , 'ms')
    
    time = Date.now()
    console.log('fetching image json')
    const jsonUrl= await getUrl({
        key: 'hero_image_data.json',
        options: {
            accessLevel: 'guest'
        }
    })

    console.log('result: ', jsonUrl.url.href)

    const jsonFile = await fetch(jsonUrl.url.href)

    const jsonData = await jsonFile.json();
    console.log(jsonData)
    console.log('fetched image json : ', Date.now() - time , 'ms')

    time = Date.now()
    console.log('organizing image keys')
    const fetchImagePromises = characterResults.map(async character => {
        try {
            const imageKeys = jsonData[character.id]
            character.imageKeys = imageKeys

        } catch (error) {
            console.error("ERROR Loading Image", error);
        }
        return character;
    });

    let updatedCharacterResults = await Promise.all(fetchImagePromises);
    console.log('finished organizing image keys: ', Date.now() - time, 'ms')
    updatedCharacterResults = updatedCharacterResults.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    console.log(updatedCharacterResults)
    console.log('characters fetched')
    return updatedCharacterResults;
};

export const useMobileLegendsCharacters = () => {
    // console.log('using characters')
    const temp = useQuery('characters', fetchCharacters, {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchInterval: Infinity,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
    // console.log('query: ', temp)
    return temp
};
