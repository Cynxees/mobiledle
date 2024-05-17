import { StorageImage } from "@aws-amplify/ui-react-storage";
import { MobileLegendsCharacter } from "../API";
import { list } from "aws-amplify/storage";
import { useMobileLegendsCharacters } from "../providers/MobileLegendsCharactersProvider";
import { useState } from "react";


export default function DevPage() {
    const [init, setInit] = useState(false);
    const [keyDictionaryState, setKeyDictionaryState] = useState({});
    const { data: characters, isLoading, error } = useMobileLegendsCharacters();

    const getIcons = async () => {

        const time = Date.now()
        let searchPrefix = 'data/'
        


        let keyDictionary = {}

        await list({
            
            prefix: searchPrefix,
            options: {
                accessLevel: "guest",
                listAll: true

            }
            
        
        }).then((res) => {
            
            res.items.map(item => {

                const splitedKey = item.key.split('/')
                const root = splitedKey[1];
                const heroId = root.split(' - ')[0]
                const category = splitedKey[2];
                
                if (!keyDictionary[heroId]) {
                    keyDictionary[heroId] = {
                        banners: [],
                        icons: [],
                        cards: [],
                        skills: [],
                        extras: [],
                    };
                }

                

                if (category === 'Icons') {
                    keyDictionary[heroId].icons.push(item.key);
                } else if (category === 'Banners') {
                    keyDictionary[heroId].banners.push(item.key);
                } else if (category === 'Cards') {
                    keyDictionary[heroId].cards.push(item.key);
                } else if (category === 'Skills') {
                    keyDictionary[heroId].skills.push(item.key);
                } else if (category === 'Extras') {
                    keyDictionary[heroId].extras.push(item.key);
                }


            })
            
            
            console.log('array', JSON.parse(JSON.stringify(keyDictionary)))



            console.log('finished in ', Date.now()- time)
            // setKeyDictionaryState(keyDictionary)
            return res.items
            
        })

        
    
    };

    getIcons()
    if(isLoading) return <div>loading</div>

    

    return <div>


        {characters.map((hero) => {


            return <div>

                {hero.name}
                <StorageImage imgKey={hero.imageKeys.icons[0]} accessLevel="guest" alt="" />
            </div>

        })}
        hi


    </div>

}